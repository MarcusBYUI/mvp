import "./jetton";

message Mint {
    amount: Int;
    receiver: Address;
}



contract Pair with Jetton {
    total_supply: Int;
    content: Cell;
    manager: Address;
    router: Address;
    mintable: Bool;
    owner: Address;
    jettonFee: Int;

    //other details
    factory: Address; //public
    reserve0: Int; //public
    reserve1: Int; //public

    token0: Address; //public
    token1: Address; //public

    token0Wallet: Address; //public
    token1Wallet: Address; //public
    routerWallet: Address; //public

    fee: Int; //0.3%
    startTime: Int; // Pool start time //public

    _initialized: Bool;


    init(manager: Address, token0: Address, token1: Address, factory: Address) {
        self.total_supply = 0;
        self.jettonFee = 0;
        self.manager = manager;
        self.owner = manager;
        self.router = newAddress(0,0);
        self.mintable = true;
        self.content = beginCell().endCell();
        self.reserve0 = 0;
        self.reserve1 = 0;
        self.token0 = token0;
        self.token1 = token1;
        self.token0Wallet = newAddress(0,0);
        self.token1Wallet = newAddress(0,0);
        self.routerWallet = newAddress(0,0);
        self.fee = 997;
        self.startTime = 0;
        self.factory = factory;
        self._initialized = false;
    }

    receive(msg: PairInit){
        require(self._initialized == false, "Already Initialized");
        self._initialized = true;

        self.content = msg.content;
        self.router = msg.router;
        self.jettonFee = msg.jettonFee;
        self.startTime = msg.startTime;
        if(msg.token0 != newAddress(0,0)){
            self.token0Wallet = msg.token0Wallet;
        }
        if(msg.token1 != newAddress(0,0)){
            self.token1Wallet = msg.token1Wallet;
        }

    }

    fun _sqrt(y: Int) : Int {
        let z: Int = 0;
        if (y > 3) {
            z = y;
            let x: Int = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
            return z;
    }

    //create child pair
    receive(msg: CreateChildPair) {
        let ctx: Context = context(); // get sender Info

        let init: StateInit = initOf PairChild(msg.owner, self.manager, self.factory, self.router, myAddress(), self.token0, self.token1);
        let childAddress: Address = contractAddress(init);

        send(SendParameters{
                    to: childAddress,
                    body: PairChildInit{token0: self.token0,
                            token1: self.token1, 
                            jettonFee: self.jettonFee,
                            token0Wallet: msg.token0Wallet,
                            token1Wallet: msg.token1Wallet
                            }.toCell(),
                    value: 0,              // pay for message and potential deployment
                    mode: SendRemainingValue,
                    code: init.code,                // if child is not deployed, also deploy it
                    data: init.data
        });
    }

    //addLiquidity
    receive("InitAddLiquidity") {
        let ctx: Context = context(); // get sender Info
        require(ctx.value > ton("0.2"), "Not Enough Gas");


        let init: StateInit = initOf PairChild(sender(), self.manager, self.factory, self.router, myAddress(), self.token0, self.token1);
        let childAddress: Address = contractAddress(init);

        send(SendParameters{
            to: childAddress, 
            value: 0,
            bounce: false,
            mode: SendRemainingValue,
            body: ProvideLp{reserve0: self.reserve0, reserve1: self.reserve1}.toCell()});
    }

    receive(msg: AddLiquidityReply) {
        let ctx: Context = context(); // get sender Info
        let init: StateInit = initOf PairChild(msg.owner, self.manager, self.factory, self.router, myAddress(), self.token0, self.token1);
        let childAddress: Address = contractAddress(init);
        require(ctx.sender == childAddress, "Not From Child");

        //mint shares
        let shares: Int = 0;
        if (self.total_supply > 0) {
            shares = min((msg.amount0 * self.total_supply) / self.reserve0, (msg.amount1 * self.total_supply) / self.reserve1);
        } else {
            shares = self._sqrt(msg.amount0 * msg.amount1);
        }

        if (shares > 0) {                                                                                                

            //send to router
            send(SendParameters{
                to: self.router, 
                value: ton("0.017"),
                bounce: false,
                mode: SendPayGasSeparately,
                body: AddLpCallBack{reserve0: self.reserve0, reserve1: self.reserve1, token0: self.token0, token1: self.token1, amount0: msg.amount0,
                                    amount1: msg.amount1, owner: msg.owner }.toCell()
            });

            //mint shares
            self.mint(msg.owner, shares, self.jettonFee); // (to, amount, response_destination)

            //update reserves
            self.reserve0 = self.reserve0 + msg.amount0;
            self.reserve1 = self.reserve1 + msg.amount1;
        }
    }

    //swap
    receive (msg: Swap) {
        let swapInit: SwapInit = SwapInit{
            rootIn: self.token1,
            rootOut: self.token0,
            walletIn: self.token1Wallet, 
            walletOut: self.token0Wallet, 
            reserveIn: self.reserve1, 
            reserveOut: self.reserve0
        };
      
        if (msg.tokenRoot == self.token0){
            swapInit = SwapInit{
                rootIn: self.token0, 
                rootOut: self.token1,
                walletIn: self.token0Wallet,
                walletOut: self.token1Wallet,
                reserveIn: self.reserve0,
                reserveOut: self.reserve1
            };
        }

        let amountInWithFee: Int = msg.amount;

        if (swapInit.rootIn == newAddress(0,0)) {
            //get all fee from token in
            amountInWithFee = (msg.amount * (self.fee * 2)) / 1000;
        } else if(swapInit.rootOut != newAddress(0,0)){
            amountInWithFee = (msg.amount * self.fee) / 1000;
        }

        //do swap
        let amountOut: Int = (swapInit.reserveOut * amountInWithFee) / (swapInit.reserveIn + amountInWithFee);

        let amountOutWithFee: Int = amountOut;

        if (swapInit.rootOut == newAddress(0,0)) {
            //get all fee from token Out
            amountOutWithFee = (amountOut * (self.fee * 2)) / 1000;

        } else if(swapInit.rootIn != newAddress(0,0)) {
            amountOutWithFee = (amountOut * self.fee) / 1000;
        }
    

        if (amountOutWithFee < msg.minimum) {
            //return swapped tokens if not upto minimum
            self.reply(SwapCallBack{inFee: 0, outFee: 0, ref: msg.ref, reserve0: self.reserve0, reserve1: self.reserve1, token0: self.token0, token1: self.token1, path: msg.path, hops: 0, length: 0, pair: newAddress(0,0), priceChanged: true, receiver: msg.receiver, walletOutAddress: swapInit.walletOut, walletInAddress: swapInit.walletIn, tokenOutAddress: swapInit.rootOut, tokenInAddress: swapInit.rootIn, amountIn: msg.amount, amountOut: 0}.toCell());
        } 
        
        else {


            //CALCULATE LEFT OVER FEE
            //send fee out
            // let splitA: Int = (((msg.amount - amountInWithFee) * pow(10, 18)) * 60) / 100;
            // let splitB: Int = (((amountOut - amountOutWithFee) * pow(10, 18)) * 60) / 100;

            let inFee: Int = msg.amount - amountInWithFee; // 0 if all fees were deducted from amountOutWithFee
            let outFee: Int = amountOut - amountOutWithFee; // 0 if all fees were deducted from amountInWithFee

            //update reserve
            if (self.reserve0 == swapInit.reserveIn) {
                self.reserve0 = self.reserve0 + (msg.amount - inFee);
                self.reserve1 = self.reserve1 - amountOut;
            } else {
                self.reserve1 = self.reserve1 + (msg.amount - inFee);
                self.reserve0 = self.reserve0 - amountOut;
            }

            if (msg.path.get(msg.hops) != null) {
                //send back to router to send to the next pair for swap
                self.reply(SwapCallBack{inFee: inFee, outFee: outFee, ref: msg.ref, reserve0: self.reserve0, reserve1: self.reserve1, token0: self.token0, token1: self.token1, path: msg.path, hops: msg.hops, length: msg.length, pair: msg.path.get(msg.hops)!!, priceChanged: false, receiver: msg.receiver, walletOutAddress: swapInit.walletOut, walletInAddress: swapInit.walletIn, tokenOutAddress: swapInit.rootOut, tokenInAddress: swapInit.rootIn, amountIn: amountInWithFee, amountOut: amountOutWithFee}.toCell());
            }  else {
                self.reply(SwapCallBack{inFee: inFee, outFee: outFee, ref: msg.ref, reserve0: self.reserve0, reserve1: self.reserve1, token0: self.token0, token1: self.token1, path: msg.path, hops: msg.hops, length: 0, pair: newAddress(0,0), priceChanged: false, receiver: msg.receiver, walletOutAddress: swapInit.walletOut, walletInAddress: swapInit.walletIn, tokenOutAddress: swapInit.rootOut, tokenInAddress: swapInit.rootIn, amountIn: amountInWithFee, amountOut: amountOutWithFee}.toCell());
            }

           
        }
    }
    
    //lp removal entry
    receive(msg: TokenBurnNotification) {
        self.requireSenderAsWalletOwner(msg.response_destination!!);       // Check wallet
        self.removeLiquidity(msg.amount, msg.sender);
    }

    //remove liquidity
    fun removeLiquidity(shares: Int, receiver: Address) {

        if(shares > self.total_supply){
            shares = self.total_supply;
        }

        //calculate amount
        let amount0: Int = (shares * self.reserve0) / self.total_supply;
        let amount1: Int = (shares * self.reserve1) / self.total_supply;

        if (amount0 > 0 && amount1 > 0) {

            self.reserve0 -= amount0;
            self.reserve1 -= amount1;
            self.total_supply -= shares;

            let amount0IsTon: Bool = true;
            let amount1IsTon: Bool = true;
            let tokenAddress0: Address = newAddress(0,0);
            let tokenAddress1: Address = newAddress(0,0);

            if (self.token0Wallet != newAddress(0,0)) {
                    amount0IsTon = false;
                    tokenAddress0 = self.token0Wallet;
            }

            if (self.token1Wallet != newAddress(0,0)) {
                    amount1IsTon = false;
                    tokenAddress1 = self.token1Wallet;
            }

            //send to router
            send(SendParameters{
                    to: self.router, 
                    value: 0,
                    bounce: false,
                    mode: SendRemainingValue,
                    body: RemoveLpCallBack{reserve0: self.reserve0, reserve1: self.reserve1, token0: self.token0, token1: self.token1, amount0: amount0, amount0IsTon: amount0IsTon, tokenAddress0: tokenAddress0,
                                        amount1: amount1, amount1IsTon: amount1IsTon, tokenAddress1: tokenAddress1, receiver: receiver  }.toCell()
                });

        }
    }

    //get left over tokens



    // ------------------ Get Function  ------------------ //

    //get start time
    get fun get_start_time(): Int { 
        return self.startTime;
    }

    //get reserveZero
    get fun get_reserve0(): Int { 
        return self.reserve0;
    }

    //get reserveOne
    get fun get_reserve1(): Int {
        return self.reserve1;
     }

    //get liqOut
    get fun get_lp_out(shares: Int): LiqOut {
        let token0InWallet: Int = self.reserve0;
        let token1InWallet: Int = self.reserve1;

        if(shares > self.total_supply){
            shares = self.total_supply;
        }

        //calculate amount
        let amount0: Int = (shares * token0InWallet) / self.total_supply;
        let amount1: Int = (shares * token1InWallet) / self.total_supply;

        if (amount0 > 0 && amount1 > 0) {
            return LiqOut{
                amount0: amount0,
                amount1: amount1
            };
        }else{
            return LiqOut{
                amount0: 0,
                amount1: 0
            };
        }
    }

    //get amountOut
    get fun get_amount_out(amountIn: Int, tokenRoot: Address): Int {
        let reserveIn: Int = self.reserve1;
        let reserveOut: Int = self.reserve0;
        let tokenIn: Address = self.token1;
        let tokenOut: Address = self.token0;
      
        if (tokenRoot == self.token0){
            reserveIn = self.reserve0;
            reserveOut = self.reserve1;
            tokenIn = self.token0;
            tokenOut = self.token1;
        }

        let amountInWithFee: Int = amountIn;

        if (tokenIn == newAddress(0,0)) {
            //get all fee from token in
            amountInWithFee = (amountIn * (self.fee * 2)) / 1000;
        } else if(tokenOut != newAddress(0,0)){
            amountInWithFee = (amountIn * self.fee) / 1000;
        }

        //do swap
        let amountOut: Int = (reserveOut * amountInWithFee) / (reserveIn + amountInWithFee);

        let amountOutWithFee: Int = amountOut;

        if (tokenOut == newAddress(0,0)) {
            //get all fee from token Out
            amountOutWithFee = (amountOut * (self.fee * 2)) / 1000;

        } else if(tokenIn != newAddress(0,0)) {
            amountOutWithFee = (amountOut * self.fee) / 1000;
        }

        return amountOutWithFee;
    }

    get fun get_pairchild(owner: Address): Address {   
        let init: StateInit = initOf PairChild(owner, self.manager, self.factory, self.router, myAddress(), self.token0, self.token1);
        return contractAddress(init);
    }

    //get pair Info
    get fun parentinfo(): PairInfo { 
        return PairInfo{
            total_supply: self.total_supply,
            manager: self.manager,
            router: self.router,
            content: self.content,
            jettonFee: self.jettonFee,
            mintable: self.mintable,
            owner: self.owner,
            factory: self.factory,
            reserve0: self.reserve0,
            reserve1: self.reserve1,
            token0: self.token0,
            token1: self.token1,
            token0Wallet: self.token0Wallet,
            token1Wallet: self.token1Wallet,
            fee: self.fee,
            startTime: self.startTime,
            initialized: self._initialized
        };
    }

} 


//Pair Child
contract PairChild {

    owner: Address;
    manager: Address;
    pair: Address;
    factory: Address;
    router: Address;
    jettonFee: Int;

    token0: Address;
    token1: Address;

    token0Wallet: Address;
    token1Wallet: Address;

    amount0: Int = 0;
    amount1: Int = 0;

    _initialized: Bool;

    init(owner: Address, manager: Address, factory: Address, router: Address, pair: Address, token0: Address, token1: Address){
        self.jettonFee = 0;
        self.owner = owner;
        self.manager = manager;
        self.factory = factory;
        self.router = router;
        self.pair = pair;
        self.token0 = token0;
        self.token1 = token1;
        self.token0Wallet = newAddress(0,0);
        self.token1Wallet = newAddress(0,0);
        self._initialized = false;
    }
    

    receive(msg: PairChildInit){
        require(self._initialized == false, "Already Initialized");
        self._initialized = true;
        self.jettonFee = msg.jettonFee;

        if(msg.token0 != newAddress(0,0)){
            self.token0Wallet = msg.token0Wallet;
        }

        if(msg.token1 != newAddress(0,0)){
            self.token1Wallet = msg.token1Wallet;
        }
    }

    //notification to update amount
    receive(msg: TokenNotification){
        let ctx: Context = context(); // get sender Info

        if(sender() == self.token0Wallet){
            self.amount0 = self.amount0 + msg.amount;
        }
        if(sender() == self.token1Wallet){
            self.amount1 = self.amount1 + msg.amount;
        }
    }

    //deposit TON
    receive("DepositTon"){
        let ctx: Context = context(); // get sender Info

        if(self.token0 == newAddress(0,0)){
            self.amount0 = self.amount0 + ctx.value;
        }

        if(self.token1 == newAddress(0,0)){
            self.amount1 = self.amount1 + ctx.value;
        }
    }

    //parent to come get amount from child and add lp
    receive(msg: ProvideLp){
        let ctx: Context = context(); // get sender Info
        require(ctx.sender == self.pair, "Not Parent");

        if (self.amount0 > 0 && self.amount1 > 0) {
            let amount0Tosend: Int = self.amount0;
            let amount1Tosend: Int = self.amount1;

            if (msg.reserve0 > 0 && msg.reserve1 > 0 && msg.reserve0 > msg.reserve1 && self.amount0 > self.amount1) {
                let reserveRatio: Int = (msg.reserve0 * self.amount1 * pow(10, 18)) / (msg.reserve1 * self.amount0);
                amount0Tosend = (reserveRatio * self.amount0) / pow(10, 18);
            } else if (msg.reserve0 > 0 && msg.reserve1 > 0 && msg.reserve1 > msg.reserve0 && self.amount1 > self.amount0) {
                let reserveRatio: Int = (msg.reserve0 * self.amount1 * pow(10, 18)) / (msg.reserve1 * self.amount0);
                amount1Tosend = (self.amount1 * pow(10, 18)) / reserveRatio;
            } else if (msg.reserve0 > 0 && msg.reserve1 > 0 && msg.reserve0 > msg.reserve1 && self.amount0 < self.amount1) {
                let reserveRatio: Int = (msg.reserve0 * self.amount1 * pow(10, 18)) / (msg.reserve1 * self.amount0);
                amount1Tosend = (self.amount1 * pow(10, 18)) / reserveRatio;
            } else if (msg.reserve0 > 0 && msg.reserve1 > 0 && msg.reserve1 > msg.reserve0 && self.amount1 < self.amount0) {
                let reserveRatio: Int = (msg.reserve0 * self.amount1 * pow(10, 18)) / (msg.reserve1 * self.amount0);
                amount0Tosend = (reserveRatio * self.amount0) / pow(10, 18);
            }

            let leftOver: Int = 0;

            if(self.token0 == newAddress(0,0)){

                send(SendParameters{
                    to: self.router,
                    value: amount0Tosend,
                    mode: SendPayGasSeparately,
                    bounce: false
                });

                leftOver = leftOver + self.jettonFee;
            }else{
                send_jetton_with_ton(self.token0Wallet, self.factory, amount0Tosend, self.jettonFee / 2, 0, false, beginCell().storeAddress(self.router).asSlice(), self.jettonFee / 2, self.factory);
            }

            if(self.token1 == newAddress(0,0)){

                send(SendParameters{
                    to: self.router,
                    value: amount1Tosend,
                    mode: SendPayGasSeparately,
                    bounce: false
                });
                leftOver = leftOver + self.jettonFee;

            }else{
                send_jetton_with_ton(self.token1Wallet, self.factory, amount1Tosend, self.jettonFee / 2, 0, false, beginCell().storeAddress(self.router).asSlice(), self.jettonFee / 2, self.factory);
            }

            self.amount0 = self.amount0 - amount0Tosend;
            self.amount1 = self.amount1 - amount1Tosend;

            //ReserveAllExcept
            nativeReserve(ton("0.13") + leftOver, ReserveAllExcept);

            send(SendParameters{
                to: self.pair, 
                value: 0,
                bounce: false,
                mode: SendRemainingBalance,
                body: AddLiquidityReply{amount0: amount0Tosend, amount1: amount1Tosend, owner: self.owner}.toCell()});

        }

    }

    //remove stucked tokens Admin
    receive(msg: RemoveTokensAdmin){
        let ctx: Context = context(); // get sender Info
        require(ctx.sender == self.manager, "Not Owner");

        if(self.token0 == newAddress(0,0)){

                send(SendParameters{
                    to: self.manager,
                    value: msg.amount0,
                    mode: 1,
                    bounce: false
                });

        }else{
            send_jetton(self.token0Wallet, self.manager, msg.amount0, 0, false, "transfer", self.jettonFee, self.manager);
        }

        self.amount0 -= msg.amount0;
        require(self.amount0 >= 0, "Invalid balance");

        if(self.token1 == newAddress(0,0)){

            send(SendParameters{
                to: self.manager,
                value: msg.amount1,
                mode: 1,
                bounce: false
            });

        }else{
            send_jetton(self.token1Wallet, self.manager, msg.amount1, 0, false, "transfer", self.jettonFee, self.manager);
        }

        self.amount1 -= msg.amount1;
        require(self.amount1 >= 0, "Invalid balance");

    }

    receive("RemoveTokens"){
        let ctx: Context = context(); // get sender Info
        require(ctx.sender == self.owner, "Not Owner");

        if(self.token0 == newAddress(0,0)){

                send(SendParameters{
                    to: self.owner,
                    value: self.amount0,
                    mode: 1,
                    bounce: false
                });

        }else{
            send_jetton(self.token0Wallet, self.owner, self.amount0, 0, false, "transfer", self.jettonFee, self.manager);
        }

        self.amount0 = 0;

        if(self.token1 == newAddress(0,0)){

            send(SendParameters{
                to: self.owner,
                value: self.amount1,
                mode: 1,
                bounce: false
            });

        }else{
            send_jetton(self.token1Wallet, self.owner, self.amount1, 0, false, "transfer", self.jettonFee, self.manager);
        }

        self.amount1 = 0;

    }

    //get pairchild info
    get fun childinfo(): PairChildInfo { 
        return PairChildInfo{
            owner: self.owner,
            manager: self.manager,
            jettonFee: self.jettonFee,
            pair: self.pair,
            router: self.router,
            token0: self.token0,
            token1: self.token1,
            token0Wallet: self.token0Wallet,
            token1Wallet: self.token1Wallet,
            amount0: self.amount0,
            amount1: self.amount1,
            initialized : self._initialized
        };
    }

}
