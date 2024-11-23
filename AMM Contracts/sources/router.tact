import "./message";
import "./pair";

contract Router {

    manager: Address;
    factory: Address;
    cashBack: Int;
    refBonus: Int;
    jettonFee: Int;
    

    init(manager: Address, factory: Address) {
        self.factory = factory;
        self.manager = manager;
        self.cashBack = 50;
        self.refBonus = 50;
        self.jettonFee = ton("0.12");
    }

    //token swaps entry
    receive(msg: TokenNotification){
        let ctx: Context = context(); // get sender Info
        let payload: SwapPayload = SwapPayload.fromCell(msg.forward_payload.loadRef());

        require(ctx.value >= ((payload.length * 50000000) + self.jettonFee), "Not enough TON");
        self.swapTokens(payload.tokenRoot, msg.amount, payload.amountOutMin, payload.path, payload.length, payload.to, payload.deadline, payload.ref);
    }

    //tonswap entry
    receive(msg: TonSwap){
        let ctx: Context = context(); // get sender Info
        let payload: SwapPayload = SwapPayload.fromSlice(msg.forward_payload);

        require(ctx.value >= (payload.amountIn + (payload.length * 50000000) + self.jettonFee), "Not enough TON");
        self.swapTokens(newAddress(0,0), payload.amountIn, payload.amountOutMin, payload.path, payload.length, payload.to, payload.deadline, payload.ref);
    }


    //update factory address
    fun swapTokens(tokenRoot: Address, amountIn: Int, amountOutMin: Int, path: map<Int, Address>, length: Int, to: Address, deadline: Int, ref: Address){
        //Facilitates swapping a specific amount of one token for another, going through one or more pairs. The path parameter is an array of token addresses that defines the route of the swap (e.g., [TokenA, TokenB, TokenC] for a multi-hop swap).
        require(now() <= deadline, "Swap expired");

        //complete first hoop
        if(path.get(0) != null){
            let pair: Address = path.get(0)!!;

            //send to pair for swap while leaving tokens here
            send(SendParameters{
                to: pair, 
                value: 50000000 * length,
                bounce: false,
                mode: 1,
                body: Swap{ tokenRoot: tokenRoot,
                    amount: amountIn,
                    receiver: to,
                    minimum: amountOutMin,
                    ref: ref,
                    path: path,
                    hops: 1,
                    length: length}.toCell()});
        }

        
    }

    //SwapCallBack
    receive(msg: SwapCallBack){
        //require its from a pair
        let ctx: Context = context(); // get sender Info

        let init: StateInit = initOf Pair(self.manager, msg.token0, msg.token1, self.factory);
        let pairAddress: Address = contractAddress(init);

        let amount: Int = msg.amountOut;
        let outWallet: Address = msg.walletOutAddress;
        if(msg.priceChanged){
            amount = msg.amountIn;
            outWallet = msg.walletInAddress
        }

        require(sender() == pairAddress, "Not Authorized");

        if(msg.priceChanged){
            //check if the priceChanged so return original token
            if(msg.tokenInAddress == newAddress(0,0)){

                send(SendParameters{
                    to: msg.receiver,
                    value: amount + self.jettonFee,
                    mode: 1,
                    bounce: false
                });

            }else{
                send_jetton(outWallet, msg.receiver, amount, 0, true, "transfer", self.jettonFee, self.manager);
            }
        }

        if(msg.pair == newAddress(0,0)){
            //check if the priceChanged so return original token or we are sending returns from a swap
            if(msg.tokenOutAddress == newAddress(0,0)){

                send(SendParameters{
                    to: msg.receiver,
                    value: amount + self.jettonFee,
                    mode: 1,
                    bounce: false
                });

            }else{
                send_jetton(outWallet, msg.receiver, amount, 0, true, "transfer", self.jettonFee, self.manager);
            }
        }


        //process fees
        // if(!msg.priceChanged){
        //     //final hop and fees are in TON
        //     if(msg.pair == newAddress(0,0) && (msg.outFee == 0 || msg.inFee == 0)){
        //         let workingFee: Int = (msg.outFee + msg.inFee) / 2;
        //         let remaining: Int = (msg.outFee + msg.inFee) / 2;

        //         //swappers cashback
        //         let outCashback: Int = (workingFee * self.cashBack) / 100;

        //         //refBonus
        //         let outRef: Int = 0;
        //         if(msg.ref != newAddress(0,0)){
        //             outRef = (workingFee * self.refBonus) / 100;
        //         }
                
        //         let refInit: StateInit = initOf RouterChild(msg.ref, myAddress());
        //         let refChildAddress: Address = contractAddress(init);

        //         let ownerInit: StateInit = initOf RouterChild(msg.receiver, myAddress());
        //         let ownerChildAddress: Address = contractAddress(init);


        //         //send to referral
        //         if(outRef > ton("0.01")){
        //                 send(SendParameters{
        //                 to: refChildAddress,
        //                 body: Update{ref: outRef, cashback: 0}.toCell(),
        //                 value: outRef,              // pay for message and potential deployment
        //                 mode: 1,
        //                 code: refInit.code,                // if child is not deployed, also deploy it
        //                 data: refInit.data
        //             });
        //         }else{
        //             workingFee = workingFee + outRef;
        //         }

        //         //send to swapper
        //         if(outCashback > ton("0.01")){
        //                 send(SendParameters{
        //                 to: ownerChildAddress,
        //                 body: Update{ref: 0, cashback: outCashback}.toCell(),
        //                 value: outCashback,              // pay for message and potential deployment
        //                 mode: 1,
        //                 code: ownerInit.code,                // if child is not deployed, also deploy it
        //                 data: ownerInit.data
        //             });
        //         }else{
        //             workingFee = workingFee + outCashback;
        //         }

        //         //make sure fee has not gone over
        //         if (workingFee > remaining) {
        //             workingFee = remaining;
        //         }

        //         //remaining out fee for admin
        //         //send to factory
        //         if(workingFee > 0){
        //             send(SendParameters{
        //             to: self.factory,
        //             value: workingFee,
        //             mode: 1,
        //             bounce: false
        //         });}

        //     }

        //     //not final hop and fees are in TON
        //     if(msg.pair != newAddress(0,0) && (msg.outFee == 0 || msg.inFee == 0)){
        //         let totalFee: Int = msg.outFee + msg.inFee;

        //         //no swappers cashback
        //         //no refBonus

        //         //send totalFee to factory
        //         send(SendParameters{
        //             to: self.factory,
        //             value: totalFee,
        //             mode: 1,
        //             bounce: false
        //         });
        //     }
        // }

        if(msg.pair != newAddress(0,0)){
            //check if there is another hop then we go there
            let tokenRoot: Address = newAddress(0,0);
            if(msg.tokenOutAddress != newAddress(0,0)){
                tokenRoot = msg.tokenOutAddress;
            }
            //send to pair for swap while leaving tokens here
            send(SendParameters{
                to: msg.pair, 
                value: (msg.length - msg.hops) * 50000000,
                bounce: false,
                mode: 1,
                body: Swap{ tokenRoot: tokenRoot,
                    amount: msg.amountOut,
                    receiver: msg.receiver,
                    minimum: 0,
                    ref: msg.ref,
                    path: msg.path,
                    hops: msg.hops + 1,
                    length: msg.length}.toCell()});
        }


        //emit the swap event that just concluded
        emit(EventSwap{
            pairAddress: sender(),
            amountIn: msg.amountIn, 
            amountOut: msg.amountOut, 
            token0: msg.token0, 
            token1: msg.token1, 
            reserve0: msg.reserve0,
            reserve1: msg.reserve1,
            reveiver: msg.receiver
        }.toCell());
    }

    //RemoveLpCallBack
    receive(msg: RemoveLpCallBack){
        //require its from a pair
        let ctx: Context = context(); // get sender Info

        let init: StateInit = initOf Pair(self.manager, msg.token0, msg.token1, self.factory);
        let pairAddress: Address = contractAddress(init);

        require(sender() == pairAddress, "Not Authorized");

        //send tokens back to owner
        if(msg.amount0IsTon){
            send(SendParameters{
                    to: msg.receiver,
                    value: msg.amount0,
                    mode: 1,
                    bounce: false
                });

        }else{
            send_jetton(msg.tokenAddress0, msg.receiver, msg.amount0 , 0, true, "transfer", self.jettonFee, self.manager);
        }

        if(msg.amount1IsTon){
            send(SendParameters{
                    to: msg.receiver,
                    value: msg.amount1,
                    mode: 1,
                    bounce: false
                });

        }else{
            send_jetton(msg.tokenAddress1, msg.receiver, msg.amount1 , 0, true, "transfer", self.jettonFee, self.manager);
        }

        emit(EventRemoveLp{
            pairAddress: sender(),
            amount0Out: msg.amount0, 
            amount1Out: msg.amount1, 
            token0: msg.token0, 
            token1: msg.token1, 
            reserve0: msg.reserve0,
            reserve1: msg.reserve1,
            reveiver: msg.receiver
        }.toCell());

    }

    //AddLpCallBack
    receive(msg: AddLpCallBack){
        //require its from a pair
        let ctx: Context = context(); // get sender Info

        let init: StateInit = initOf Pair(self.manager, msg.token0, msg.token1, self.factory);
        let pairAddress: Address = contractAddress(init);

        require(sender() == pairAddress, "Not Authorized");

        emit(EventAddLp{
            pairAddress: sender(),
            amount0In: msg.amount0, 
            amount1In: msg.amount1, 
            token0: msg.token0, 
            token1: msg.token1, 
            reserve0: msg.reserve0,
            reserve1: msg.reserve1,
            owner: msg.owner
        }.toCell());
    }


    //update cashback
    receive(msg: UpdateCashback){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.manager, "Access denied");
        self.cashBack = msg.cashback;
    }

    //update refbonus
    receive(msg: UpdateRefBonus){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.manager, "Access denied");
        self.refBonus = msg.refbonus;
    }

    //update jetonFee
    receive(msg: UpdatejettonFee){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.manager, "Access denied");
        self.jettonFee = msg.jettonFee;
    }

    //remove tokens
    //remove stucked tokens Admin
    receive(msg: RemoveToken){
        let ctx: Context = context(); // get sender Info
        require(ctx.sender == self.manager, "Not Owner");
        
        send_jetton(msg.wallet, self.manager, msg.amount, 0, false, "transfer", self.jettonFee, self.manager);

    }

    receive(msg: RemoveTon){
        let ctx: Context = context(); // get sender Info
        require(ctx.sender == self.manager, "Not Owner");

        send(SendParameters{
            to: self.manager,
            value: msg.amount,
            mode: 1,
            bounce: false
        });

    }

}

contract RouterChild {

    ref: Int = 0;
    refClaimed: Int = 0;
    cashBack: Int = 0;
    cashBackClaimed: Int = 0;
    owner: Address;
    router: Address;

    init(owner: Address, router: Address){
        self.owner = owner;
        self.router = router;
    }

    //update bonus
    receive(msg: Update){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.router, "Not Authorized");

        self.ref = self.ref + msg.ref;
        self.cashBack = self.cashBack + msg.cashback;
    }

    //claim Bonus
    receive("Claim"){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.owner, "Not Authorized");

        self.refClaimed = self.refClaimed + self.ref;
        self.cashBackClaimed = self.cashBackClaimed + self.cashBack;
        self.ref = 0;
        self.cashBack = 0;

        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: 128,
            bounce: false
        });
    }

    get fun get_stats(): StatsInfo { 
        return StatsInfo{
            ref: self.ref,
            refClaimed: self.refClaimed,
            cashBack: self.cashBack,
            cashBackClaimed: self.cashBackClaimed,
            owner: self.owner,
            router: self.router
        };
    }

}