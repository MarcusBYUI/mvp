
import "./pair";
import "./message";
const minTonsForStorage: Int = ton("0.01");

contract Factory {
    manager: Address;
    jettonFee: Int;
    created: Int;

    init (manager: Address){
        self.manager = manager;
        self.jettonFee = ton("0.09");
        self.created = 654859818946057;
    }

    fun _getSendValue (value: Int) : Int {
        let msgValue: Int = value; // Check the gasCost for storage
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - storageFee; 

        return msgValue;
    }

    receive(msg: CreatePair){
        let ctx: Context = context(); // get sender Info

        let a: Int = beginCell().storeAddress(msg.token0).endCell().hash();
        let b: Int = beginCell().storeAddress(msg.token1).endCell().hash();

        let token0: Address = msg.token1;
        let token1: Address = msg.token0;

        require(a != b, "Can't pair the same token");

        if (a < b){
            token0 = msg.token0;
            token1 = msg.token1;
        }

        let init: StateInit = initOf Pair(self.manager, token0, token1, myAddress());
        let childAddress: Address = contractAddress(init);

        send(SendParameters{
                    to: childAddress,
                    body: PairInit{ content: msg.content,
                                    token0: token0,
                                    token1: token1,
                                    startTime: msg.startTime,
                                    owner: sender(),
                                    router: msg.router,
                                    jettonFee: self.jettonFee,
                                    token0Wallet: msg.token0Wallet,
                                    token1Wallet: msg.token1Wallet
                                    }.toCell(),
                    value: ton("0.1"),              // pay for message and potential deployment
                    mode: 1,
                    code: init.code,                // if child is not deployed, also deploy it
                    data: init.data
        });

        emit(EventPairCreated{
            token0: token0, 
            token1: token1, 
            pairAddress: childAddress,
            startTime: msg.startTime
        }.toCell());

    }

    //update jetonFee
    receive(msg: UpdatejettonFee){
        let ctx: Context = context(); // get sender Info
        require(sender() == self.manager, "Access denied");
        self.jettonFee = msg.jettonFee;
    }

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

    //get pair
    get fun get_pair(tokenA: Address, tokenB: Address): Address {   

        let a: Int = beginCell().storeAddress(tokenA).endCell().hash();
        let b: Int = beginCell().storeAddress(tokenB).endCell().hash();  

        let token0: Address = tokenB;
        let token1: Address = tokenA;

        if (a < b){
            token0 = tokenA;
            token1 = tokenB;
        }

        let init: StateInit = initOf Pair(self.manager, token0, token1, myAddress());

        return contractAddress(init);

    }


}

//add other helpers
