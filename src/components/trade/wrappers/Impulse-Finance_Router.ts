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

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
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

export type JettonContent = {
    $$type: 'JettonContent';
    name: string;
    description: string;
    symbol: string;
    image: string;
}

export function storeJettonContent(src: JettonContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.description);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.symbol);
        b_1.storeStringRefTail(src.image);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJettonContent(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _description = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _symbol = sc_1.loadStringRefTail();
    let _image = sc_1.loadStringRefTail();
    return { $$type: 'JettonContent' as const, name: _name, description: _description, symbol: _symbol, image: _image };
}

function loadTupleJettonContent(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _symbol = source.readString();
    let _image = source.readString();
    return { $$type: 'JettonContent' as const, name: _name, description: _description, symbol: _symbol, image: _image };
}

function loadGetterTupleJettonContent(source: TupleReader) {
    let _name = source.readString();
    let _description = source.readString();
    let _symbol = source.readString();
    let _image = source.readString();
    return { $$type: 'JettonContent' as const, name: _name, description: _description, symbol: _symbol, image: _image };
}

function storeTupleJettonContent(source: JettonContent) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeString(source.description);
    builder.writeString(source.symbol);
    builder.writeString(source.image);
    return builder.build();
}

function dictValueParserJettonContent(): DictionaryValue<JettonContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonContent(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
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
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
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
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
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

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
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
        b_0.storeUint(src.query_id, 64);
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
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
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

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
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
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
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
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
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
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
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

export type CreatePair = {
    $$type: 'CreatePair';
    token0: Address;
    token1: Address;
    startTime: bigint;
    content: Cell;
    router: Address;
    token0Wallet: Address;
    token1Wallet: Address;
}

export function storeCreatePair(src: CreatePair) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1189874577, 32);
        b_0.storeAddress(src.token0);
        b_0.storeAddress(src.token1);
        b_0.storeInt(src.startTime, 257);
        b_0.storeRef(src.content);
        let b_1 = new Builder();
        b_1.storeAddress(src.router);
        b_1.storeAddress(src.token0Wallet);
        b_1.storeAddress(src.token1Wallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreatePair(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1189874577) { throw Error('Invalid prefix'); }
    let _token0 = sc_0.loadAddress();
    let _token1 = sc_0.loadAddress();
    let _startTime = sc_0.loadIntBig(257);
    let _content = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _router = sc_1.loadAddress();
    let _token0Wallet = sc_1.loadAddress();
    let _token1Wallet = sc_1.loadAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, content: _content, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadTupleCreatePair(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _content = source.readCell();
    let _router = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, content: _content, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function loadGetterTupleCreatePair(source: TupleReader) {
    let _token0 = source.readAddress();
    let _token1 = source.readAddress();
    let _startTime = source.readBigNumber();
    let _content = source.readCell();
    let _router = source.readAddress();
    let _token0Wallet = source.readAddress();
    let _token1Wallet = source.readAddress();
    return { $$type: 'CreatePair' as const, token0: _token0, token1: _token1, startTime: _startTime, content: _content, router: _router, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet };
}

function storeTupleCreatePair(source: CreatePair) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.token0);
    builder.writeAddress(source.token1);
    builder.writeNumber(source.startTime);
    builder.writeCell(source.content);
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

export type RemoveTon = {
    $$type: 'RemoveTon';
    amount: bigint;
}

export function storeRemoveTon(src: RemoveTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1816688716, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadRemoveTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1816688716) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'RemoveTon' as const, amount: _amount };
}

function loadTupleRemoveTon(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'RemoveTon' as const, amount: _amount };
}

function loadGetterTupleRemoveTon(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'RemoveTon' as const, amount: _amount };
}

function storeTupleRemoveTon(source: RemoveTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRemoveTon(): DictionaryValue<RemoveTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveTon(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveTon(src.loadRef().beginParse());
        }
    }
}

export type RemoveToken = {
    $$type: 'RemoveToken';
    amount: bigint;
    wallet: Address;
}

export function storeRemoveToken(src: RemoveToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(305482744, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.wallet);
    };
}

export function loadRemoveToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 305482744) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    let _wallet = sc_0.loadAddress();
    return { $$type: 'RemoveToken' as const, amount: _amount, wallet: _wallet };
}

function loadTupleRemoveToken(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _wallet = source.readAddress();
    return { $$type: 'RemoveToken' as const, amount: _amount, wallet: _wallet };
}

function loadGetterTupleRemoveToken(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _wallet = source.readAddress();
    return { $$type: 'RemoveToken' as const, amount: _amount, wallet: _wallet };
}

function storeTupleRemoveToken(source: RemoveToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.wallet);
    return builder.build();
}

function dictValueParserRemoveToken(): DictionaryValue<RemoveToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveToken(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveToken(src.loadRef().beginParse());
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

export type RemoveTokens = {
    $$type: 'RemoveTokens';
    wallet: Address;
    amount: bigint;
}

export function storeRemoveTokens(src: RemoveTokens) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2447664976, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadRemoveTokens(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2447664976) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'RemoveTokens' as const, wallet: _wallet, amount: _amount };
}

function loadTupleRemoveTokens(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'RemoveTokens' as const, wallet: _wallet, amount: _amount };
}

function loadGetterTupleRemoveTokens(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'RemoveTokens' as const, wallet: _wallet, amount: _amount };
}

