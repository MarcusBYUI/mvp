import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type RemoveLiquidity = {
    $$type: 'RemoveLiquidity';
    query_id: bigint;
}

export function storeRemoveLiquidity(src: RemoveLiquidity) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadRemoveLiquidity(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'RemoveLiquidity' as const, query_id: _query_id };
}

function loadTupleRemoveLiquidity(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'RemoveLiquidity' as const, query_id: _query_id };
}

function loadGetterTupleRemoveLiquidity(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'RemoveLiquidity' as const, query_id: _query_id };
}

function storeTupleRemoveLiquidity(source: RemoveLiquidity) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserRemoveLiquidity(): DictionaryValue<RemoveLiquidity> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveLiquidity(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveLiquidity(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type CreatePair = {
    $$type: 'CreatePair';
    token0: Address;
    token1: Address;
    startTime: bigint;
    router: Address;
    token0Wallet: Address;
    token1Wallet: Address;
}

export function storeCreatePair(src: CreatePair) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3042820976, 32);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        b_0.storeInt(src.startTime, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.router);
        b_1.storeAddress(src.token0Wallet);
        b_1.storeAddress(src.token1Wallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreatePair(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3042820976) { throw Error('Invalid prefix'); }
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    let _startTime = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _router = sc_1.loadAddress();
    let _token0Wallet = sc_1.loadAddress();
    let _token1Wallet = sc_1.loadAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadTupleCreatePair(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _router = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadGetterTupleCreatePair(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _router = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function storeTupleCreatePair(source: CreatePair) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.startTime);
    builder.writeAddress(source.router);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    return builder.build();
}

function dictValueParserCreatePair(): DictionaryValue<CreatePair> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreatePair(src)).endCell());
        },
        parse: (src) => {
            return loadCreatePair(src.loadRef().beginParse());
        }
    }
}

export type PairInit = {
    $$type: 'PairInit';
    content: Cell;
    token0: Address;
    token1: Address;
    startTime: bigint;
    owner: Address;
    router: Address;
    jettonFee: bigint;
    token0Wallet: Address;
    token1Wallet: Address;
}

export function storePairInit(src: PairInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3074801746, 32);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        b_0.storeInt(src.startTime, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        b_1.storeAddress(src.router);
        b_1.storeInt(src.jettonFee, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.token0Wallet);
        b_2.storeAddress(src.token1Wallet);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPairInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3074801746) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    let _startTime = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadAddress();
    let _router = sc_1.loadAddress();
    let _jettonFee = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _token0Wallet = sc_2.loadAddress();
    let _token1Wallet = sc_2.loadAddress();
    return { $$type: 'PairInit' as const, content: _content, token0: _token0, token1: _token1, startTime: _startTime, owner: _owner, router: _router, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadTuplePairInit(source: TupleReader) {
    let _content = source.readCell();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'PairInit' as const, content: _content, token0: _token0, token1: _token1, startTime: _startTime, owner: _owner, router: _router, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadGetterTuplePairInit(source: TupleReader) {
    let _content = source.readCell();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'PairInit' as const, content: _content, token0: _token0, token1: _token1, startTime: _startTime, owner: _owner, router: _router, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function storeTuplePairInit(source: PairInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.startTime);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.router);
    builder.writeNumber(source.jettonFee);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    return builder.build();
}

function dictValueParserPairInit(): DictionaryValue<PairInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePairInit(src)).endCell());
        },
        parse: (src) => {
            return loadPairInit(src.loadRef().beginParse());
        }
    }
}

export type EventPairCreated = {
    $$type: 'EventPairCreated';
    token0: Address;
    token1: Address;
    pairAddress: Address;
    startTime: bigint;
}

export function storeEventPairCreated(src: EventPairCreated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(269207027, 32);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        b_0.storeAddress(src.pairAddress);
        let b_1 = new Builder();
        b_1.storeInt(src.startTime, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEventPairCreated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 269207027) { throw Error('Invalid prefix'); }
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    let _pairAddress = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _startTime = sc_1.loadIntBig(257);
    return { $$type: 'EventPairCreated' as const, token0: _token0, token1: _token1, pairAddress: _pairAddress, startTime: _startTime };
}

function loadTupleEventPairCreated(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _pairAddress = source.readAddress();
    let _startTime = source.readBigNumber();
    return { $$type: 'EventPairCreated' as const, token0: _token0, token1: _token1, pairAddress: _pairAddress, startTime: _startTime };
}

function loadGetterTupleEventPairCreated(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _pairAddress = source.readAddress();
    let _startTime = source.readBigNumber();
    return { $$type: 'EventPairCreated' as const, token0: _token0, token1: _token1, pairAddress: _pairAddress, startTime: _startTime };
}

function storeTupleEventPairCreated(source: EventPairCreated) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeAddress(source.pairAddress);
    builder.writeNumber(source.startTime);
    return builder.build();
}

function dictValueParserEventPairCreated(): DictionaryValue<EventPairCreated> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventPairCreated(src)).endCell());
        },
        parse: (src) => {
            return loadEventPairCreated(src.loadRef().beginParse());
        }
    }
}

export type TonSwap = {
    $$type: 'TonSwap';
    forward_payload: Slice;
}

export function storeTonSwap(src: TonSwap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3022893981, 32);
        b_0.storeRef(src.forward_payload.asCell());
    };
}

export function loadTonSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3022893981) { throw Error('Invalid prefix'); }
    let _forward_payload = sc_0.loadRef().asSlice();
    return { $$type: 'TonSwap' as const, forward_payload: _forward_payload };
}

function loadTupleTonSwap(source: TupleReader) {
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TonSwap' as const, forward_payload: _forward_payload };
}

function loadGetterTupleTonSwap(source: TupleReader) {
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TonSwap' as const, forward_payload: _forward_payload };
}

function storeTupleTonSwap(source: TonSwap) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTonSwap(): DictionaryValue<TonSwap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonSwap(src)).endCell());
        },
        parse: (src) => {
            return loadTonSwap(src.loadRef().beginParse());
        }
    }
}

export type Update = {
    $$type: 'Update';
    ref: bigint;
    cashback: bigint;
}

export function storeUpdate(src: Update) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(402702140, 32);
        b_0.storeInt(src.ref, 257);
        b_0.storeInt(src.cashback, 257);
    };
}

export function loadUpdate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 402702140) { throw Error('Invalid prefix'); }
    let _ref = sc_0.loadIntBig(257);
    let _cashback = sc_0.loadIntBig(257);
    return { $$type: 'Update' as const, ref: _ref, cashback: _cashback };
}

function loadTupleUpdate(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _cashback = source.readBigNumber();
    return { $$type: 'Update' as const, ref: _ref, cashback: _cashback };
}

function loadGetterTupleUpdate(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _cashback = source.readBigNumber();
    return { $$type: 'Update' as const, ref: _ref, cashback: _cashback };
}

function storeTupleUpdate(source: Update) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ref);
    builder.writeNumber(source.cashback);
    return builder.build();
}

function dictValueParserUpdate(): DictionaryValue<Update> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate(src.loadRef().beginParse());
        }
    }
}

export type AddLiquidityReply = {
    $$type: 'AddLiquidityReply';
    amount0: bigint;
    amount1: bigint;
    owner: Address;
}

export function storeAddLiquidityReply(src: AddLiquidityReply) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(860119373, 32);
        b_0.storeInt(src.amount0, 257);
        b_0.storeInt(src.amount1, 257);
        b_0.storeAddress(src.owner);
    };
}

export function loadAddLiquidityReply(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 860119373) { throw Error('Invalid prefix'); }
    let _amount0 = sc_0.loadIntBig(257);
    let _amount1 = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    return { $$type: 'AddLiquidityReply' as const, amount0: _amount0, amount1: _amount1, owner: _owner };
}

function loadTupleAddLiquidityReply(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'AddLiquidityReply' as const, amount0: _amount0, amount1: _amount1, owner: _owner };
}

function loadGetterTupleAddLiquidityReply(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'AddLiquidityReply' as const, amount0: _amount0, amount1: _amount1, owner: _owner };
}

function storeTupleAddLiquidityReply(source: AddLiquidityReply) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserAddLiquidityReply(): DictionaryValue<AddLiquidityReply> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddLiquidityReply(src)).endCell());
        },
        parse: (src) => {
            return loadAddLiquidityReply(src.loadRef().beginParse());
        }
    }
}

