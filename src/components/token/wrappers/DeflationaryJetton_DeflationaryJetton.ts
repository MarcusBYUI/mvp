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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
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

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
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

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
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

export type Info = {
    $$type: 'Info';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeInfo(src: Info) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(755332654, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.storeCoins(src.forward_ton_amount);
        b_1.storeBuilder(src.forward_payload.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 755332654) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _forward_ton_amount = sc_1.loadCoins();
    let _forward_payload = sc_1;
    return { $$type: 'Info' as const, queryId: _queryId, amount: _amount, destination: _destination, owner: _owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInfo(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Info' as const, queryId: _queryId, amount: _amount, destination: _destination, owner: _owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleInfo(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Info' as const, queryId: _queryId, amount: _amount, destination: _destination, owner: _owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInfo(source: Info) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserInfo(): DictionaryValue<Info> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInfo(src)).endCell());
        },
        parse: (src) => {
            return loadInfo(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    queryId: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, queryId: _queryId, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
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

export type JettonInfo = {
    $$type: 'JettonInfo';
    mint: boolean;
    whitelist: Dictionary<Address, boolean>;
    tax: bigint;
    collector: Address;
}

export function storeJettonInfo(src: JettonInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.mint);
        b_0.storeDict(src.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_0.storeInt(src.tax, 257);
        b_0.storeAddress(src.collector);
    };
}

export function loadJettonInfo(slice: Slice) {
    let sc_0 = slice;
    let _mint = sc_0.loadBit();
    let _whitelist = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let _tax = sc_0.loadIntBig(257);
    let _collector = sc_0.loadAddress();
    return { $$type: 'JettonInfo' as const, mint: _mint, whitelist: _whitelist, tax: _tax, collector: _collector };
}

function loadTupleJettonInfo(source: TupleReader) {
    let _mint = source.readBoolean();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tax = source.readBigNumber();
    let _collector = source.readAddress();
    return { $$type: 'JettonInfo' as const, mint: _mint, whitelist: _whitelist, tax: _tax, collector: _collector };
}

function loadGetterTupleJettonInfo(source: TupleReader) {
    let _mint = source.readBoolean();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tax = source.readBigNumber();
    let _collector = source.readAddress();
    return { $$type: 'JettonInfo' as const, mint: _mint, whitelist: _whitelist, tax: _tax, collector: _collector };
}

function storeTupleJettonInfo(source: JettonInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.mint);
    builder.writeCell(source.whitelist.size > 0 ? beginCell().storeDictDirect(source.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.tax);
    builder.writeAddress(source.collector);
    return builder.build();
}

function dictValueParserJettonInfo(): DictionaryValue<JettonInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonInfo(src)).endCell());
        },
        parse: (src) => {
            return loadJettonInfo(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
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
    response_destination: Address;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'TokenBurn' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
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
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, queryId: _queryId, amount: _amount, owner: _owner, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.response_destination);
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
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
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

export type TokenTransferCallback = {
    $$type: 'TokenTransferCallback';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    whitelist: Dictionary<Address, boolean>;
    fee: bigint;
    collector: Address;
    forward_payload: Slice;
}

export function storeTokenTransferCallback(src: TokenTransferCallback) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4084879879, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeDict(src.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        let b_1 = new Builder();
        b_1.storeInt(src.fee, 257);
        b_1.storeAddress(src.collector);
        b_1.storeBuilder(src.forward_payload.asBuilder());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTokenTransferCallback(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4084879879) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _whitelist = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee = sc_1.loadIntBig(257);
    let _collector = sc_1.loadAddress();
    let _forward_payload = sc_1;
    return { $$type: 'TokenTransferCallback' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, whitelist: _whitelist, fee: _fee, collector: _collector, forward_payload: _forward_payload };
}

function loadTupleTokenTransferCallback(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _fee = source.readBigNumber();
    let _collector = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferCallback' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, whitelist: _whitelist, fee: _fee, collector: _collector, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferCallback(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _fee = source.readBigNumber();
    let _collector = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferCallback' as const, queryId: _queryId, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, whitelist: _whitelist, fee: _fee, collector: _collector, forward_payload: _forward_payload };
}

function storeTupleTokenTransferCallback(source: TokenTransferCallback) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.whitelist.size > 0 ? beginCell().storeDictDirect(source.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeNumber(source.fee);
    builder.writeAddress(source.collector);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferCallback(): DictionaryValue<TokenTransferCallback> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferCallback(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferCallback(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _walletCode = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _walletCode = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
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

export type UpdateFee = {
    $$type: 'UpdateFee';
    fee: bigint;
}

export function storeUpdateFee(src: UpdateFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2418308439, 32);
        b_0.storeInt(src.fee, 257);
    };
}

export function loadUpdateFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2418308439) { throw Error('Invalid prefix'); }
    let _fee = sc_0.loadIntBig(257);
    return { $$type: 'UpdateFee' as const, fee: _fee };
}

