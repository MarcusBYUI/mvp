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
        self.jettonFee = ton("0.1");
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
        let outWallet: Address = msg.tokenOutAddress;
        if(msg.priceChanged){
            amount = msg.amountIn;
            outWallet = msg.tokenInAddress
        }

        require(sender() == pairAddress, "Not Authorized");

        if(msg.priceChanged || msg.pair == newAddress(0,0)){
            //check if the priceChanged so return original token or we are sending returns from a swap
            if(msg.isTon){

                send(SendParameters{
                    to: msg.receiver,
                    value: amount,
                    mode: 1,
                    bounce: false
                });

            }else{
                send_jetton(outWallet, msg.receiver, amount, 0, true, "transfer", self.jettonFee, self.manager);
            }
        }

       
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