export type SwapPayload = {
    $$type: 'SwapPayload';
    tokenRoot: Address;
    amountIn: bigint;
    amountOutMin: bigint;
    path: Dictionary<bigint, Address>;
    length: bigint;
    to: Address;
    deadline: bigint;
    ref: Address;
}

export function storeSwapPayload(src: SwapPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.tokenRoot);
        b_0.storeInt(src.amountIn, 257);
        b_0.storeInt(src.amountOutMin, 257);
        b_0.storeDict(src.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        let b_1 = new Builder();
        b_1.storeInt(src.length, 257);
        b_1.storeAddress(src.to);
        b_1.storeInt(src.deadline, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.ref);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapPayload(slice: Slice) {
    let sc_0 = slice;
    let _tokenRoot = sc_0.loadAddress();
    let _amountIn = sc_0.loadIntBig(257);
    let _amountOutMin = sc_0.loadIntBig(257);
    let _path = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _length = sc_1.loadIntBig(257);
    let _to = sc_1.loadAddress();
    let _deadline = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _ref = sc_2.loadAddress();
    return { $$type: 'SwapPayload' as const, tokenRoot: _tokenRoot, amountIn: _amountIn, amountOutMin: _amountOutMin, path: _path, length: _length, to: _to, deadline: _deadline, ref: _ref };
}

function loadTupleSwapPayload(source: TupleReader) {
    let _tokenRoot = source.readAddress();
    let _amountIn = source.readBigNumber();
    let _amountOutMin = source.readBigNumber();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _length = source.readBigNumber();
    let _to = source.readAddress();
    let _deadline = source.readBigNumber();
    let _ref = source.readAddress();
    return { $$type: 'SwapPayload' as const, tokenRoot: _tokenRoot, amountIn: _amountIn, amountOutMin: _amountOutMin, path: _path, length: _length, to: _to, deadline: _deadline, ref: _ref };
}

function loadGetterTupleSwapPayload(source: TupleReader) {
    let _tokenRoot = source.readAddress();
    let _amountIn = source.readBigNumber();
    let _amountOutMin = source.readBigNumber();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _length = source.readBigNumber();
    let _to = source.readAddress();
    let _deadline = source.readBigNumber();
    let _ref = source.readAddress();
    return { $$type: 'SwapPayload' as const, tokenRoot: _tokenRoot, amountIn: _amountIn, amountOutMin: _amountOutMin, path: _path, length: _length, to: _to, deadline: _deadline, ref: _ref };
}

function storeTupleSwapPayload(source: SwapPayload) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tokenRoot);
    builder.writeNumber(source.amountIn);
    builder.writeNumber(source.amountOutMin);
    builder.writeCell(source.path.size > 0 ? beginCell().storeDictDirect(source.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.length);
    builder.writeAddress(source.to);
    builder.writeNumber(source.deadline);
    builder.writeAddress(source.ref);
    return builder.build();
}

function dictValueParserSwapPayload(): DictionaryValue<SwapPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapPayload(src)).endCell());
        },
        parse: (src) => {
            return loadSwapPayload(src.loadRef().beginParse());
        }
    }
}

export type SwapCallBack = {
    $$type: 'SwapCallBack';
    amountIn: bigint;
    amountOut: bigint;
    token0: Address;
    token1: Address;
    reserve0: bigint;
    reserve1: bigint;
    tokenInAddress: Address;
    tokenOutAddress: Address;
    receiver: Address;
    ref: Address;
    path: Dictionary<bigint, Address>;
    hops: bigint;
    outFee: bigint;
    inFee: bigint;
    length: bigint;
    pair: Address;
    isTon: boolean;
    priceChanged: boolean;
}

export function storeSwapCallBack(src: SwapCallBack) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3079016328, 32);
        b_0.storeInt(src.amountIn, 257);
        b_0.storeInt(src.amountOut, 257);
        b_0.storeAddress(src.token0);
        let b_1 = new Builder();
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.reserve0, 257);
        b_1.storeInt(src.reserve1, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.tokenInAddress);
        b_2.storeAddress(src.tokenOutAddress);
        b_2.storeAddress(src.receiver);
        let b_3 = new Builder();
        b_3.storeAddress(src.ref);
        b_3.storeDict(src.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_3.storeInt(src.hops, 257);
        b_3.storeInt(src.outFee, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.inFee, 257);
        b_4.storeInt(src.length, 257);
        b_4.storeAddress(src.pair);
        b_4.storeBit(src.isTon);
        b_4.storeBit(src.priceChanged);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapCallBack(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3079016328) { throw Error('Invalid prefix'); }
    let _amountIn = sc_0.loadIntBig(257);
    let _amountOut = sc_0.loadIntBig(257);
    let _token0 = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _token1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let _reserve1 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _tokenInAddress = sc_2.loadAddress();
    let _tokenOutAddress = sc_2.loadAddress();
    let _receiver = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _ref = sc_3.loadAddress();
    let _path = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_3);
    let _hops = sc_3.loadIntBig(257);
    let _outFee = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _inFee = sc_4.loadIntBig(257);
    let _length = sc_4.loadIntBig(257);
    let _pair = sc_4.loadAddress();
    let _isTon = sc_4.loadBit();
    let _priceChanged = sc_4.loadBit();
    return { $$type: 'SwapCallBack' as const, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, tokenInAddress: _tokenInAddress, tokenOutAddress: _tokenOutAddress, receiver: _receiver, ref: _ref, path: _path, hops: _hops, outFee: _outFee, inFee: _inFee, length: _length, pair: _pair, isTon: _isTon, priceChanged: _priceChanged };
}

function loadTupleSwapCallBack(source: TupleReader) {
    let _amountIn = source.readBigNumber();
    let _amountOut = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _tokenInAddress = source.readAddress();
    let _tokenOutAddress = source.readAddress();
    let _receiver = source.readAddress();
    let _ref = source.readAddress();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _hops = source.readBigNumber();
    let _outFee = source.readBigNumber();
    let _inFee = source.readBigNumber();
    source = source.readTuple();
    let _length = source.readBigNumber();
    let _pair = source.readAddress();
    let _isTon = source.readBoolean();
    let _priceChanged = source.readBoolean();
    return { $$type: 'SwapCallBack' as const, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, tokenInAddress: _tokenInAddress, tokenOutAddress: _tokenOutAddress, receiver: _receiver, ref: _ref, path: _path, hops: _hops, outFee: _outFee, inFee: _inFee, length: _length, pair: _pair, isTon: _isTon, priceChanged: _priceChanged };
}

function loadGetterTupleSwapCallBack(source: TupleReader) {
    let _amountIn = source.readBigNumber();
    let _amountOut = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _tokenInAddress = source.readAddress();
    let _tokenOutAddress = source.readAddress();
    let _receiver = source.readAddress();
    let _ref = source.readAddress();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _hops = source.readBigNumber();
    let _outFee = source.readBigNumber();
    let _inFee = source.readBigNumber();
    let _length = source.readBigNumber();
    let _pair = source.readAddress();
    let _isTon = source.readBoolean();
    let _priceChanged = source.readBoolean();
    return { $$type: 'SwapCallBack' as const, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, tokenInAddress: _tokenInAddress, tokenOutAddress: _tokenOutAddress, receiver: _receiver, ref: _ref, path: _path, hops: _hops, outFee: _outFee, inFee: _inFee, length: _length, pair: _pair, isTon: _isTon, priceChanged: _priceChanged };
}

function storeTupleSwapCallBack(source: SwapCallBack) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amountIn);
    builder.writeNumber(source.amountOut);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.tokenInAddress);
    builder.writeAddress(source.tokenOutAddress);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.ref);
    builder.writeCell(source.path.size > 0 ? beginCell().storeDictDirect(source.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.hops);
    builder.writeNumber(source.outFee);
    builder.writeNumber(source.inFee);
    builder.writeNumber(source.length);
    builder.writeAddress(source.pair);
    builder.writeBoolean(source.isTon);
    builder.writeBoolean(source.priceChanged);
    return builder.build();
}

function dictValueParserSwapCallBack(): DictionaryValue<SwapCallBack> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapCallBack(src)).endCell());
        },
        parse: (src) => {
            return loadSwapCallBack(src.loadRef().beginParse());
        }
    }
}

export type EventSwap = {
    $$type: 'EventSwap';
    pairAddress: Address;
    amountIn: bigint;
    amountOut: bigint;
    token0: Address;
    token1: Address;
    reserve0: bigint;
    reserve1: bigint;
    reveiver: Address;
}

