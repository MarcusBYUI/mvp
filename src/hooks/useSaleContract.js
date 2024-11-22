import { Address, toNano } from '@ton/core';
import { Factory } from './Impulse-Finance_Factory';
import { Sale } from './Impulse-Finance_Sale';
import { SaleChild } from './Impulse-Finance_SaleChild';
import { getTonClient } from './useTonClient';
import { Claimer } from './Impulse-Finance_Claimer';
// import { useTonConnect } from './useTonConnect';
// import { notificationActions } from '../store/notification/notification';
// import apiRequest from '../helpers/connections';
// import { useTonAddress } from '@tonconnect/ui-react';
// import { useDispatch } from 'react-redux';
import { Private } from './Impulse-Finance_Private';

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

export const addWhitelist = async (tonConnectUI, saleAddress, list) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Private(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'AddList',
        one: Address.parse(list[0]),
        two: Address.parse(list[1]),
        three: Address.parse(list[2]),
        four: Address.parse(list[3]),
        five: Address.parse(list[4]),
        six: Address.parse(list[5]),
        seven: Address.parse(list[6]),
        eight: Address.parse(list[7]),
        nine: Address.parse(list[8]),
        ten: Address.parse(list[9]),
        eleven: Address.parse(list[10]),
        twelve: Address.parse(list[11]),
        thirteen: Address.parse(list[12]),
        forteen: Address.parse(list[13]),
        fifteen: Address.parse(list[14]),
        sixteen: Address.parse(list[15]),
        seventeen: Address.parse(list[16]),
        eighteen: Address.parse(list[17]),
        nineteen: Address.parse(list[18]),
        twenty: Address.parse(list[19]),
        twentyone: Address.parse(list[20]),
        twentytwo: Address.parse(list[21]),
        twentythree: Address.parse(list[22]),
        twentyfour: Address.parse(list[23]),
        twentyfive: Address.parse(list[24]),
        twentysix: Address.parse(list[25]),
        twentyseven: Address.parse(list[26]),
        twentyeight: Address.parse(list[27]),
        twentynine: Address.parse(list[28]),
        thirty: Address.parse(list[29])
    }

    await sale.send(sender, { value: toNano(0.15) }, message);
}

export const removeWhitelist = async (tonConnectUI, saleAddress, list) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Private(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'RemoveList',
        one: Address.parse(list[0]),
        two: Address.parse(list[1]),
        three: Address.parse(list[2]),
        four: Address.parse(list[3]),
        five: Address.parse(list[4]),
        six: Address.parse(list[5]),
        seven: Address.parse(list[6]),
        eight: Address.parse(list[7]),
        nine: Address.parse(list[8]),
        ten: Address.parse(list[9]),
        eleven: Address.parse(list[10]),
        twelve: Address.parse(list[11]),
        thirteen: Address.parse(list[12]),
        forteen: Address.parse(list[13]),
        fifteen: Address.parse(list[14]),
        sixteen: Address.parse(list[15]),
        seventeen: Address.parse(list[16]),
        eighteen: Address.parse(list[17]),
        nineteen: Address.parse(list[18]),
        twenty: Address.parse(list[19]),
        twentyone: Address.parse(list[20]),
        twentytwo: Address.parse(list[21]),
        twentythree: Address.parse(list[22]),
        twentyfour: Address.parse(list[23]),
        twentyfive: Address.parse(list[24]),
        twentysix: Address.parse(list[25]),
        twentyseven: Address.parse(list[26]),
        twentyeight: Address.parse(list[27]),
        twentynine: Address.parse(list[28]),
        thirty: Address.parse(list[29])
    }

    await sale.send(sender, { value: toNano(0.15) }, message);
}

export const getTon = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    return await sale?.send(sender, { value: "0.1" }, "EmergencyRetrieveCommitments");
}

export const getCommitedTon = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    return await sale?.send(sender, { value: "0.1" }, "RetrieveCommitments");
}

export const _buyToken = async (sender, saleAddress, param, amount) => {

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'MakeCommitment',
        referrer: Address.parse(param),
    }

    await sale.send(sender, { value: toNano(Number(amount) + 0.15) }, message);
}

export const saleControl = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);
    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'Control',
        refund: true,
        softcap: 1000000000000
    }

    await sale.send(sender, { value: toNano(0.05) }, message);
}

export const addWallet = async (tonConnectUI) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Claimer(
        Address.parse("")
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'TokenUpdate',
        wallet: Address.parse("EQD6JPO6ltFf-Ix1D-mZefEWVFCIljbry8w78DFtuJV1VDx5"),
    }

    await sale.send(sender, { value: toNano(0.1) }, message);
}
// const buyTokenTX = async (sender, saleAddress, param, amount) => {

//     const contract = new Sale(
//         Address.parse(saleAddress)
//     );

//     const sale = client.open(contract)

//     const message = {
//         $$type: 'MakeCommitment',
//         referrer: Address.parse(param),
//     }

//     await sale.send(sender, { value: toNano(Number(amount) + 0.15) }, message);
// }

export const _claimToken = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    await sale.send(sender, { value: toNano(0.15) }, "InitClaimDistributedToken");
}

