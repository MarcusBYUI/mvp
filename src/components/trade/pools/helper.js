import BigNumber from 'bignumber.js';
import apiRequest from '../../../helpers/connections';
import { Address, beginCell, Cell, toNano } from '@ton/core';
import { factory, TONADDRESS } from '../config';
import { SampleJetton } from '../../../hooks/Impulse-Finance_Jetton';
import { getTonClient } from '../../../hooks/useTonClient';
import { Pair } from '../wrappers/Impulse-Finance_Pair';
import { storeTokenTransfer } from '../../../hooks/Impulse-Finance_JettonDefaultWallet';

import { PairChild } from '../wrappers/Impulse-Finance_PairChild';
import { burnJetton } from '../../../hooks/useJettonContract';


const client = getTonClient()
export const convertBocToHash = async (bocBase64) => {
    // Deserialize the BoC into a Cell
    const cell = Cell.fromBase64(bocBase64);

    // Compute the hash of the cell
    const cellHash = cell.hash();

    // Convert the hash to a hexadecimal string
    const hashHex = cellHash.toString('hex');

    return hashHex;

};

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
const sendLoad = async (tonConnectUI, address, body, amount) => {

    return await tonConnectUI.sendTransaction({
        messages: [
            {
                address: address,
                amount: toNano(amount).toString(),
                payload: body,
            },
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    });
}
export const tokenList = async (address) => {
    try {
        const res = address.length > 0 ? await apiRequest("swap/tokenlist", { address }, "POST", undefined) : await apiRequest("swap/tokenlist", undefined, "POST", undefined)
        return res.data
    } catch (error) {
        console.log();
    }
}

export const searchToken = async (token, owner) => {
    try {
        const res = owner.length > 0 ? await apiRequest("swap/searchtoken", { token, owner }, "POST", undefined) : await apiRequest("swap/searchtoken", { token }, "POST", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}

export const getPairInfo = async (tokenA, tokenB, address) => {
    try {
        const res = address.length > 0 ? await apiRequest("swap/pairinfo", { tokenA, tokenB, address }, "POST", undefined) : await apiRequest("swap/pairinfo", { tokenA, tokenB }, "POST", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}
export const getPairList = async () => {
    try {
        const res = await apiRequest("swap/pairlist", undefined, "GET", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}

export const getPairById = async (address) => {
    try {
        const res = await apiRequest("swap/pairbyid", { address }, "POST", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}

export const awaitTx = async (harsh) => {
    try {
        const res = await apiRequest("swap/confirm", { harsh }, "POST", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}

export const handleCreatePair = async (tonConnectUI, body) => {
    try {
        const result = await sendLoad(tonConnectUI, factory, body, "0.2")
        const harsh = await convertBocToHash(result.boc)
        return await awaitTx(harsh)

    } catch (error) {
        throw Error(error)
    }
}

export const handleJoinPair = async (tonConnectUI, pairInfo) => {
    try {
        const result = await sendLoad(tonConnectUI, pairInfo.address, pairInfo.creator, "0.11")
        const harsh = await convertBocToHash(result.boc)
        return await awaitTx(harsh)
    } catch (error) {
        throw Error(error)
    }
}

export const handleDepositTokens = async (tonConnectUI, tokenIn, tokenOut, pairInfo, address) => {
    let token1 = {
        receiver: pairInfo.childAddress,
        amount: toNano(tokenIn.amount).toString(),
        body: beginCell().storeUint(0, 32).storeStringTail("DepositTon").endCell().toBoc().toString("base64")
    }

    let token2 = {
        receiver: pairInfo.childAddress,
        amount: toNano(tokenOut.amount).toString(),
        body: beginCell().storeUint(0, 32).storeStringTail("DepositTon").endCell().toBoc().toString("base64")
    }

    if (tokenIn.address != TONADDRESS) {
        const rootContract = new SampleJetton(
            Address.parse(tokenIn.address)
        );

        const root = client.open(rootContract)

        const walletAddress = await root.getGetWalletAddress(Address.parse(address))

        const message = {
            $$type: 'TokenTransfer',
            query_id: 0,
            amount: Number((new BigNumber(tokenIn.amount).shift(Number(tokenIn.decimals))).toFixed()),
            destination: Address.parse(pairInfo.childAddress),
            response_destination: Address.parse(pairInfo.childAddress),
            custom_payload: null,
            forward_ton_amount: toNano("0.01").toString(),
            forward_payload: beginCell().storeCoins(0).endCell()
        }
        const body = beginCell().store(storeTokenTransfer(message)).endCell()
        token1 = {
            receiver: walletAddress.toString(),
            amount: toNano("0.15").toString(),
            body: body.toBoc().toString("base64")
        }
    }

    if (tokenOut.address != TONADDRESS) {

        const rootContract = new SampleJetton(
            Address.parse(tokenOut.address)
        );

        const root = client.open(rootContract)

        const walletAddress = await root.getGetWalletAddress(Address.parse(address))

        const message = {
            $$type: 'TokenTransfer',
            query_id: 0,
            amount: Number((new BigNumber(tokenOut.amount).shift(Number(tokenOut.decimals))).toFixed()),
            destination: Address.parse(pairInfo.childAddress),
            response_destination: Address.parse(pairInfo.childAddress),
            custom_payload: null,
            forward_ton_amount: toNano("0.01").toString(),
            forward_payload: beginCell().storeCoins(0).endCell()
        }
        const body = beginCell().store(storeTokenTransfer(message)).endCell()
        token2 = {
            receiver: walletAddress.toString(),
            amount: toNano("0.15").toString(),
            body: body.toBoc().toString("base64")
        }
    }

    const result = await tonConnectUI.sendTransaction({
        messages: [
            {
                address: token1.receiver,
                amount: token1.amount,
                payload: token1.body,
            },
            {
                address: token2.receiver,
                amount: token2.amount,
                payload: token2.body,
            }
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    });
    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

export const handleAddLp = async (tonConnectUI, pairInfo) => {

    const result = await tonConnectUI.sendTransaction({
        messages: [
            {
                address: pairInfo.address,
                amount: toNano(0.35).toString(),
                payload: beginCell().storeUint(0, 32).storeStringTail("InitAddLiquidity").endCell().toBoc().toString("base64")
            }
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    });

    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

export const getLpBalance = async (pair, address) => {
    try {
        const res = await apiRequest("swap/lpbalance", { pair, address }, "POST", undefined)
        return res.data
    } catch (error) {
        throw Error(error)
    }
}

export const getGetPairchild = async (pair, address) => {

    const pairChildAddress = new Pair(
        Address.parse(pair)
    );

    const _instance = client.open(pairChildAddress)


    const _info = await _instance.getGetPairchild(Address.parse(address))

    return _info
}

export const checkPairInfo = async (address) => {
    const rootContract = new Pair(
        Address.parse(address)
    );

    const root = client.open(rootContract)

    const res = await root.getParentinfo()

    console.log(res);


}

export const checkPairChildInfo = async (address) => {
    const rootContract = new PairChild(
        Address.parse(address.toString())
    );

    try {
        const root = client.open(rootContract)
        const res = await root.getChildinfo()

        return { amount0: Number(res.amount0), amount1: Number(res.amount1) }
    } catch (error) {
        return { amount0: 0, amount1: 0 }
    }

}

export const RemoveStuckLp = async (tonConnectUI, pairChild) => {
    const result = await tonConnectUI.sendTransaction({
        messages: [
            {
                address: pairChild,
                amount: toNano(0.22).toString(),
                payload: beginCell().storeUint(0, 32).storeStringTail("RemoveTokens").endCell().toBoc().toString("base64")
            }
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    });

    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

export const calcLpOut = (share, data) => {
    if (share == 0) {
        return {
            amount0: 0,
            amount1: 0
        }
    }    


    let token0InWallet = Number(data.reserveA);
    let token1InWallet = Number(data.reserveB);

    let shares = share;

    if (shares > data.totalSupply) {
        shares = data.totalSupply;
    }

    //calculate amount
    let amount0 = (shares * token0InWallet) / data.totalSupply;
    let amount1 = (shares * token1InWallet) / data.totalSupply;

    if (amount0 > 0 && amount1 > 0) {
        return {
            amount0: amount0,
            amount1: amount1
        };
    } else {
        return {
            amount0: 0,
            amount1: 0
        };
    }
}

export const RemoveLp = async (tonConnectUI, pairAddress, address, value, balance) => {
    if (balance <= 0 || value == 0) return;
    const _amount = String((value / 100) * balance)
    const num = _amount.includes(".") ? Number(_amount.split(".")[0]) : Number(_amount)
    await burnJetton(tonConnectUI, pairAddress, address, num)
}

export const RemoveStuckAdmin = async (tonConnectUI, pairChild) => {
    
    const { sender } = getTonConnect(tonConnectUI);
    
    const pairChildAddress = new PairChild(
        Address.parse(pairChild)
    );

    const childContract = client.open(pairChildAddress)
    
    const message = {
        $$type: 'RemoveTokensAdmin',
        amount0: 0,
        amount1: 1
    }

    return await childContract?.send(sender, { value: toNano((0.15)) }, message);

}