export function storeEventSwap(src: EventSwap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1058521488, 32);
        b_0.storeAddress(src.pairAddress);
        b_0.storeInt(src.amountIn, 257);
        b_0.storeInt(src.amountOut, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.token0);
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.reserve0, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.reserve1, 257);
        b_2.storeAddress(src.reveiver);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEventSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1058521488) { throw Error('Invalid prefix'); }
    let _pairAddress = sc_0.loadAddress();
    let _amountIn = sc_0.loadIntBig(257);
    let _amountOut = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _token0 = sc_1.loadAddress();
    let _token1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _reserve1 = sc_2.loadIntBig(257);
    let _reveiver = sc_2.loadAddress();
    return { $$type: 'EventSwap' as const, pairAddress: _pairAddress, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function loadTupleEventSwap(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amountIn = source.readBigNumber();
    let _amountOut = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _reveiver = source.readAddress();
    return { $$type: 'EventSwap' as const, pairAddress: _pairAddress, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function loadGetterTupleEventSwap(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amountIn = source.readBigNumber();
    let _amountOut = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _reveiver = source.readAddress();
    return { $$type: 'EventSwap' as const, pairAddress: _pairAddress, amountIn: _amountIn, amountOut: _amountOut, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function storeTupleEventSwap(source: EventSwap) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pairAddress);
    builder.writeNumber(source.amountIn);
    builder.writeNumber(source.amountOut);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.reveiver);
    return builder.build();
}

function dictValueParserEventSwap(): DictionaryValue<EventSwap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventSwap(src)).endCell());
        },
        parse: (src) => {
            return loadEventSwap(src.loadRef().beginParse());
        }
    }
}

export type EventRemoveLp = {
    $$type: 'EventRemoveLp';
    pairAddress: Address;
    amount0Out: bigint;
    amount1Out: bigint;
    token0: Address;
    token1: Address;
    reserve0: bigint;
    reserve1: bigint;
    reveiver: Address;
}

export function storeEventRemoveLp(src: EventRemoveLp) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2196387526, 32);
        b_0.storeAddress(src.pairAddress);
        b_0.storeInt(src.amount0Out, 257);
        b_0.storeInt(src.amount1Out, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.token0);
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.reserve0, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.reserve1, 257);
        b_2.storeAddress(src.reveiver);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEventRemoveLp(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2196387526) { throw Error('Invalid prefix'); }
    let _pairAddress = sc_0.loadAddress();
    let _amount0Out = sc_0.loadIntBig(257);
    let _amount1Out = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _token0 = sc_1.loadAddress();
    let _token1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _reserve1 = sc_2.loadIntBig(257);
    let _reveiver = sc_2.loadAddress();
    return { $$type: 'EventRemoveLp' as const, pairAddress: _pairAddress, amount0Out: _amount0Out, amount1Out: _amount1Out, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function loadTupleEventRemoveLp(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amount0Out = source.readBigNumber();
    let _amount1Out = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _reveiver = source.readAddress();
    return { $$type: 'EventRemoveLp' as const, pairAddress: _pairAddress, amount0Out: _amount0Out, amount1Out: _amount1Out, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function loadGetterTupleEventRemoveLp(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amount0Out = source.readBigNumber();
    let _amount1Out = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _reveiver = source.readAddress();
    return { $$type: 'EventRemoveLp' as const, pairAddress: _pairAddress, amount0Out: _amount0Out, amount1Out: _amount1Out, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, reveiver: _reveiver };
}

function storeTupleEventRemoveLp(source: EventRemoveLp) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pairAddress);
    builder.writeNumber(source.amount0Out);
    builder.writeNumber(source.amount1Out);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.reveiver);
    return builder.build();
}

function dictValueParserEventRemoveLp(): DictionaryValue<EventRemoveLp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventRemoveLp(src)).endCell());
        },
        parse: (src) => {
            return loadEventRemoveLp(src.loadRef().beginParse());
        }
    }
}

export type EventAddLp = {
    $$type: 'EventAddLp';
    pairAddress: Address;
    amount0In: bigint;
    amount1In: bigint;
    token0: Address;
    token1: Address;
    reserve0: bigint;
    reserve1: bigint;
    owner: Address;
}

export function storeEventAddLp(src: EventAddLp) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4246935555, 32);
        b_0.storeAddress(src.pairAddress);
        b_0.storeInt(src.amount0In, 257);
        b_0.storeInt(src.amount1In, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.token0);
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.reserve0, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.reserve1, 257);
        b_2.storeAddress(src.owner);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEventAddLp(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4246935555) { throw Error('Invalid prefix'); }
    let _pairAddress = sc_0.loadAddress();
    let _amount0In = sc_0.loadIntBig(257);
    let _amount1In = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _token0 = sc_1.loadAddress();
    let _token1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _reserve1 = sc_2.loadIntBig(257);
    let _owner = sc_2.loadAddress();
    return { $$type: 'EventAddLp' as const, pairAddress: _pairAddress, amount0In: _amount0In, amount1In: _amount1In, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function loadTupleEventAddLp(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amount0In = source.readBigNumber();
    let _amount1In = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'EventAddLp' as const, pairAddress: _pairAddress, amount0In: _amount0In, amount1In: _amount1In, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function loadGetterTupleEventAddLp(source: TupleReader) {
    let _pairAddress = source.readAddress();
    let _amount0In = source.readBigNumber();
    let _amount1In = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'EventAddLp' as const, pairAddress: _pairAddress, amount0In: _amount0In, amount1In: _amount1In, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function storeTupleEventAddLp(source: EventAddLp) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pairAddress);
    builder.writeNumber(source.amount0In);
    builder.writeNumber(source.amount1In);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserEventAddLp(): DictionaryValue<EventAddLp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventAddLp(src)).endCell());
        },
        parse: (src) => {
            return loadEventAddLp(src.loadRef().beginParse());
        }
    }
}

export type AddLpCallBack = {
    $$type: 'AddLpCallBack';
    amount0: bigint;
    amount1: bigint;
    token0: Address;
    token1: Address;
    reserve0: bigint;
    reserve1: bigint;
    owner: Address;
}

export function storeAddLpCallBack(src: AddLpCallBack) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(920976549, 32);
        b_0.storeInt(src.amount0, 257);
        b_0.storeInt(src.amount1, 257);
        b_0.storeAddress(src.token0);
        let b_1 = new Builder();
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.reserve0, 257);
        b_1.storeInt(src.reserve1, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.owner);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAddLpCallBack(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 920976549) { throw Error('Invalid prefix'); }
    let _amount0 = sc_0.loadIntBig(257);
    let _amount1 = sc_0.loadIntBig(257);
    let _token0 = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _token1 = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let _reserve1 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _owner = sc_2.loadAddress();
    return { $$type: 'AddLpCallBack' as const, amount0: _amount0, amount1: _amount1, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function loadTupleAddLpCallBack(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'AddLpCallBack' as const, amount0: _amount0, amount1: _amount1, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function loadGetterTupleAddLpCallBack(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'AddLpCallBack' as const, amount0: _amount0, amount1: _amount1, token0: _token0, token1: _token1, reserve0: _reserve0, reserve1: _reserve1, owner: _owner };
}

function storeTupleAddLpCallBack(source: AddLpCallBack) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserAddLpCallBack(): DictionaryValue<AddLpCallBack> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddLpCallBack(src)).endCell());
        },
        parse: (src) => {
            return loadAddLpCallBack(src.loadRef().beginParse());
        }
    }
}

export type RemoveLpCallBack = {
    $$type: 'RemoveLpCallBack';
    reserve0: bigint;
    reserve1: bigint;
    token0: Address;
    token1: Address;
    amount0: bigint;
    amount0IsTon: boolean;
    tokenAddress0: Address;
    amount1: bigint;
    amount1IsTon: boolean;
    tokenAddress1: Address;
    receiver: Address;
}

