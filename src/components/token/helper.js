import { Address, beginCell, contractAddress, Dictionary, storeStateInit, toNano } from "@ton/core";
import apiRequest from "../../helpers/connections";
import { storeTokenTransfer } from '../../hooks/Impulse-Finance_JettonDefaultWallet';
import { DeflationaryJetton, storeInitJetton, storeTokenBurn } from "./wrappers/DeflationaryJetton_DeflationaryJetton";
import { getTonClient } from "../../hooks/useTonClient";
import { awaitTx, convertBocToHash } from "../trade/pools/helper";
import { Sha256 } from "@aws-crypto/sha256-js";
import { Buffer } from 'buffer';
import { notificationActions } from "../../store/notification/notification";
import { factory } from "../trade/config";


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


export const getToken = async (address) => {
    try {
        const res = await apiRequest("token", { address }, "POST", undefined)
        return res.data
    } catch (error) {
        console.log();
    }
}

//transfer
export const transferToken = async (tonConnectUI, receiver, sender, contract, amount, dispatch) => {

    dispatch(notificationActions.setNotify(true))

    try {
        const message = {
            $$type: 'TokenTransfer',
            query_id: 0,
            amount: amount,
            destination: Address.parse(receiver),
            response_destination: Address.parse(sender),
            custom_payload: null,
            forward_ton_amount: 1,
            forward_payload: beginCell().storeCoins(0).endCell()
        }
        const body = beginCell().store(storeTokenTransfer(message)).endCell()

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const walletAddress = await root.getGetWalletAddress(Address.parse(sender))

        const result = await tonConnectUI.sendTransaction({
            messages: [
                {
                    address: walletAddress.toString(),
                    amount: toNano(0.12).toString(),
                    payload: body.toBoc().toString("base64"),
                }
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });

        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Token Sent"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//mint
export const mintToken = async (tonConnectUI, contract, receiver, amount, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const message = {
            $$type: 'Mint',
            amount: amount,
            receiver: Address.parse(receiver)
        }

        const result = await root?.send(sender, { value: toNano(0.11) }, message);
        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Token Minted"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//burn
export const burnToken = async (tonConnectUI, contract, sender, amount, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const message = {
            $$type: 'TokenBurn',
            queryId: 0,
            amount: amount,
            owner: Address.parse(sender),
            response_destination: Address.parse(sender)
        }

        const body = beginCell().store(storeTokenBurn(message)).endCell()

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const walletAddress = await root.getGetWalletAddress(Address.parse(sender))

        const result = await tonConnectUI.sendTransaction({
            messages: [
                {
                    address: walletAddress.toString(),
                    amount: toNano(0.1).toString(),
                    payload: body.toBoc().toString("base64"),
                }
            ],
            validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });

        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Token Burnt"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//update tax
export const updateTax = async (tonConnectUI, contract, tax, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const message = {
            $$type: 'UpdateFee',
            fee: tax
        }

        const result = await root?.send(sender, { value: toNano(0.01) }, message);
        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Tax Updated"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//collector address
export const updateCollector = async (tonConnectUI, contract, collector, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const message = {
            $$type: 'UpdateCollector',
            collector: Address.parse(collector)
        }

        const result = await root?.send(sender, { value: toNano(0.01) }, message);
        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Collector Updated"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//whitelist
export const manageWhitelist = async (tonConnectUI, contract, add, address, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        let message = {
            $$type: 'AddToWhitelist',
            address: Address.parse(address)
        }

        if (!add) {
            message = {
                $$type: 'RemoveFromWhitelist',
                address: Address.parse(address)
            }
        }

        const result = await root?.send(sender, { value: toNano(0.015) }, message);
        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Address Added"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//get info
export const getContractInfo = async (contract) => {

    const rootContract = new DeflationaryJetton(
        Address.parse(contract)
    );

    const root = client.open(rootContract)

    return await root.getGetInfo();

}

//update info
export const updateInfo = async (tonConnectUI, form, contract, dispatch) => {

    dispatch(notificationActions.setNotify(true))

    try {
        delete form.decimals;
        let content = buildOnchainMetadata(form);

        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const message = {
            $$type: 'TokenUpdateContent',
            content: content
        }

        const result = await root?.send(sender, { value: toNano(0.015) }, message);
        const harsh = await convertBocToHash(result.boc)
        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Info Updated"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }
}


//turnoff mint
export const turnOffMint = async (tonConnectUI, contract, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const result = await root?.send(sender, { value: toNano(0.01) }, "MintClose");
        const harsh = await convertBocToHash(result.boc)

        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Mint Turned Off"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//renouce
export const renouce = async (tonConnectUI, contract, dispatch) => {
    dispatch(notificationActions.setNotify(true))

    try {
        const { sender } = getTonConnect(tonConnectUI);

        const rootContract = new DeflationaryJetton(
            Address.parse(contract)
        );

        const root = client.open(rootContract)

        const result = await root?.send(sender, { value: toNano(0.01) }, "Renounce");
        const harsh = await convertBocToHash(result.boc)

        await awaitTx(harsh)
        dispatch(notificationActions.setMessage("Token Renounced"))

        return
    } catch (error) {
        dispatch(notificationActions.setNotify(false))
    }

}

//createtoken
const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

function makeSnakeCell(data) {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

function bufferToChunks(buff, chunkSize) {
    let chunks = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}
const sha256 = (str) => {
    const sha = new Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};

const toKey = (key) => {
    return BigInt(`0x${sha256(key).toString("hex")}`);
};

function buildOnchainMetadata(data) {
    let dict = Dictionary.empty(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());

    // Store the on-chain metadata in the dictionary
    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });

    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell();
}

export const createToken = async (tonConnectUI, form, address) => {
    const jettonParams = {
        name: form.get("name"),
        description: form.get("description"),
        symbol: form.get("symbol"),
        image: form.get("image"),
        decimals: form.get("decimals"),
    };



    let content = buildOnchainMetadata(jettonParams,);
    let init = await DeflationaryJetton.init(Address.parse(address), content);

    let packed_msg = beginCell()
        .store(
            storeInitJetton({
                $$type: 'InitJetton',
                collector: Address.parse(form.get("collector")),
                receiver: Address.parse(address),
                factory: Address.parse(factory),
                tax: form.get("tax"),
                amount: form.get("supply") * (10 ** form.get("decimals"))
            })
        )
        .endCell();

    const stateInit = beginCell()
        .store(storeStateInit(init))
        .endCell();

    const newAddress = contractAddress(0, init);

    const result = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        messages: [
            {
                address: newAddress.toRawString(),
                amount: '160000000',
                stateInit: stateInit.toBoc().toString('base64'),
                payload: packed_msg.toBoc().toString("base64")
            }
        ]
    });

    const harsh = await convertBocToHash(result.boc)
    await awaitTx(harsh)
    return newAddress.toRawString()

}