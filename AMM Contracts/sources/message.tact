struct JettonData {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

struct JettonContent {
    name: String;
    description: String;
    symbol: String;
    image: String;
}

struct JettonWalletData {
    balance: Int;
    owner: Address;
    master: Address;
    code: Cell;
}

message(0xf8a7ea5) TokenTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address?;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; 
}

message(0x178d4519) TokenTransferInternal {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    response_destination: Address?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    sender: Address;
    forward_payload: Slice as remaining;
}

message(0x595f07bc) TokenBurn {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address?;
    custom_payload: Cell?;
}

message(0x7bdd97de) TokenBurnNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    sender: Address;
    response_destination: Address?;
}

message(0xd53276db) TokenExcesses {
    query_id: Int as uint64;
}


message TokenUpdateContent {
    content: Cell;
}

// ==== TEP89: Jetton Wallet Discovery ====
message(0x2c76b973) ProvideWalletAddress {
    query_id: Int as uint64;
    owner_address: Address;
    include_address: Bool;
}

// take_wallet_address#d1735400 
// query_id:uint64 wallet_address:MsgAddress owner_address:(Maybe ^MsgAddress) = InternalMsgBody;
message(0xd1735400) TakeWalletAddress {
    query_id: Int as uint64;
    wallet_address: Address;
    owner_address: Slice as remaining;
}

message(0xd53276db) RemoveLiquidity {
    query_id: Int as uint64;
}


inline fun send_jetton_with_ton(
    jetton_address: Address, 
    to: Address, 
    amount: Int, 
    amount_ton: Int,
    query_id: Int, 
    bounce: Bool,
    forward_payload: Slice
) {
    if (amount > 0) {
        send(SendParameters{
            value: ton("0.1") + amount_ton, 
            to: jetton_address, 
            mode: 0,
            body: TokenTransfer {
                query_id: query_id,
                amount: amount,
                destination: to,
                response_destination: myAddress(),
                custom_payload: null,
                forward_ton_amount: amount_ton,
                forward_payload: forward_payload
            }.toCell(),
            bounce: bounce 
        });
    }
}


inline fun send_jetton(
    jetton_address: Address, 
    to: Address, 
    amount: Int, 
    query_id: Int, 
    bounce: Bool,
    forward_payload: String,
    value: Int,
    manager: Address
) {
    if (amount > 0) {
        send(SendParameters{
            value: value, 
            to: jetton_address, 
            mode: 0,
            body: TokenTransfer {
                query_id: query_id,
                amount: amount,
                destination: to,
                response_destination: manager,
                custom_payload: null,
                forward_ton_amount: ton("0.0000001"),  // forward for notification
                forward_payload: forward_payload.asSlice()
            }.toCell(),
            bounce: bounce 
        });
    }
}


//////////////
//////////
////////// FACTORY
//////////

message CreatePair {
    token0: Address;  
    token1: Address; 
    startTime: Int; 
    content: Cell; 
    router: Address;
    token0Wallet: Address;
    token1Wallet: Address;   
}

message PairInit{
    content: Cell;
    token0: Address;
    token1: Address;
    startTime: Int;
    owner: Address;
    router: Address;
    jettonFee: Int;
    token0Wallet: Address;
    token1Wallet: Address;

}

message EventPairCreated {
    token0: Address;
    token1: Address;
    pairAddress: Address;
    startTime: Int;
}

//////////////
//////////
////////// ROUTER
//////////

message RemoveTon{
    amount: Int;
}

message RemoveToken{
    amount: Int;
    wallet: Address;
}


message TonSwap{
    forward_payload: Slice;
}

message Update{
    ref: Int;
    cashback: Int;
}



message AddLiquidityReply {
    amount0: Int;
    amount1: Int;
    owner: Address;
}

struct SwapPayload{
    tokenRoot: Address;
    amountIn: Int;
    amountOutMin: Int;
    path: map<Int, Address>;
    length: Int;
    to: Address;
    deadline: Int;
    ref: Address;
}