function loadTupleUpdateFee(source: TupleReader) {
    let _fee = source.readBigNumber();
    return { $$type: 'UpdateFee' as const, fee: _fee };
}

function loadGetterTupleUpdateFee(source: TupleReader) {
    let _fee = source.readBigNumber();
    return { $$type: 'UpdateFee' as const, fee: _fee };
}

function storeTupleUpdateFee(source: UpdateFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserUpdateFee(): DictionaryValue<UpdateFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateFee(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFee(src.loadRef().beginParse());
        }
    }
}

export type UpdateCollector = {
    $$type: 'UpdateCollector';
    collector: Address;
}

export function storeUpdateCollector(src: UpdateCollector) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(903700435, 32);
        b_0.storeAddress(src.collector);
    };
}

export function loadUpdateCollector(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 903700435) { throw Error('Invalid prefix'); }
    let _collector = sc_0.loadAddress();
    return { $$type: 'UpdateCollector' as const, collector: _collector };
}

function loadTupleUpdateCollector(source: TupleReader) {
    let _collector = source.readAddress();
    return { $$type: 'UpdateCollector' as const, collector: _collector };
}

function loadGetterTupleUpdateCollector(source: TupleReader) {
    let _collector = source.readAddress();
    return { $$type: 'UpdateCollector' as const, collector: _collector };
}

function storeTupleUpdateCollector(source: UpdateCollector) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collector);
    return builder.build();
}

function dictValueParserUpdateCollector(): DictionaryValue<UpdateCollector> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateCollector(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCollector(src.loadRef().beginParse());
        }
    }
}

export type AddToWhitelist = {
    $$type: 'AddToWhitelist';
    address: Address;
}

export function storeAddToWhitelist(src: AddToWhitelist) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2741095715, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadAddToWhitelist(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2741095715) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'AddToWhitelist' as const, address: _address };
}

function loadTupleAddToWhitelist(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'AddToWhitelist' as const, address: _address };
}

function loadGetterTupleAddToWhitelist(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'AddToWhitelist' as const, address: _address };
}

function storeTupleAddToWhitelist(source: AddToWhitelist) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserAddToWhitelist(): DictionaryValue<AddToWhitelist> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddToWhitelist(src)).endCell());
        },
        parse: (src) => {
            return loadAddToWhitelist(src.loadRef().beginParse());
        }
    }
}

export type RemoveFromWhitelist = {
    $$type: 'RemoveFromWhitelist';
    address: Address;
}

export function storeRemoveFromWhitelist(src: RemoveFromWhitelist) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(840714333, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadRemoveFromWhitelist(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 840714333) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'RemoveFromWhitelist' as const, address: _address };
}

function loadTupleRemoveFromWhitelist(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'RemoveFromWhitelist' as const, address: _address };
}

function loadGetterTupleRemoveFromWhitelist(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'RemoveFromWhitelist' as const, address: _address };
}

function storeTupleRemoveFromWhitelist(source: RemoveFromWhitelist) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserRemoveFromWhitelist(): DictionaryValue<RemoveFromWhitelist> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveFromWhitelist(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveFromWhitelist(src.loadRef().beginParse());
        }
    }
}

export type InitJetton = {
    $$type: 'InitJetton';
    collector: Address;
    receiver: Address;
    factory: Address;
    tax: bigint;
    amount: bigint;
}

