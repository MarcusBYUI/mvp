import { Address, toNano } from '@ton/core';
import { Factory } from './Impulse-Finance_Factory';
import { saleFactory } from '../helpers/config';
import { getTonClient } from './useTonClient';

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

export const getTon = async (tonConnectUI) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Factory(
        Address.parse(saleFactory)
    );

    const factory = client.open(contract)

    return await factory?.send(sender, { value: "0.1" }, "EmergencyRetrieve");
}

//get contract data
const getFactoryData = async () => {

    const contract = new Factory(
        Address.parse(saleFactory)
    );

    const factory = client.open(contract)

    const data = await factory.getFactoryInfo()

    console.log(data);

}

//getFactoryData()

//update factory fee
export const updateFactoryFee = async (tonConnectUI) => {
    try {
        const { sender } = getTonConnect(tonConnectUI);

        const contract = new Factory(
            Address.parse(saleFactory)
        );

        const message = {
            $$type: 'SetSaleFee',
            fee: toNano(0.15)
        }

        const factory = client.open(contract)

        return await factory?.send(sender, { value: "0.05" }, message);

    } catch (error) {
        console.log(error);
    }
}