export function storeRemoveLpCallBack(src: RemoveLpCallBack) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(141466067, 32);
        b_0.storeInt(src.reserve0, 257);
        b_0.storeInt(src.reserve1, 257);
        b_0.storeAddress(src.token0);
        let b_1 = new Builder();
        b_1.storeAddress(src.token1);
        b_1.storeInt(src.amount0, 257);
        b_1.storeBit(src.amount0IsTon);
        b_1.storeAddress(src.tokenAddress0);
        let b_2 = new Builder();
        b_2.storeInt(src.amount1, 257);
        b_2.storeBit(src.amount1IsTon);
        b_2.storeAddress(src.tokenAddress1);
        b_2.storeAddress(src.receiver);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRemoveLpCallBack(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 141466067) { throw Error('Invalid prefix'); }
    let _reserve0 = sc_0.loadIntBig(257);
    let _reserve1 = sc_0.loadIntBig(257);
    let _token0 = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _token1 = sc_1.loadAddress();
    let _amount0 = sc_1.loadIntBig(257);
    let _amount0IsTon = sc_1.loadBit();
    let _tokenAddress0 = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _amount1 = sc_2.loadIntBig(257);
    let _amount1IsTon = sc_2.loadBit();
    let _tokenAddress1 = sc_2.loadAddress();
    let _receiver = sc_2.loadAddress();
    return { $$type: 'RemoveLpCallBack' as const, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, amount0: _amount0, amount0IsTon: _amount0IsTon, tokenAddress0: _tokenAddress0, amount1: _amount1, amount1IsTon: _amount1IsTon, tokenAddress1: _tokenAddress1, receiver: _receiver };
}

function loadTupleRemoveLpCallBack(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount0IsTon = source.readBoolean();
    let _tokenAddress0 = source.readAddress();
    let _amount1 = source.readBigNumber();
    let _amount1IsTon = source.readBoolean();
    let _tokenAddress1 = source.readAddress();
    let _receiver = source.readAddress();
    return { $$type: 'RemoveLpCallBack' as const, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, amount0: _amount0, amount0IsTon: _amount0IsTon, tokenAddress0: _tokenAddress0, amount1: _amount1, amount1IsTon: _amount1IsTon, tokenAddress1: _tokenAddress1, receiver: _receiver };
}

function loadGetterTupleRemoveLpCallBack(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount0IsTon = source.readBoolean();
    let _tokenAddress0 = source.readAddress();
    let _amount1 = source.readBigNumber();
    let _amount1IsTon = source.readBoolean();
    let _tokenAddress1 = source.readAddress();
    let _receiver = source.readAddress();
    return { $$type: 'RemoveLpCallBack' as const, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, amount0: _amount0, amount0IsTon: _amount0IsTon, tokenAddress0: _tokenAddress0, amount1: _amount1, amount1IsTon: _amount1IsTon, tokenAddress1: _tokenAddress1, receiver: _receiver };
}

function storeTupleRemoveLpCallBack(source: RemoveLpCallBack) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.amount0);
    builder.writeBoolean(source.amount0IsTon);
    builder.writeAddress(source.tokenAddress0);
    builder.writeNumber(source.amount1);
    builder.writeBoolean(source.amount1IsTon);
    builder.writeAddress(source.tokenAddress1);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserRemoveLpCallBack(): DictionaryValue<RemoveLpCallBack> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveLpCallBack(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveLpCallBack(src.loadRef().beginParse());
        }
    }
}

export type StatsInfo = {
    $$type: 'StatsInfo';
    ref: bigint;
    refClaimed: bigint;
    cashBack: bigint;
    cashBackClaimed: bigint;
    owner: Address;
    router: Address;
}

export function storeStatsInfo(src: StatsInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.ref, 257);
        b_0.storeInt(src.refClaimed, 257);
        b_0.storeInt(src.cashBack, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.cashBackClaimed, 257);
        b_1.storeAddress(src.owner);
        b_1.storeAddress(src.router);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStatsInfo(slice: Slice) {
    let sc_0 = slice;
    let _ref = sc_0.loadIntBig(257);
    let _refClaimed = sc_0.loadIntBig(257);
    let _cashBack = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _cashBackClaimed = sc_1.loadIntBig(257);
    let _owner = sc_1.loadAddress();
    let _router = sc_1.loadAddress();
    return { $$type: 'StatsInfo' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function loadTupleStatsInfo(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _refClaimed = source.readBigNumber();
    let _cashBack = source.readBigNumber();
    let _cashBackClaimed = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    return { $$type: 'StatsInfo' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function loadGetterTupleStatsInfo(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _refClaimed = source.readBigNumber();
    let _cashBack = source.readBigNumber();
    let _cashBackClaimed = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    return { $$type: 'StatsInfo' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function storeTupleStatsInfo(source: StatsInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ref);
    builder.writeNumber(source.refClaimed);
    builder.writeNumber(source.cashBack);
    builder.writeNumber(source.cashBackClaimed);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.router);
    return builder.build();
}

function dictValueParserStatsInfo(): DictionaryValue<StatsInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStatsInfo(src)).endCell());
        },
        parse: (src) => {
            return loadStatsInfo(src.loadRef().beginParse());
        }
    }
}

export type UpdateCashback = {
    $$type: 'UpdateCashback';
    cashback: bigint;
}

export function storeUpdateCashback(src: UpdateCashback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2928063820, 32);
        b_0.storeInt(src.cashback, 257);
    };
}

export function loadUpdateCashback(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2928063820) { throw Error('Invalid prefix'); }
    let _cashback = sc_0.loadIntBig(257);
    return { $$type: 'UpdateCashback' as const, cashback: _cashback };
}

function loadTupleUpdateCashback(source: TupleReader) {
    let _cashback = source.readBigNumber();
    return { $$type: 'UpdateCashback' as const, cashback: _cashback };
}

function loadGetterTupleUpdateCashback(source: TupleReader) {
    let _cashback = source.readBigNumber();
    return { $$type: 'UpdateCashback' as const, cashback: _cashback };
}

function storeTupleUpdateCashback(source: UpdateCashback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.cashback);
    return builder.build();
}

function dictValueParserUpdateCashback(): DictionaryValue<UpdateCashback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateCashback(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCashback(src.loadRef().beginParse());
        }
    }
}

export type UpdateRefBonus = {
    $$type: 'UpdateRefBonus';
    refbonus: bigint;
}

export function storeUpdateRefBonus(src: UpdateRefBonus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1064255229, 32);
        b_0.storeInt(src.refbonus, 257);
    };
}

export function loadUpdateRefBonus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1064255229) { throw Error('Invalid prefix'); }
    let _refbonus = sc_0.loadIntBig(257);
    return { $$type: 'UpdateRefBonus' as const, refbonus: _refbonus };
}

function loadTupleUpdateRefBonus(source: TupleReader) {
    let _refbonus = source.readBigNumber();
    return { $$type: 'UpdateRefBonus' as const, refbonus: _refbonus };
}

function loadGetterTupleUpdateRefBonus(source: TupleReader) {
    let _refbonus = source.readBigNumber();
    return { $$type: 'UpdateRefBonus' as const, refbonus: _refbonus };
}

function storeTupleUpdateRefBonus(source: UpdateRefBonus) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.refbonus);
    return builder.build();
}

function dictValueParserUpdateRefBonus(): DictionaryValue<UpdateRefBonus> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateRefBonus(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRefBonus(src.loadRef().beginParse());
        }
    }
}

export type UpdatejettonFee = {
    $$type: 'UpdatejettonFee';
    jettonFee: bigint;
}

export function storeUpdatejettonFee(src: UpdatejettonFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(731348483, 32);
        b_0.storeInt(src.jettonFee, 257);
    };
}

export function loadUpdatejettonFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 731348483) { throw Error('Invalid prefix'); }
    let _jettonFee = sc_0.loadIntBig(257);
    return { $$type: 'UpdatejettonFee' as const, jettonFee: _jettonFee };
}

function loadTupleUpdatejettonFee(source: TupleReader) {
    let _jettonFee = source.readBigNumber();
    return { $$type: 'UpdatejettonFee' as const, jettonFee: _jettonFee };
}

function loadGetterTupleUpdatejettonFee(source: TupleReader) {
    let _jettonFee = source.readBigNumber();
    return { $$type: 'UpdatejettonFee' as const, jettonFee: _jettonFee };
}

function storeTupleUpdatejettonFee(source: UpdatejettonFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.jettonFee);
    return builder.build();
}

function dictValueParserUpdatejettonFee(): DictionaryValue<UpdatejettonFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatejettonFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatejettonFee(src.loadRef().beginParse());
        }
    }
}

export type Swap = {
    $$type: 'Swap';
    tokenRoot: Address;
    amount: bigint;
    receiver: Address;
    minimum: bigint;
    path: Dictionary<bigint, Address>;
    hops: bigint;
    length: bigint;
    ref: Address;
}

