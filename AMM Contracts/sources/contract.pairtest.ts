// ================================================================= //
import { PairChildTest } from "./output/Impulse-Finance_PairChildTest";
// ================================================================ //
import { beginCell, Address, contractAddress, toNano, fromNano } from "@ton/core";
import { TonClient, WalletContractV4, internal } from "@ton/ton";
import { printSeparator } from "./utils/print";
import { mnemonicToPrivateKey } from "ton-crypto";
import * as dotenv from "dotenv";
dotenv.config();
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { buildOnchainMetadata } from './utils/jetton-helpers';

// ================================================================= //

(async() => {

    // Create client for testnet sandboxv4 API - alternative endpoint
    const client4 = new TonClient({
        endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
        apiKey: process.env.API
    });

    let mnemonics = (process.env.mnemonics_2 || "").toString(); // 🔴 Change to your own, by creating .env file!
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    let wallet_contract = client4.open(wallet);
    console.log("Wallet address: ", wallet_contract.address);

    // Replace owner with your address
    // Prepare the initial code and data for the contract
    let init = await PairChildTest.init();

    let deployContract = contractAddress(0, init);
    // ========================================
    let packed = beginCell().storeUint(0, 32).storeStringTail("Deploy").endCell();
    // ========================================
    let deployAmount = toNano("0.1");

    let seqno = await wallet_contract.getSeqno();

    let balance = await wallet_contract.getBalance();
    // ========================================
    console.log("Current deployment wallet balance: ", fromNano(balance).toString(), "💎TON");
    printSeparator();
    console.log("Deploying contract to address: ", deployContract);
    await wallet_contract.sendTransfer({
        seqno,
        secretKey,
        messages: [
            internal({
                to: deployContract,
                value: deployAmount,
                init: { code: init.code, data: init.data},
                bounce: true,
                body: packed,
            }),
        ],
    });

})();