export const _claimMINIToken = async (tonConnectUI, saleAddress, body) => {
    function ggetTonConnect(tonConnectUI) {
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
                            {
                                address: "EQCE-cKW9BPyiRF9ryzlzK4qbmQvXUmnO8f5O8jcZmbGexSa",
                                amount: "100000000",
                                payload: body,
                            },
                        ],
                        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                    });
                },
            },
            connected: tonConnectUI.connected,
        };
    }
    const { sender } = ggetTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    await sale.send(sender, { value: toNano(0.15) }, "InitClaimDistributedToken");
}

export const _startReedem = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    await sale.send(sender, { value: toNano(0.15) }, "SetRedeemed");
}

export const _getRefund = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    await sale.send(sender, { value: toNano(0.17) }, "InitGetRefund");
}

export const getSaleData = async (saleAddress) => {

    const contract = new Sale(Address.parse(saleAddress));

    const sale = client.open(contract)
    return await sale.getSaleData();
}

export const getWlAddresses = async (saleAddress) => {

    const contract = new Private(Address.parse(saleAddress));

    const sale = client.open(contract)
    return await sale.getGetWhiteListed();
}

export const checkIfWl = async (address, saleAddress) => {

    const contract = new Private(Address.parse(saleAddress));

    const sale = client.open(contract)
    return await sale.getGetIsWhiteListed(Address.parse(address));
}

export const getUserSaleSingle = async (saleAddress, address) => {

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)
    return await sale.getUserSaleSingle(Address.parse(address));
}

export const getSingleData = async (singleAddress) => {

    const contract = new SaleChild(
        Address.parse(singleAddress)
    );

    const sale = client.open(contract)
    return await sale.getUserInfo();
}

export const getTokens = async (tonConnectUI, saleAddress) => {
    const { sender } = getTonConnect(tonConnectUI);

    const contract = new Sale(
        Address.parse(saleAddress)
    );

    const sale = client.open(contract)

    const message = {
        $$type: 'GetTokens',
        amount: Number("270000000000000000"),
    }

    await sale.send(sender, { value: toNano(0.12) }, message);
}

export const sendLoad = async(tonConnectUI)=>{
    
    await tonConnectUI.sendTransaction({
        messages: [
          {
            address: "EQCE-cKW9BPyiRF9ryzlzK4qbmQvXUmnO8f5O8jcZmbGexSa",
            amount: "100000000",
            payload: "te6cckEBAQEAKAAAS7ynUvaAGHvI/wglVsJztej62sJ6T7ppUGUpXUP3/EDlRjZISqzQv/HxyA==",
          },
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      });
}

// const buySale = async (
//     dispatch,
//     address,
//     sender,
//     data,
//     amount,
//     params
// ) => {
//     dispatch(notificationActions.setNotify(true));
//     if (amount > data.maxBuy || amount < data.minBuy) {
//         dispatch(notificationActions.setMessage("Purchase amount out of range"));

//         return;
//     }
    
//     //check if there is ref bonus
//     // if yes, calculate amount in percentage plus to be bought
//     const amountInTokens = amount * data.presaleRate;
//     let ref = 0;
//     if (data.affiliate > 0) {
//         ref = (data.affiliate * amountInTokens) / 100;
//     }

//     //get total commited and total referal bonus
//     const saleData = await getSaleData(data.saleAddress)
//     //add together and subtract from the presale amount

//     const totalAllocated =
//         (Number(saleData._totalRefEarnings) + Number(saleData._totalCommited)) /
//         10 ** data.tokenDecimals;
//     const leftOver = data.presaleAmount - totalAllocated;
//     //subtract amount to be bought + ref bonus from above answer
//     //if greater than zero go ahead and buy
//     if (leftOver - (amountInTokens + ref) > 0) {
//         console.log(1);
//         //buy the normal way
//         await buyTokenTX(sender, data.saleAddress, params
//             ? params
//             : "0:0000000000000000000000000000000000000000000000000000000000000000", amount)

//         //console.log(getTxHash(res));

//     }
//     // else if only amount greater than zero then go buy without ref
//     else if (leftOver - amountInTokens > 0) {
//         console.log(2);

//         //buy without sending ref
//         await buyTokenTX(sender, data.saleAddress, "0:0000000000000000000000000000000000000000000000000000000000000000", amount)

//     } else if (leftOver > 1) {
//         console.log(3);

//         let amount = (leftOver / data.presaleRate) > data.minBuy ? leftOver / data.presaleRate : data.minBuy
//         //buy leftover
//         //msg = (leftOver - 1) / presaleRate
//         await buyTokenTX(sender, data.saleAddress, "0:0000000000000000000000000000000000000000000000000000000000000000", amount)

//     } else {
//         dispatch(notificationActions.setMessage("Token in contract too low"));
//     }
//     setTimeout(async () => {
//         await apiRequest(
//             "sale/buy",
//             { saleAddress: data.saleAddress, user: address },
//             "POST",
//             undefined
//         );

//         dispatch(
//             notificationActions.setMessage("Purchase request submitted successfully")
//         );

//     }, 5000);

// };

// export function UseSaleContract() {
//     const { sender } = useTonConnect();
//     const address = useTonAddress(false);
//     const dispatch = useDispatch()


//     return {
//         buy: async (data, amount, params) => {
//             try {
//                 await buySale(dispatch, address, sender, data, amount, params)
                
//             } catch (error) {
//                 console.log(error);
//                 if (error?.info?.error?.status === 422) {
//                     dispatch(notificationActions.setMessage(error?.info?.error?.message));
//                 } else {
//                     dispatch(notificationActions.setMessage(error.message));
//                 }
//             }
//         }
//     }
// }