export function storeSwap(src: Swap) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1738969590, 32);
        b_0.storeAddress(src.tokenRoot);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
        let b_1 = new Builder();
        b_1.storeInt(src.minimum, 257);
        b_1.storeDict(src.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_1.storeInt(src.hops, 257);
        b_1.storeInt(src.length, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.ref);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwap(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1738969590) { throw Error('Invalid prefix'); }
    let _tokenRoot = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _minimum = sc_1.loadIntBig(257);
    let _path = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_1);
    let _hops = sc_1.loadIntBig(257);
    let _length = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _ref = sc_2.loadAddress();
    return { $$type: 'Swap' as const, tokenRoot: _tokenRoot, amount: _amount, receiver: _receiver, minimum: _minimum, path: _path, hops: _hops, length: _length, ref: _ref };
}

function loadTupleSwap(source: TupleReader) {
    let _tokenRoot = source.readAddress();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _minimum = source.readBigNumber();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _hops = source.readBigNumber();
    let _length = source.readBigNumber();
    let _ref = source.readAddress();
    return { $$type: 'Swap' as const, tokenRoot: _tokenRoot, amount: _amount, receiver: _receiver, minimum: _minimum, path: _path, hops: _hops, length: _length, ref: _ref };
}

function loadGetterTupleSwap(source: TupleReader) {
    let _tokenRoot = source.readAddress();
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    let _minimum = source.readBigNumber();
    let _path = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _hops = source.readBigNumber();
    let _length = source.readBigNumber();
    let _ref = source.readAddress();
    return { $$type: 'Swap' as const, tokenRoot: _tokenRoot, amount: _amount, receiver: _receiver, minimum: _minimum, path: _path, hops: _hops, length: _length, ref: _ref };
}

function storeTupleSwap(source: Swap) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tokenRoot);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.minimum);
    builder.writeCell(source.path.size > 0 ? beginCell().storeDictDirect(source.path, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.hops);
    builder.writeNumber(source.length);
    builder.writeAddress(source.ref);
    return builder.build();
}

function dictValueParserSwap(): DictionaryValue<Swap> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwap(src)).endCell());
        },
        parse: (src) => {
            return loadSwap(src.loadRef().beginParse());
        }
    }
}

export type CreateChildPair = {
    $$type: 'CreateChildPair';
    owner: Address;
    token0Wallet: Address;
    token1Wallet: Address;
}

export function storeCreateChildPair(src: CreateChildPair) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3199865964, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.token0Wallet);
        b_0.storeAddress(src.token1Wallet);
    };
}

export function loadCreateChildPair(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3199865964) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    let _token0Wallet = sc_0.loadAddress();
    let _token1Wallet = sc_0.loadAddress();
    return { $$type: 'CreateChildPair' as const, owner: _owner, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadTupleCreateChildPair(source: TupleReader) {
    let _owner = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreateChildPair' as const, owner: _owner, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadGetterTupleCreateChildPair(source: TupleReader) {
    let _owner = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreateChildPair' as const, owner: _owner, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function storeTupleCreateChildPair(source: CreateChildPair) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    return builder.build();
}

function dictValueParserCreateChildPair(): DictionaryValue<CreateChildPair> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateChildPair(src)).endCell());
        },
        parse: (src) => {
            return loadCreateChildPair(src.loadRef().beginParse());
        }
    }
}

export type ProvideLp = {
    $$type: 'ProvideLp';
    reserve0: bigint;
    reserve1: bigint;
}

export function storeProvideLp(src: ProvideLp) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(867446982, 32);
        b_0.storeInt(src.reserve0, 257);
        b_0.storeInt(src.reserve1, 257);
    };
}

export function loadProvideLp(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 867446982) { throw Error('Invalid prefix'); }
    let _reserve0 = sc_0.loadIntBig(257);
    let _reserve1 = sc_0.loadIntBig(257);
    return { $$type: 'ProvideLp' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function loadTupleProvideLp(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    return { $$type: 'ProvideLp' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function loadGetterTupleProvideLp(source: TupleReader) {
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    return { $$type: 'ProvideLp' as const, reserve0: _reserve0, reserve1: _reserve1 };
}

function storeTupleProvideLp(source: ProvideLp) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    return builder.build();
}

function dictValueParserProvideLp(): DictionaryValue<ProvideLp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideLp(src)).endCell());
        },
        parse: (src) => {
            return loadProvideLp(src.loadRef().beginParse());
        }
    }
}

export type RemoveTokensAdmin = {
    $$type: 'RemoveTokensAdmin';
    amount0: bigint;
    amount1: bigint;
}

export function storeRemoveTokensAdmin(src: RemoveTokensAdmin) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2117914317, 32);
        b_0.storeInt(src.amount0, 257);
        b_0.storeInt(src.amount1, 257);
    };
}

export function loadRemoveTokensAdmin(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2117914317) { throw Error('Invalid prefix'); }
    let _amount0 = sc_0.loadIntBig(257);
    let _amount1 = sc_0.loadIntBig(257);
    return { $$type: 'RemoveTokensAdmin' as const, amount0: _amount0, amount1: _amount1 };
}

function loadTupleRemoveTokensAdmin(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'RemoveTokensAdmin' as const, amount0: _amount0, amount1: _amount1 };
}

function loadGetterTupleRemoveTokensAdmin(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'RemoveTokensAdmin' as const, amount0: _amount0, amount1: _amount1 };
}

function storeTupleRemoveTokensAdmin(source: RemoveTokensAdmin) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    return builder.build();
}

function dictValueParserRemoveTokensAdmin(): DictionaryValue<RemoveTokensAdmin> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveTokensAdmin(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveTokensAdmin(src.loadRef().beginParse());
        }
    }
}

export type SwapInit = {
    $$type: 'SwapInit';
    rootIn: Address;
    rootOut: Address;
    tokenIn: Address;
    tokenOut: Address;
    reserveIn: bigint;
    reserveOut: bigint;
}

export function storeSwapInit(src: SwapInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.rootIn);
        b_0.storeAddress(src.rootOut);
        b_0.storeAddress(src.tokenIn);
        let b_1 = new Builder();
        b_1.storeAddress(src.tokenOut);
        b_1.storeInt(src.reserveIn, 257);
        b_1.storeInt(src.reserveOut, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSwapInit(slice: Slice) {
    let sc_0 = slice;
    let _rootIn = sc_0.loadAddress();
    let _rootOut = sc_0.loadAddress();
    let _tokenIn = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tokenOut = sc_1.loadAddress();
    let _reserveIn = sc_1.loadIntBig(257);
    let _reserveOut = sc_1.loadIntBig(257);
    return { $$type: 'SwapInit' as const, rootIn: _rootIn, rootOut: _rootOut, tokenIn: _tokenIn, tokenOut: _tokenOut, reserveIn: _reserveIn, reserveOut: _reserveOut };
}

function loadTupleSwapInit(source: TupleReader) {
    let _rootIn = source.readAddress();
    let _rootOut = source.readAddress();
    let _tokenIn = source.readAddress();
    let _tokenOut = source.readAddress();
    let _reserveIn = source.readBigNumber();
    let _reserveOut = source.readBigNumber();
    return { $$type: 'SwapInit' as const, rootIn: _rootIn, rootOut: _rootOut, tokenIn: _tokenIn, tokenOut: _tokenOut, reserveIn: _reserveIn, reserveOut: _reserveOut };
}

function loadGetterTupleSwapInit(source: TupleReader) {
    let _rootIn = source.readAddress();
    let _rootOut = source.readAddress();
    let _tokenIn = source.readAddress();
    let _tokenOut = source.readAddress();
    let _reserveIn = source.readBigNumber();
    let _reserveOut = source.readBigNumber();
    return { $$type: 'SwapInit' as const, rootIn: _rootIn, rootOut: _rootOut, tokenIn: _tokenIn, tokenOut: _tokenOut, reserveIn: _reserveIn, reserveOut: _reserveOut };
}

function storeTupleSwapInit(source: SwapInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.rootIn);
    builder.writeAddress(source.rootOut);
    builder.writeAddress(source.tokenIn);
    builder.writeAddress(source.tokenOut);
    builder.writeNumber(source.reserveIn);
    builder.writeNumber(source.reserveOut);
    return builder.build();
}

