import apiRequest from '../../../helpers/connections';
import { router, TONADDRESS } from '../config';
import { Address, Dictionary, toNano, Builder, beginCell } from '@ton/core';
import { getTonClient } from '../../../hooks/useTonClient';
import { Router } from '../wrappers/Impulse-Finance_Router';
import { convertBocToHash, awaitTx } from '../pools/helper';
import { SampleJetton } from '../../../hooks/Impulse-Finance_Jetton';
import { storeTokenTransfer} from '../wrappers/Impulse-Finance_JettonDefaultWallet';

const client = getTonClient()

function getTonConnect(tonConnectUI) {
    return {
        sender: {
            send: async (args) => {

                return await tonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body.toBoc().toString("base64"),
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                });
            },
        },
        connected: tonConnectUI.connected,
    };
}
export const updateAmount = (amount, state, setState) => {
    const obj = { ...state }
    obj.amount = amount;
    setState(obj)

}
export const switchTokens = (tokenIn, tokenOut, setTokenIn, setTokenOut) => {
    const out = tokenOut;
    setTokenOut(tokenIn)
    setTokenIn(out)
}

export const getQuote = async (inAddress, outAddress, amount) => {
    try {
        const res = await apiRequest("swap/quote", { in: inAddress, out: outAddress, amount }, "POST", undefined)
        return res.quote
    } catch (error) {
        console.log();
    }
}

function buildTonSwapPayload(swapData) {

    const { tokenRoot, amountIn, amountOutMin, path, length, to, deadline, ref } = swapData;

    const pathDictionary = Dictionary.empty(Dictionary.Keys.BigInt(32), Dictionary.Values.Address());
    for (let i = 0; i < length; i++) {
        pathDictionary.set(BigInt(i), Address.parse(path[i])); // Store each path entry
    }

    let b_0 = new Builder();
    b_0.storeAddress(tokenRoot);
    b_0.storeInt(amountIn, 257);
    b_0.storeInt(amountOutMin, 257);
    b_0.storeDict(pathDictionary, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
    let b_1 = new Builder();
    b_1.storeInt(length, 257);
    b_1.storeAddress(to);
    b_1.storeInt(deadline, 257);
    let b_2 = new Builder();
    b_2.storeAddress(ref);
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());

    return b_0.asSlice()

}

export const swapTon = async (tonConnectUI, tokenIn, swapInfo, receiver) => {
    const { sender } = getTonConnect(tonConnectUI);

    const routerAddress = new Router(
        Address.parse(router)
    );

    const routerContract = client.open(routerAddress)
    const _amount = String(tokenIn.amount * (10 ** tokenIn.decimals))
    const num = _amount.includes(".") ? Number(_amount.split(".")[0]) : Number(_amount)

    
    const struct = {
        tokenRoot: Address.parse(tokenIn.address),
        amountIn: num,
        amountOutMin: 0,
        path: swapInfo.map((item) => item.pair),
        length: swapInfo.length,
        to: Address.parse(receiver),
        deadline: 1830294994,
        ref: Address.parse(TONADDRESS)
    }


    const payload = buildTonSwapPayload(struct);
    
    
    const message = {
        $$type: 'TonSwap',
        forward_payload: payload,
    }

    const result = await routerContract?.send(sender, { value: toNano((0.05 * swapInfo.length) + 0.25 + tokenIn.amount) }, message);
    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

export const swapToken = async (tonConnectUI, tokenIn, swapInfo, receiver) => {

    const _amount = String(tokenIn.amount * (10 ** tokenIn.decimals))
    const num = _amount.includes(".") ? _amount.split(".")[0] : _amount

    const struct = {
        tokenRoot: Address.parse(tokenIn.address),
        amountIn: num,
        amountOutMin: 0,
        path: swapInfo.map((item) => item.pair),
        length: swapInfo.length,
        to: Address.parse(receiver),
        deadline: 1890294994,
        ref: Address.parse(TONADDRESS)
    }

    const payload = buildTonSwapPayload(struct)
    
    const message = {
        $$type: 'TokenTransfer',
        query_id: 0,
        amount: num,
        destination: Address.parse(router),
        response_destination: Address.parse(router),
        custom_payload: null,
        forward_ton_amount: toNano((0.05 * swapInfo.length) + 0.15).toString(),
        forward_payload: beginCell().storeSlice(payload).endCell()
    }
    const body = beginCell().store(storeTokenTransfer(message)).endCell()
    
    const rootContract = new SampleJetton(
        Address.parse(tokenIn.address)
    );

    const root = client.open(rootContract)

    const walletAddress = await root.getGetWalletAddress(Address.parse(receiver))

    const result = await tonConnectUI.sendTransaction({
        messages: [
            {
                address: walletAddress.toString(),
                amount: toNano((0.05 * swapInfo.length) + 0.35).toString(),
                payload: body.toBoc().toString("base64"),
            }
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    });

    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