export function storeInitJetton(src: InitJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3683621155, 32);
        b_0.storeAddress(src.collector);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.factory);
        let b_1 = new Builder();
        b_1.storeInt(src.tax, 257);
        b_1.storeInt(src.amount, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadInitJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3683621155) { throw Error('Invalid prefix'); }
    let _collector = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _factory = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tax = sc_1.loadIntBig(257);
    let _amount = sc_1.loadIntBig(257);
    return { $$type: 'InitJetton' as const, collector: _collector, receiver: _receiver, factory: _factory, tax: _tax, amount: _amount };
}

function loadTupleInitJetton(source: TupleReader) {
    let _collector = source.readAddress();
    let _receiver = source.readAddress();
    let _factory = source.readAddress();
    let _tax = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'InitJetton' as const, collector: _collector, receiver: _receiver, factory: _factory, tax: _tax, amount: _amount };
}

function loadGetterTupleInitJetton(source: TupleReader) {
    let _collector = source.readAddress();
    let _receiver = source.readAddress();
    let _factory = source.readAddress();
    let _tax = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'InitJetton' as const, collector: _collector, receiver: _receiver, factory: _factory, tax: _tax, amount: _amount };
}

function storeTupleInitJetton(source: InitJetton) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collector);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.factory);
    builder.writeNumber(source.tax);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserInitJetton(): DictionaryValue<InitJetton> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitJetton(src)).endCell());
        },
        parse: (src) => {
            return loadInitJetton(src.loadRef().beginParse());
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

export type DeflationaryJetton$Data = {
    $$type: 'DeflationaryJetton$Data';
    total_supply: bigint;
    owner: Address;
    collector: Address;
    factory: Address;
    content: Cell;
    mintable: boolean;
    fee: bigint;
    whitelist: Dictionary<Address, boolean>;
    _initialized: boolean;
}

export function storeDeflationaryJetton$Data(src: DeflationaryJetton$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.total_supply);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.collector);
        b_0.storeAddress(src.factory);
        b_0.storeRef(src.content);
        b_0.storeBit(src.mintable);
        let b_1 = new Builder();
        b_1.storeInt(src.fee, 257);
        b_1.storeDict(src.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_1.storeBit(src._initialized);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeflationaryJetton$Data(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _collector = sc_0.loadAddress();
    let _factory = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _mintable = sc_0.loadBit();
    let sc_1 = sc_0.loadRef().beginParse();
    let _fee = sc_1.loadIntBig(257);
    let _whitelist = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_1);
    let __initialized = sc_1.loadBit();
    return { $$type: 'DeflationaryJetton$Data' as const, total_supply: _total_supply, owner: _owner, collector: _collector, factory: _factory, content: _content, mintable: _mintable, fee: _fee, whitelist: _whitelist, _initialized: __initialized };
}

function loadTupleDeflationaryJetton$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _collector = source.readAddress();
    let _factory = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _fee = source.readBigNumber();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let __initialized = source.readBoolean();
    return { $$type: 'DeflationaryJetton$Data' as const, total_supply: _total_supply, owner: _owner, collector: _collector, factory: _factory, content: _content, mintable: _mintable, fee: _fee, whitelist: _whitelist, _initialized: __initialized };
}

function loadGetterTupleDeflationaryJetton$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _owner = source.readAddress();
    let _collector = source.readAddress();
    let _factory = source.readAddress();
    let _content = source.readCell();
    let _mintable = source.readBoolean();
    let _fee = source.readBigNumber();
    let _whitelist = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let __initialized = source.readBoolean();
    return { $$type: 'DeflationaryJetton$Data' as const, total_supply: _total_supply, owner: _owner, collector: _collector, factory: _factory, content: _content, mintable: _mintable, fee: _fee, whitelist: _whitelist, _initialized: __initialized };
}

function storeTupleDeflationaryJetton$Data(source: DeflationaryJetton$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.collector);
    builder.writeAddress(source.factory);
    builder.writeCell(source.content);
    builder.writeBoolean(source.mintable);
    builder.writeNumber(source.fee);
    builder.writeCell(source.whitelist.size > 0 ? beginCell().storeDictDirect(source.whitelist, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeBoolean(source._initialized);
    return builder.build();
}

function dictValueParserDeflationaryJetton$Data(): DictionaryValue<DeflationaryJetton$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeflationaryJetton$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDeflationaryJetton$Data(src.loadRef().beginParse());
        }
    }
}

 type DeflationaryJetton_init_args = {
    $$type: 'DeflationaryJetton_init_args';
    owner: Address;
    content: Cell;
}