function dictValueParserSwapInit(): DictionaryValue<SwapInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSwapInit(src)).endCell());
        },
        parse: (src) => {
            return loadSwapInit(src.loadRef().beginParse());
        }
    }
}

export type PairChildInit = {
    $$type: 'PairChildInit';
    token0: Address;
    token1: Address;
    jettonFee: bigint;
    token0Wallet: Address;
    token1Wallet: Address;
}

export function storePairChildInit(src: PairChildInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1079802306, 32);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        b_0.storeInt(src.jettonFee, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.token0Wallet);
        b_1.storeAddress(src.token1Wallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPairChildInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1079802306) { throw Error('Invalid prefix'); }
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    let _jettonFee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _token0Wallet = sc_1.loadAddress();
    let _token1Wallet = sc_1.loadAddress();
    return { $$type: 'PairChildInit' as const, token0: _token0, token1: _token1, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadTuplePairChildInit(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'PairChildInit' as const, token0: _token0, token1: _token1, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadGetterTuplePairChildInit(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'PairChildInit' as const, token0: _token0, token1: _token1, jettonFee: _jettonFee, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function storeTuplePairChildInit(source: PairChildInit) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.jettonFee);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    return builder.build();
}

function dictValueParserPairChildInit(): DictionaryValue<PairChildInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePairChildInit(src)).endCell());
        },
        parse: (src) => {
            return loadPairChildInit(src.loadRef().beginParse());
        }
    }
}

export type LiqOut = {
    $$type: 'LiqOut';
    amount0: bigint;
    amount1: bigint;
}

export function storeLiqOut(src: LiqOut) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amount0, 257);
        b_0.storeInt(src.amount1, 257);
    };
}

export function loadLiqOut(slice: Slice) {
    let sc_0 = slice;
    let _amount0 = sc_0.loadIntBig(257);
    let _amount1 = sc_0.loadIntBig(257);
    return { $$type: 'LiqOut' as const, amount0: _amount0, amount1: _amount1 };
}

function loadTupleLiqOut(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'LiqOut' as const, amount0: _amount0, amount1: _amount1 };
}

function loadGetterTupleLiqOut(source: TupleReader) {
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    return { $$type: 'LiqOut' as const, amount0: _amount0, amount1: _amount1 };
}

function storeTupleLiqOut(source: LiqOut) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    return builder.build();
}

function dictValueParserLiqOut(): DictionaryValue<LiqOut> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiqOut(src)).endCell());
        },
        parse: (src) => {
            return loadLiqOut(src.loadRef().beginParse());
        }
    }
}

export type PairInfo = {
    $$type: 'PairInfo';
    total_supply: bigint;
    manager: Address;
    router: Address;
    jettonFee: bigint;
    content: Cell | null;
    mintable: boolean;
    owner: Address;
    factory: Address;
    reserve0: bigint;
    reserve1: bigint;
    token0: Address;
    token1: Address;
    token0Wallet: Address;
    token1Wallet: Address;
    fee: bigint;
    startTime: bigint;
    initialized: boolean;
}

export function storePairInfo(src: PairInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.router);
        b_0.storeInt(src.jettonFee, 257);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeBit(src.mintable);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        b_1.storeAddress(src.factory);
        b_1.storeInt(src.reserve0, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.reserve1, 257);
        b_2.storeAddress(src.token0);
        b_2.storeAddress(src.token1);
        let b_3 = new Builder();
        b_3.storeAddress(src.token0Wallet);
        b_3.storeAddress(src.token1Wallet);
        b_3.storeInt(src.fee, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.startTime, 257);
        b_4.storeBit(src.initialized);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPairInfo(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _manager = sc_0.loadAddress();
    let _router = sc_0.loadAddress();
    let _jettonFee = sc_0.loadIntBig(257);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _mintable = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadAddress();
    let _factory = sc_1.loadAddress();
    let _reserve0 = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _reserve1 = sc_2.loadIntBig(257);
    let _token0 = sc_2.loadAddress();
    let _token1 = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _token0Wallet = sc_3.loadAddress();
    let _token1Wallet = sc_3.loadAddress();
    let _fee = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _startTime = sc_4.loadIntBig(257);
    let _initialized = sc_4.loadBit();
    return { $$type: 'PairInfo' as const, total_supply: _total_supply, manager: _manager, router: _router, jettonFee: _jettonFee, content: _content, mintable: _mintable, owner: _owner, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, fee: _fee, startTime: _startTime, initialized: _initialized };
}

function loadTuplePairInfo(source: TupleReader) {
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
    source = source.readTuple();
    let _fee = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _initialized = source.readBoolean();
    return { $$type: 'PairInfo' as const, total_supply: _total_supply, manager: _manager, router: _router, jettonFee: _jettonFee, content: _content, mintable: _mintable, owner: _owner, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, fee: _fee, startTime: _startTime, initialized: _initialized };
}

function loadGetterTuplePairInfo(source: TupleReader) {
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
    return { $$type: 'PairInfo' as const, total_supply: _total_supply, manager: _manager, router: _router, jettonFee: _jettonFee, content: _content, mintable: _mintable, owner: _owner, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, fee: _fee, startTime: _startTime, initialized: _initialized };
}

function storeTuplePairInfo(source: PairInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.router);
    builder.writeNumber(source.jettonFee);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.startTime);
    builder.writeBoolean(source.initialized);
    return builder.build();
}

function dictValueParserPairInfo(): DictionaryValue<PairInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePairInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPairInfo(src.loadRef().beginParse());
        }
    }
}

export type PairChildInfo = {
    $$type: 'PairChildInfo';
    owner: Address;
    manager: Address;
    pair: Address;
    jettonFee: bigint;
    router: Address;
    token0: Address;
    token1: Address;
    token0Wallet: Address;
    token1Wallet: Address;
    amount0: bigint;
    amount1: bigint;
    initialized: boolean;
}

export function storePairChildInfo(src: PairChildInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.pair);
        let b_1 = new Builder();
        b_1.storeInt(src.jettonFee, 257);
        b_1.storeAddress(src.router);
        b_1.storeAddress(src.token0);
        let b_2 = new Builder();
        b_2.storeAddress(src.token1);
        b_2.storeAddress(src.token0Wallet);
        b_2.storeAddress(src.token1Wallet);
        let b_3 = new Builder();
        b_3.storeInt(src.amount0, 257);
        b_3.storeInt(src.amount1, 257);
        b_3.storeBit(src.initialized);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPairChildInfo(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _manager = sc_0.loadAddress();
    let _pair = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonFee = sc_1.loadIntBig(257);
    let _router = sc_1.loadAddress();
    let _token0 = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _token1 = sc_2.loadAddress();
    let _token0Wallet = sc_2.loadAddress();
    let _token1Wallet = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _amount0 = sc_3.loadIntBig(257);
    let _amount1 = sc_3.loadIntBig(257);
    let _initialized = sc_3.loadBit();
    return { $$type: 'PairChildInfo' as const, owner: _owner, manager: _manager, pair: _pair, jettonFee: _jettonFee, router: _router, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, initialized: _initialized };
}

function loadTuplePairChildInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _manager = source.readAddress();
    let _pair = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _router = source.readAddress();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _initialized = source.readBoolean();
    return { $$type: 'PairChildInfo' as const, owner: _owner, manager: _manager, pair: _pair, jettonFee: _jettonFee, router: _router, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, initialized: _initialized };
}

function loadGetterTuplePairChildInfo(source: TupleReader) {
    let _owner = source.readAddress();
    let _manager = source.readAddress();
    let _pair = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _router = source.readAddress();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let _initialized = source.readBoolean();
    return { $$type: 'PairChildInfo' as const, owner: _owner, manager: _manager, pair: _pair, jettonFee: _jettonFee, router: _router, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, initialized: _initialized };
}

function storeTuplePairChildInfo(source: PairChildInfo) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.pair);
    builder.writeNumber(source.jettonFee);
    builder.writeAddress(source.router);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    builder.writeBoolean(source.initialized);
    return builder.build();
}

