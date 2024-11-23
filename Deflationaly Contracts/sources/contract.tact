import "./jetton";

message Mint {
    amount: Int;
    receiver: Address;
}

contract DeflationaryJetton with Jetton {
    total_supply: Int as coins;
    owner: Address;
    collector: Address;
    factory: Address; //whitelisted by default to prevent messing up price during lp provisioning
    content: Cell;
    mintable: Bool;
    fee: Int;
    whitelist: map<Address, Bool>;
    _initialized: Bool;

    init(owner: Address, content: Cell) {
        self._initialized = false;
        self.total_supply = 0;
        self.owner = owner;
        self.mintable = true;
        self.content = content;
        self.fee = 0;
        self.whitelist = emptyMap();
        self.collector = owner;
        self.factory = owner;
    }

    receive(msg: InitJetton) {
        let ctx: Context = context();
        require(!self._initialized, "Already Initialized");
        self._initialized = true;
        require(ctx.sender == self.owner, "Not owner");
        self.fee = msg.tax;
        self.collector = msg.collector;
        self.factory = msg.factory;
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, response_destination)
    }

    receive(msg: Mint) { // 0xfc708bd2
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        require(self.mintable, "Not mintable");
        self.mint(msg.receiver, msg.amount, self.owner); // (to, amount, response_destination)
    }

    receive("MintClose") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.mintable = false;
    }

    receive("Renounce") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.owner = newAddress(0, 0);
    }

    receive(msg: UpdateFee) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.fee = msg.fee;
    }

    receive(msg: UpdateCollector) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.collector = msg.collector;
    }

    receive(msg: AddToWhitelist) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.whitelist.set(msg.address, true);
    }

    receive(msg: RemoveFromWhitelist) {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.whitelist.set(msg.address, false);

    }

    receive(msg: Info) {
        //check sender is child
        let init: StateInit = initOf JettonDefaultWallet(myAddress(), msg.owner);  
        let walletAddress: Address = contractAddress(init);   

        require(sender() == walletAddress, "Not Authorized");
        let tempWl: map<Address, Bool> = self.whitelist;
        tempWl.set(self.factory, true);

        //return a type with fee, collector and whitelisted addresses
        self.reply(TokenTransferCallback{
            queryId: msg.queryId,
            amount: msg.amount,
            destination: msg.destination,
            response_destination: msg.response_destination,
            custom_payload: msg.custom_payload,
            forward_ton_amount: msg.forward_ton_amount,
            forward_payload: msg.forward_payload, // Comment Text message when Transfer the jetton
            whitelist: tempWl,
            fee: self.fee,
            collector: self.collector
        }.toCell());
    }

    //get taxInfo
    get fun get_info(): JettonInfo {
        return JettonInfo{
            mint: self.mintable,
            whitelist: self.whitelist,
            tax: self.fee,
            collector: self.collector
        };
    }
} 