function initDeflationaryJetton_init_args(src: DeflationaryJetton_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

async function DeflationaryJetton_init(owner: Address, content: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDeflationaryJetton_init_args({ $$type: 'DeflationaryJetton_init_args', owner, content })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const DeflationaryJetton_errors: { [key: number]: { message: string } } = {
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
    4159: { message: `Invalid value!!` },
    4429: { message: `Invalid sender` },
    9438: { message: `Already Initialized` },
    14534: { message: `Not owner` },
    23273: { message: `Not Authorized` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    62972: { message: `Invalid balance` },
}

const DeflationaryJetton_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonDefaultWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Info","header":755332654,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonInfo","header":null,"fields":[{"name":"mint","type":{"kind":"simple","type":"bool","optional":false}},{"name":"whitelist","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tax","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collector","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransferCallback","header":4084879879,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"whitelist","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collector","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateFee","header":2418308439,"fields":[{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateCollector","header":903700435,"fields":[{"name":"collector","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"AddToWhitelist","header":2741095715,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RemoveFromWhitelist","header":840714333,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitJetton","header":3683621155,"fields":[{"name":"collector","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"tax","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeflationaryJetton$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"collector","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"whitelist","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const DeflationaryJetton_getters: ABIGetter[] = [
    {"name":"get_info","arguments":[],"returnType":{"kind":"simple","type":"JettonInfo","optional":false}},
    {"name":"get_jetton_data","arguments":[],"returnType":{"kind":"simple","type":"JettonData","optional":false}},
    {"name":"get_wallet_address","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const DeflationaryJetton_getterMapping: { [key: string]: string } = {
    'get_info': 'getGetInfo',
    'get_jetton_data': 'getGetJettonData',
    'get_wallet_address': 'getGetWalletAddress',
    'owner': 'getOwner',
}

const DeflationaryJetton_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InitJetton"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"text","text":"MintClose"}},
    {"receiver":"internal","message":{"kind":"text","text":"Renounce"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateCollector"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddToWhitelist"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveFromWhitelist"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Info"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenBurnNotification"}},
]

export class DeflationaryJetton implements Contract {
    
    static async init(owner: Address, content: Cell) {
        return await DeflationaryJetton_init(owner, content);
    }
    
    static async fromInit(owner: Address, content: Cell) {
        const init = await DeflationaryJetton_init(owner, content);
        const address = contractAddress(0, init);
        return new DeflationaryJetton(address, init);
    }
    
    static fromAddress(address: Address) {
        return new DeflationaryJetton(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  DeflationaryJetton_types,
        getters: DeflationaryJetton_getters,
        receivers: DeflationaryJetton_receivers,
        errors: DeflationaryJetton_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InitJetton | Mint | 'MintClose' | 'Renounce' | UpdateFee | UpdateCollector | AddToWhitelist | RemoveFromWhitelist | Info | TokenUpdateContent | TokenBurnNotification) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitJetton') {
            body = beginCell().store(storeInitJetton(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message === 'MintClose') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Renounce') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFee') {
            body = beginCell().store(storeUpdateFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateCollector') {
            body = beginCell().store(storeUpdateCollector(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddToWhitelist') {
            body = beginCell().store(storeAddToWhitelist(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveFromWhitelist') {
            body = beginCell().store(storeRemoveFromWhitelist(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Info') {
            body = beginCell().store(storeInfo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenUpdateContent') {
            body = beginCell().store(storeTokenUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenBurnNotification') {
            body = beginCell().store(storeTokenBurnNotification(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_info', builder.build())).stack;
        const result = loadGetterTupleJettonInfo(source);
        return result;
    }
    
    async getGetJettonData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_jetton_data', builder.build())).stack;
        const result = loadGetterTupleJettonData(source);
        return result;
    }
    
    async getGetWalletAddress(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('get_wallet_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}