function dictValueParserPairChildInfo(): DictionaryValue<PairChildInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePairChildInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPairChildInfo(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    amount: bigint;
    receiver: Address;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _receiver = sc_0.loadAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function loadGetterTupleMint(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _receiver = source.readAddress();
    return { $$type: 'Mint' as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type Pair$Data = {
    $$type: 'Pair$Data';
    total_supply: bigint;
    content: Cell | null;
    totalSupply: bigint;
    manager: Address;
    router: Address;
    mintable: boolean;
    owner: Address;
    jettonFee: bigint;
    factory: Address;
    reserve0: bigint;
    reserve1: bigint;
    token0: Address;
    token1: Address;
    token0Wallet: Address;
    token1Wallet: Address;
    routerWallet: Address;
    fee: bigint;
    startTime: bigint;
    _initialized: boolean;
}

export function storePair$Data(src: Pair$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.totalSupply);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.router);
        b_0.storeBit(src.mintable);
        let b_1 = new Builder();
        b_1.storeAddress(src.owner);
        b_1.storeInt(src.jettonFee, 257);
        b_1.storeAddress(src.factory);
        let b_2 = new Builder();
        b_2.storeInt(src.reserve0, 257);
        b_2.storeInt(src.reserve1, 257);
        b_2.storeAddress(src.token0);
        let b_3 = new Builder();
        b_3.storeAddress(src.token1);
        b_3.storeAddress(src.token0Wallet);
        b_3.storeAddress(src.token1Wallet);
        let b_4 = new Builder();
        b_4.storeAddress(src.routerWallet);
        b_4.storeInt(src.fee, 257);
        b_4.storeInt(src.startTime, 257);
        b_4.storeBit(src._initialized);
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPair$Data(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _totalSupply = sc_0.loadCoins();
    let _manager = sc_0.loadAddress();
    let _router = sc_0.loadAddress();
    let _mintable = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _owner = sc_1.loadAddress();
    let _jettonFee = sc_1.loadIntBig(257);
    let _factory = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _reserve0 = sc_2.loadIntBig(257);
    let _reserve1 = sc_2.loadIntBig(257);
    let _token0 = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _token1 = sc_3.loadAddress();
    let _token0Wallet = sc_3.loadAddress();
    let _token1Wallet = sc_3.loadAddress();
    let sc_4 = sc_3.loadRef().beginParse();
    let _routerWallet = sc_4.loadAddress();
    let _fee = sc_4.loadIntBig(257);
    let _startTime = sc_4.loadIntBig(257);
    let __initialized = sc_4.loadBit();
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, totalSupply: _totalSupply, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function loadTuplePair$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _content = source.readCellOpt();
    let _totalSupply = source.readBigNumber();
    let _manager = source.readAddress();
    let _router = source.readAddress();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    source = source.readTuple();
    let _token1Wallet = source.readAddress();
    let _routerWallet = source.readAddress();
    let _fee = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let __initialized = source.readBoolean();
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, totalSupply: _totalSupply, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function loadGetterTuplePair$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _content = source.readCellOpt();
    let _totalSupply = source.readBigNumber();
    let _manager = source.readAddress();
    let _router = source.readAddress();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _reserve0 = source.readBigNumber();
    let _reserve1 = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _routerWallet = source.readAddress();
    let _fee = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let __initialized = source.readBoolean();
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, totalSupply: _totalSupply, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function storeTuplePair$Data(source: Pair$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeCell(source.content);
    builder.writeNumber(source.totalSupply);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.router);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.jettonFee);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.reserve0);
    builder.writeNumber(source.reserve1);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    builder.writeAddress(source.routerWallet);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.startTime);
    builder.writeBoolean(source._initialized);
    return builder.build();
}

function dictValueParserPair$Data(): DictionaryValue<Pair$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePair$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPair$Data(src.loadRef().beginParse());
        }
    }
}

export type PairChild$Data = {
    $$type: 'PairChild$Data';
    owner: Address;
    manager: Address;
    pair: Address;
    router: Address;
    jettonFee: bigint;
    token0: Address;
    token1: Address;
    token0Wallet: Address;
    token1Wallet: Address;
    amount0: bigint;
    amount1: bigint;
    _initialized: boolean;
}

export function storePairChild$Data(src: PairChild$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.pair);
        let b_1 = new Builder();
        b_1.storeAddress(src.router);
        b_1.storeInt(src.jettonFee, 257);
        b_1.storeAddress(src.token0);
        let b_2 = new Builder();
        b_2.storeAddress(src.token1);
        b_2.storeAddress(src.token0Wallet);
        b_2.storeAddress(src.token1Wallet);
        let b_3 = new Builder();
        b_3.storeInt(src.amount0, 257);
        b_3.storeInt(src.amount1, 257);
        b_3.storeBit(src._initialized);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPairChild$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _manager = sc_0.loadAddress();
    let _pair = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _router = sc_1.loadAddress();
    let _jettonFee = sc_1.loadIntBig(257);
    let _token0 = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _token1 = sc_2.loadAddress();
    let _token0Wallet = sc_2.loadAddress();
    let _token1Wallet = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _amount0 = sc_3.loadIntBig(257);
    let _amount1 = sc_3.loadIntBig(257);
    let __initialized = sc_3.loadBit();
    return { $$type: 'PairChild$Data' as const, owner: _owner, manager: _manager, pair: _pair, router: _router, jettonFee: _jettonFee, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, _initialized: __initialized };
}

function loadTuplePairChild$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _manager = source.readAddress();
    let _pair = source.readAddress();
    let _router = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let __initialized = source.readBoolean();
    return { $$type: 'PairChild$Data' as const, owner: _owner, manager: _manager, pair: _pair, router: _router, jettonFee: _jettonFee, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, _initialized: __initialized };
}

function loadGetterTuplePairChild$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _manager = source.readAddress();
    let _pair = source.readAddress();
    let _router = source.readAddress();
    let _jettonFee = source.readBigNumber();
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    let _amount0 = source.readBigNumber();
    let _amount1 = source.readBigNumber();
    let __initialized = source.readBoolean();
    return { $$type: 'PairChild$Data' as const, owner: _owner, manager: _manager, pair: _pair, router: _router, jettonFee: _jettonFee, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, amount0: _amount0, amount1: _amount1, _initialized: __initialized };
}

function storeTuplePairChild$Data(source: PairChild$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.pair);
    builder.writeAddress(source.router);
    builder.writeNumber(source.jettonFee);
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeAddress(source.token0Wallet);
    builder.writeAddress(source.token1Wallet);
    builder.writeNumber(source.amount0);
    builder.writeNumber(source.amount1);
    builder.writeBoolean(source._initialized);
    return builder.build();
}

function dictValueParserPairChild$Data(): DictionaryValue<PairChild$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePairChild$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPairChild$Data(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    responseAddress: Address | null;
    forwardTonAmount: bigint;
    forwardPayload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.responseAddress);
        b_0.storeCoins(src.forwardTonAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, responseAddress: _responseAddress, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.responseAddress);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0;
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    queryId: bigint;
    amount: bigint;
    owner: Address;
    responseAddress: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.responseAddress);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _responseAddress = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _responseAddress = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, responseAddress: _responseAddress };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.responseAddress);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell | null;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(201882270, 32);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 201882270) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCellOpt();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCellOpt();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell | null;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        if (src.content !== null && src.content !== undefined) { b_0.storeBit(true).storeRef(src.content); } else { b_0.storeBit(false); }
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _totalSupply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCellOpt();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _totalSupply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCellOpt();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type JettonDefaultWallet$Data = {
    $$type: 'JettonDefaultWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
}

export function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadJettonDefaultWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master };
}

function loadTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master };
}

function loadGetterTupleJettonDefaultWallet$Data(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    return { $$type: 'JettonDefaultWallet$Data' as const, balance: _balance, owner: _owner, master: _master };
}

function storeTupleJettonDefaultWallet$Data(source: JettonDefaultWallet$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    return builder.build();
}

function dictValueParserJettonDefaultWallet$Data(): DictionaryValue<JettonDefaultWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonDefaultWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonDefaultWallet$Data(src.loadRef().beginParse());
        }
    }
}

export type Router$Data = {
    $$type: 'Router$Data';
    manager: Address;
    factory: Address;
    cashBack: bigint;
    refBonus: bigint;
    jettonFee: bigint;
}

