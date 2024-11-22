import { Address, beginCell, toNano } from '@ton/core';
import { SampleJetton } from './Impulse-Finance_Jetton';
import { JettonDefaultWallet } from './Impulse-Finance_JettonDefaultWallet';
import { getTonClient } from './useTonClient';
import { awaitTx, convertBocToHash } from '../components/trade/pools/helper';

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


const client = getTonClient()

//get wallet

//send jetton

export const sendJetton = async (tonConnectUI, tokenRoot, address, amount, receiver) => {
    const { sender } = getTonConnect(tonConnectUI);

    const rootContract = new SampleJetton(
        Address.parse(tokenRoot)
    );

    const root = client.open(rootContract)

    const walletAddress = await root.getGetWalletAddress(Address.parse(address))

    const walletContract = new JettonDefaultWallet(walletAddress);

    const wallet = client.open(walletContract)

    const message = {
        $$type: 'TokenTransfer',
        query_id: 0,
        amount: amount,
        destination: Address.parse(receiver),
        response_destination: Address.parse(address),
        custom_payload: null,
        forward_ton_amount: "10000000",
        forward_payload: beginCell().storeCoins(0).endCell()
    }

    return await wallet?.send(sender, { value: toNano("0.8") }, message);

}

export const burnJetton = async (tonConnectUI, tokenRoot, address, amount) => {
    const { sender } = getTonConnect(tonConnectUI);

    const rootContract = new SampleJetton(
        Address.parse(tokenRoot)
    );

    const root = client.open(rootContract)

    const walletAddress = await root.getGetWalletAddress(Address.parse(address))

    const walletContract = new JettonDefaultWallet(walletAddress);

    const wallet = client.open(walletContract)

    const message = {
        $$type: 'TokenBurn',
        query_id: 0,
        amount: amount,
        response_destination: Address.parse(address),
        custom_payload: null,
    }

    const result = await wallet?.send(sender, { value: toNano("0.2") }, message);
    const harsh = await convertBocToHash(result.boc)
    return await awaitTx(harsh)

}

export const getJettonWallet = async (tokenRoot, address) => {

    const rootContract = new SampleJetton(
        Address.parse(tokenRoot)
    );

    const root = client.open(rootContract)

    const walletAddress = await root.getGetWalletAddress(Address.parse(address))

    return walletAddress.toString();

}
