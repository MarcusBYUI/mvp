const {
    Cell,
    Slice,
    beginCell,
    contractAddress,
    TupleBuilder,
} = require('@ton/core');



function initPair_init_args(src) {
    return (builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        let b_1 = new Builder();
        b_1.storeAddress(src.factory);
        b_0.storeRef(b_1.endCell());
    };
}

function loadGetterTuplePairInfo(source) {
    let _total_supply = source.readBigNumber();
    let _manager = source.readAddress();
    let _router = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _content = source.readCellOpt();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _factory = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _fee = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _initialized = source.readBoolean();
    return { $$type: 'PairInfo', total_supply: _total_supply, manager: _manager, router: _router, jettonFee: _jettonFee, content: _content, mintable: _mintable, owner: _owner, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, fee: _fee, startTime: _startTime, initialized: _initialized };
}

async function Pair_init(manager, token0, token1, factory) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPair_init_args({ $$type: 'Pair_init_args', manager, token0, token1, factory })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pair_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3688: { message: `Not mintable` },
    3734: { message: `Not Owner` },
    4429: { message: `Invalid sender` },
    9438: { message: `Already Initialized` },
    13193: { message: `Not Enough Gas` },
    14924: { message: `Not Parent` },
    15304: { message: `Not enough TON` },
    16059: { message: `Invalid value` },
    18668: { message: `Can't Mint Anymore` },
    23273: { message: `Not Authorized` },
    23951: { message: `Insufficient gas` },
    30404: { message: `Invalid Amount` },
    31791: { message: `Swap expired` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    49469: { message: `Access denied` },
    61985: { message: `Not From Child` },
    62972: { message: `Invalid balance` },
}

const Pair_types = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonContent","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"RemoveLiquidity","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CreatePair","header":2368217834,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PairInit","header":1051351456,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventPairCreated","header":269207027,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TonSwap","header":3022893981,"fields":[{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Update","header":402702140,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashback","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SwapPayload","header":null,"fields":[{"name":"tokenRoot","type":{"kind":"simple","type":"address","optional":false}},{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOutMin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"deadline","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddLiquidityReply","header":860119373,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventSwap","header":1058521488,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reveiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventRemoveLp","header":2196387526,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0Out","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1Out","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reveiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventAddLp","header":4246935555,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0In","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1In","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddLpCallBack","header":920976549,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SwapCallBack","header":3079016328,"fields":[{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenInAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenOutAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"hops","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"outFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"inFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"isTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"priceChanged","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"RemoveLpCallBack","header":141466067,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount0IsTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tokenAddress0","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1IsTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tokenAddress1","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StatsInfo","header":null,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBackClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateCashback","header":2928063820,"fields":[{"name":"cashback","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateRefBonus","header":1064255229,"fields":[{"name":"refbonus","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Swap","header":1738969590,"fields":[{"name":"tokenRoot","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"minimum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"hops","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateChildPair","header":3585805533,"fields":[{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProvideLp","header":867446982,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveTokensAdmin","header":2117914317,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SwapInit","header":null,"fields":[{"name":"rootIn","type":{"kind":"simple","type":"address","optional":false}},{"name":"rootOut","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenIn","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenOut","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserveIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveOut","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PairChildInit","header":3232323112,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiqOut","header":null,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Pair$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PairChild$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"JettonDefaultWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Router$Data","header":null,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refBonus","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RouterChild$Data","header":null,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBackClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Pair_getters = [
    {"name":"get_start_time","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_reserve0","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_reserve1","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_lp_out","arguments":[{"name":"shares","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LiqOut","optional":false}},
    {"name":"get_amount_out","arguments":[{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenRoot","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_pairchild","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pair_getterMapping = {
    'get_start_time': 'getGetStartTime',
    'get_reserve0': 'getGetReserve0',
    'get_reserve1': 'getGetReserve1',
    'get_lp_out': 'getGetLpOut',
    'get_amount_out': 'getGetAmountOut',
    'get_pairchild': 'getGetPairchild',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'owner': 'getOwner',
}

const Pair_receivers = [
    {"receiver":"internal","message":{"kind":"typed","type":"PairInit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateChildPair"}},
    {"receiver":"internal","message":{"kind":"text","text":"InitAddLiquidity"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddLiquidityReply"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Swap"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideWalletAddress"}},
]

class Pair {
    
    static async init(manager, token0, token1, factory) {
        return await Pair_init(manager, token0, token1, factory);
    }
    
    static async fromInit(manager, token0, token1, factory) {
        const init = await Pair_init(manager, token0, token1, factory);
        const address = contractAddress(0, init);
        return new Pair(address, init);
    }
    
    static fromAddress(address) {
        return new Pair(address);
    }
    
    address; 
    init;
    abi = {
        types:  Pair_types,
        getters: Pair_getters,
        receivers: Pair_receivers,
        errors: Pair_errors,
    };
    
    constructor(address, init) {
        this.address = address;
        this.init = init;
    }
    

    
    async getGetStartTime(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_start_time', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetReserve0(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_reserve0', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetReserve1(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_reserve1', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetLpOut(provider, shares) {
        let builder = new TupleBuilder();
        builder.writeNumber(shares);
        let source = (await provider.get('get_lp_out', builder.build())).stack;
        const result = loadGetterTupleLiqOut(source);
        return result;
    }
    
    async getGetAmountOut(provider, amountIn, tokenRoot) {
        let builder = new TupleBuilder();
        builder.writeNumber(amountIn);
        builder.writeAddress(tokenRoot);
        let source = (await provider.get('get_amount_out', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPairchild(provider, owner) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_pairchild', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetJettonData(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider, owner) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }

    async getParentinfo(provider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('parentinfo', builder.build())).stack;
        const result = loadGetterTuplePairInfo(source);
        return result;
    }
    
}

module.exports = {Pair}