message SwapCallBack{
    amountIn: Int; 
    amountOut: Int; 
    token0: Address; 
    token1: Address; 
    reserve0: Int;
    reserve1: Int;
    tokenInAddress: Address; 
    tokenOutAddress: Address; 
    receiver: Address;
    ref: Address;
    path: map<Int, Address>;
    hops: Int;
    outFee: Int;
    inFee: Int;
    length: Int;
    pair: Address;
    isTon: Bool;
    priceChanged: Bool;
}


message EventSwap {
    pairAddress: Address;
    amountIn: Int; 
    amountOut: Int; 
    token0: Address; 
    token1: Address; 
    reserve0: Int;
    reserve1: Int;
    reveiver: Address;
}

message EventRemoveLp {
    pairAddress: Address;
    amount0Out: Int; 
    amount1Out: Int; 
    token0: Address; 
    token1: Address; 
    reserve0: Int;
    reserve1: Int;
    reveiver: Address;
}

message EventAddLp {
    pairAddress: Address;
    amount0In: Int; 
    amount1In: Int; 
    token0: Address; 
    token1: Address; 
    reserve0: Int;
    reserve1: Int;
    owner: Address;
}

message AddLpCallBack{
    amount0: Int; 
    amount1: Int; 
    token0: Address; 
    token1: Address; 
    reserve0: Int;
    reserve1: Int;
    owner: Address;
}



message RemoveLpCallBack{
    reserve0: Int;
    reserve1: Int;
    token0: Address;
    token1: Address;
    amount0: Int;
    amount0IsTon: Bool;
    tokenAddress0: Address;
    amount1: Int;
    amount1IsTon: Bool;
    tokenAddress1: Address;
    receiver: Address;
}

struct StatsInfo{
    ref: Int;
    refClaimed: Int;
    cashBack: Int;
    cashBackClaimed: Int;
    owner: Address;
    router: Address;
}

message UpdateCashback{
    cashback: Int;
}

message UpdateRefBonus{
    refbonus: Int;
}

message UpdatejettonFee{
    jettonFee: Int;
}

//////////////
//////////
////////// PAIR
//////////

message Swap{
    tokenRoot: Address;
    amount: Int;
    receiver: Address;
    minimum: Int;
    path: map<Int, Address>;
    hops: Int;
    length: Int;
    ref: Address;
}

message CreateChildPair{
    owner: Address;
    token0Wallet: Address;
    token1Wallet: Address;
}

message ProvideLp{
    reserve0: Int;
    reserve1: Int;
}

message RemoveTokensAdmin{
    amount0: Int;
    amount1: Int;
}

struct SwapInit{
    rootIn: Address;
    rootOut: Address;
    tokenIn: Address;
    tokenOut: Address;
    reserveIn: Int;
    reserveOut: Int;
}

message PairChildInit{
    token0: Address;
    token1: Address;
    jettonFee: Int;
    token0Wallet: Address;
    token1Wallet: Address;
}

struct LiqOut{
    amount0: Int;
    amount1: Int;
}

struct PairInfo{
    total_supply: Int as coins;
    manager: Address;
    router: Address;
    jettonFee: Int;
    content: Cell?;
    mintable: Bool;
    owner: Address;
    factory: Address; //public
    reserve0: Int; //public
    reserve1: Int; //public
    token0: Address; //public
    token1: Address; //public
    token0Wallet: Address; //public
    token1Wallet: Address; //public
    fee: Int; //0.3%
    startTime: Int; // Pool start time //public
    initialized: Bool;
}

struct PairChildInfo{
    owner: Address;
    manager: Address;
    pair: Address;
    jettonFee: Int;
    router: Address;
    token0: Address;
    token1: Address;
    token0Wallet: Address;
    token1Wallet: Address;
    amount0: Int = 0;
    amount1: Int = 0;
    initialized: Bool;
}

message RemoveTokens{
    wallet: Address;
    amount: Int;
}