export function storeRouter$Data(src: Router$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.factory);
        b_0.storeInt(src.cashBack, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.refBonus, 257);
        b_1.storeInt(src.jettonFee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRouter$Data(slice: Slice) {
    let sc_0 = slice;
    let _manager = sc_0.loadAddress();
    let _factory = sc_0.loadAddress();
    let _cashBack = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _refBonus = sc_1.loadIntBig(257);
    let _jettonFee = sc_1.loadIntBig(257);
    return { $$type: 'Router$Data' as const, manager: _manager, factory: _factory, cashBack: _cashBack, refBonus: _refBonus, jettonFee: _jettonFee };
}

function loadTupleRouter$Data(source: TupleReader) {
    let _manager = source.readAddress();
    let _factory = source.readAddress();
    let _cashBack = source.readBigNumber();
    let _refBonus = source.readBigNumber();
    let _jettonFee = source.readBigNumber();
    return { $$type: 'Router$Data' as const, manager: _manager, factory: _factory, cashBack: _cashBack, refBonus: _refBonus, jettonFee: _jettonFee };
}

function loadGetterTupleRouter$Data(source: TupleReader) {
    let _manager = source.readAddress();
    let _factory = source.readAddress();
    let _cashBack = source.readBigNumber();
    let _refBonus = source.readBigNumber();
    let _jettonFee = source.readBigNumber();
    return { $$type: 'Router$Data' as const, manager: _manager, factory: _factory, cashBack: _cashBack, refBonus: _refBonus, jettonFee: _jettonFee };
}

function storeTupleRouter$Data(source: Router$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.manager);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.cashBack);
    builder.writeNumber(source.refBonus);
    builder.writeNumber(source.jettonFee);
    return builder.build();
}

function dictValueParserRouter$Data(): DictionaryValue<Router$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRouter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRouter$Data(src.loadRef().beginParse());
        }
    }
}

export type RouterChild$Data = {
    $$type: 'RouterChild$Data';
    ref: bigint;
    refClaimed: bigint;
    cashBack: bigint;
    cashBackClaimed: bigint;
    owner: Address;
    router: Address;
}

export function storeRouterChild$Data(src: RouterChild$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.ref, 257);
        b_0.storeInt(src.refClaimed, 257);
        b_0.storeInt(src.cashBack, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.cashBackClaimed, 257);
        b_1.storeAddress(src.owner);
        b_1.storeAddress(src.router);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRouterChild$Data(slice: Slice) {
    let sc_0 = slice;
    let _ref = sc_0.loadIntBig(257);
    let _refClaimed = sc_0.loadIntBig(257);
    let _cashBack = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _cashBackClaimed = sc_1.loadIntBig(257);
    let _owner = sc_1.loadAddress();
    let _router = sc_1.loadAddress();
    return { $$type: 'RouterChild$Data' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function loadTupleRouterChild$Data(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _refClaimed = source.readBigNumber();
    let _cashBack = source.readBigNumber();
    let _cashBackClaimed = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    return { $$type: 'RouterChild$Data' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function loadGetterTupleRouterChild$Data(source: TupleReader) {
    let _ref = source.readBigNumber();
    let _refClaimed = source.readBigNumber();
    let _cashBack = source.readBigNumber();
    let _cashBackClaimed = source.readBigNumber();
    let _owner = source.readAddress();
    let _router = source.readAddress();
    return { $$type: 'RouterChild$Data' as const, ref: _ref, refClaimed: _refClaimed, cashBack: _cashBack, cashBackClaimed: _cashBackClaimed, owner: _owner, router: _router };
}

function storeTupleRouterChild$Data(source: RouterChild$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ref);
    builder.writeNumber(source.refClaimed);
    builder.writeNumber(source.cashBack);
    builder.writeNumber(source.cashBackClaimed);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.router);
    return builder.build();
}

function dictValueParserRouterChild$Data(): DictionaryValue<RouterChild$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRouterChild$Data(src)).endCell());
        },
        parse: (src) => {
            return loadRouterChild$Data(src.loadRef().beginParse());
        }
    }
}

 type PairChild_init_args = {
    $$type: 'PairChild_init_args';
    owner: Address;
    manager: Address;
    router: Address;
    pair: Address;
    token0: Address;
    token1: Address;
}

function initPairChild_init_args(src: PairChild_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.router);
        let b_1 = new Builder();
        b_1.storeAddress(src.pair);
        b_1.storeAddress(src.token0);
        b_1.storeAddress(src.token1);
        b_0.storeRef(b_1.endCell());
    };
}

async function PairChild_init(owner: Address, manager: Address, router: Address, pair: Address, token0: Address, token1: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPairChild_init_args({ $$type: 'PairChild_init_args', owner, manager, router, pair, token0, token1 })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PairChild_errors: { [key: number]: { message: string } } = {
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
    13650: { message: `Invalid bounced message` },
    14924: { message: `Not Parent` },
    15304: { message: `Not enough TON` },
    16059: { message: `Invalid value` },
    23273: { message: `Not Authorized` },
    30404: { message: `Invalid Amount` },
    31791: { message: `Swap expired` },
    49469: { message: `Access denied` },
    61985: { message: `Not From Child` },
    62972: { message: `Invalid balance` },
}

const PairChild_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"RemoveLiquidity","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CreatePair","header":3042820976,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PairInit","header":3074801746,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventPairCreated","header":269207027,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TonSwap","header":3022893981,"fields":[{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Update","header":402702140,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashback","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AddLiquidityReply","header":860119373,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SwapPayload","header":null,"fields":[{"name":"tokenRoot","type":{"kind":"simple","type":"address","optional":false}},{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOutMin","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"deadline","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SwapCallBack","header":3079016328,"fields":[{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"tokenInAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenOutAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"hops","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"outFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"inFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"isTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"priceChanged","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"EventSwap","header":1058521488,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amountIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amountOut","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reveiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventRemoveLp","header":2196387526,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0Out","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1Out","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reveiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventAddLp","header":4246935555,"fields":[{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0In","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1In","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddLpCallBack","header":920976549,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveLpCallBack","header":141466067,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount0IsTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tokenAddress0","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1IsTon","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tokenAddress1","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"StatsInfo","header":null,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBackClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateCashback","header":2928063820,"fields":[{"name":"cashback","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateRefBonus","header":1064255229,"fields":[{"name":"refbonus","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdatejettonFee","header":731348483,"fields":[{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Swap","header":1738969590,"fields":[{"name":"tokenRoot","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"minimum","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"path","type":{"kind":"dict","key":"int","value":"address"}},{"name":"hops","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"ref","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateChildPair","header":3199865964,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ProvideLp","header":867446982,"fields":[{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveTokensAdmin","header":2117914317,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SwapInit","header":null,"fields":[{"name":"rootIn","type":{"kind":"simple","type":"address","optional":false}},{"name":"rootOut","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenIn","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenOut","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserveIn","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserveOut","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PairChildInit","header":1079802306,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiqOut","header":null,"fields":[{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"PairInfo","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PairChildInfo","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Pair$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"totalSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"routerWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PairChild$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangeOwner","header":256331011,"fields":[{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseAddress","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":201882270,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonDefaultWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Router$Data","header":null,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refBonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RouterChild$Data","header":null,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBackClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
]

const PairChild_getters: ABIGetter[] = [
    {"name":"childinfo","arguments":[],"returnType":{"kind":"simple","type":"PairChildInfo","optional":false}},
]

export const PairChild_getterMapping: { [key: string]: string } = {
    'childinfo': 'getChildinfo',
}

const PairChild_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"PairChildInit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"text","text":"DepositTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProvideLp"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveTokensAdmin"}},
    {"receiver":"internal","message":{"kind":"text","text":"RemoveTokens"}},
]

export class PairChild implements Contract {
    
    static async init(owner: Address, manager: Address, router: Address, pair: Address, token0: Address, token1: Address) {
        return await PairChild_init(owner, manager, router, pair, token0, token1);
    }
    
    static async fromInit(owner: Address, manager: Address, router: Address, pair: Address, token0: Address, token1: Address) {
        const init = await PairChild_init(owner, manager, router, pair, token0, token1);
        const address = contractAddress(0, init);
        return new PairChild(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PairChild(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PairChild_types,
        getters: PairChild_getters,
        receivers: PairChild_receivers,
        errors: PairChild_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: PairChildInit | TokenNotification | 'DepositTon' | ProvideLp | RemoveTokensAdmin | 'RemoveTokens') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PairChildInit') {
            body = beginCell().store(storePairChildInit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message === 'DepositTon') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProvideLp') {
            body = beginCell().store(storeProvideLp(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveTokensAdmin') {
            body = beginCell().store(storeRemoveTokensAdmin(message)).endCell();
        }
        if (message === 'RemoveTokens') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getChildinfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('childinfo', builder.build())).stack;
        const result = loadGetterTuplePairChildInfo(source);
        return result;
    }
    
}