function storeTupleRemoveTokens(source: RemoveTokens) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRemoveTokens(): DictionaryValue<RemoveTokens> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveTokens(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveTokens(src.loadRef().beginParse());
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
    content: Cell;
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
        b_0.storeRef(src.content);
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
    let _content = sc_0.loadRef();
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
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function loadTuplePair$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _content = source.readCell();
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
    source = source.readTuple();
    let _routerWallet = source.readAddress();
    let _fee = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let __initialized = source.readBoolean();
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function loadGetterTuplePair$Data(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _content = source.readCell();
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
    return { $$type: 'Pair$Data' as const, total_supply: _total_supply, content: _content, manager: _manager, router: _router, mintable: _mintable, owner: _owner, jettonFee: _jettonFee, factory: _factory, reserve0: _reserve0, reserve1: _reserve1, token0: _token0, token1: _token1, token0Wallet: _token0Wallet, token1Wallet: _token1Wallet, routerWallet: _routerWallet, fee: _fee, startTime: _startTime, _initialized: __initialized };
}

function storeTuplePair$Data(source: Pair$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeCell(source.content);
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

export type JettonDefaultWallet$Data = {
    $$type: 'JettonDefaultWallet$Data';
    balance: bigint;
    owner: Address;
    master: Address;
}

export function storeJettonDefaultWallet$Data(src: JettonDefaultWallet$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.balance);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

export function loadJettonDefaultWallet$Data(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadCoins();
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

 type Router_init_args = {
    $$type: 'Router_init_args';
    manager: Address;
    factory: Address;
}

function initRouter_init_args(src: Router_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.factory);
    };
}

async function Router_init(manager: Address, factory: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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iM8WyFAMINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGoEBAc8AGIEBAc8AyFAHKQH+INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEioAnPQAEoEBAc8AE4EBAc8AA8iBAQHPABWBAQHPAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFcoAFcoAyVADzMkBzMkBzMkBzAE2bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj4QLeMwIgbvLQgBESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAds8ERERExERERAREhEQDxERDw4REA4Q31UcLTABevhBbyQQI18DERIRExESERERExERERARExEQDxETDw4REw4NERMNDBETDAsREwsKERMKCRETCRETCAcGVUAuAe74Q/goEgLQ9AQwbQGCANivAYAQ9A9vofLghwGCANivIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBgRFNAi8AsnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAREUAccFARETAfL0ERAREREQDxEQD1UOAVJUe6FWFryUM1YUA95TMahWFqkEU0GoVhepBCHCAJMgwgCRcOKSXwbjDTED/j4+AREVAQOhggD1/CHC//L0ERQsoVEroX9/jQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiS3HBbOVMTIqcAPeiSzHBbOVMDFwURrecHCAQCmrqzICUlF4B1YTB1YTBwYRFwYQNRQDERYDUAzIVaDbPMlWEgQQPk3uECQQ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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initRouter_init_args({ $$type: 'Router_init_args', manager, factory })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Router_errors: { [key: number]: { message: string } } = {
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
    31791: { message: `Swap expired` },
    42708: { message: `Invalid sender!` },
    43422: { message: `Invalid value - Burn` },
    49469: { message: `Access denied` },
    61985: { message: `Not From Child` },
    62972: { message: `Invalid balance` },
}

const Router_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonContent","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"symbol","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"RemoveLiquidity","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreatePair","header":1189874577,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PairInit","header":3074801746,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventPairCreated","header":269207027,"fields":[{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"pairAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveTon","header":1816688716,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RemoveToken","header":305482744,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}]},
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
    {"name":"RemoveTokens","header":2447664976,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Mint","header":4235234258,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Pair$Data","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"reserve1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"routerWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"startTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PairChild$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"pair","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"token0","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1","type":{"kind":"simple","type":"address","optional":false}},{"name":"token0Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"token1Wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount0","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"amount1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"_initialized","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"JettonDefaultWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Router$Data","header":null,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refBonus","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"jettonFee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"RouterChild$Data","header":null,"fields":[{"name":"ref","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBack","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cashBackClaimed","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"router","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Router_getters: ABIGetter[] = [
]

export const Router_getterMapping: { [key: string]: string } = {
}

const Router_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TonSwap"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SwapCallBack"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveLpCallBack"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddLpCallBack"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateCashback"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRefBonus"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatejettonFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveTon"}},
]

export class Router implements Contract {
    
    static async init(manager: Address, factory: Address) {
        return await Router_init(manager, factory);
    }
    
    static async fromInit(manager: Address, factory: Address) {
        const init = await Router_init(manager, factory);
        const address = contractAddress(0, init);
        return new Router(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Router(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Router_types,
        getters: Router_getters,
        receivers: Router_receivers,
        errors: Router_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenNotification | TonSwap | SwapCallBack | RemoveLpCallBack | AddLpCallBack | UpdateCashback | UpdateRefBonus | UpdatejettonFee | RemoveToken | RemoveTon) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TonSwap') {
            body = beginCell().store(storeTonSwap(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SwapCallBack') {
            body = beginCell().store(storeSwapCallBack(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveLpCallBack') {
            body = beginCell().store(storeRemoveLpCallBack(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddLpCallBack') {
            body = beginCell().store(storeAddLpCallBack(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateCashback') {
            body = beginCell().store(storeUpdateCashback(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRefBonus') {
            body = beginCell().store(storeUpdateRefBonus(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatejettonFee') {
            body = beginCell().store(storeUpdatejettonFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveToken') {
            body = beginCell().store(storeRemoveToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveTon') {
            body = beginCell().store(storeRemoveTon(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}