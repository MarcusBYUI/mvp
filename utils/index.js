const { HttpClient, Api } = require('tonapi-sdk-js');
const mainnet = {
    tonapi: "https://tonapi.io",
    toncenter: "https://toncenter.com/api/v2/jsonRPC",
    toncenterKey: "4fbc10ab145e4bfa83429aa7d4339a632c3672959cc56be02363e7b3806be232"
}
const testnet = {
    tonapi: "https://testnet.tonapi.io",
    toncenter: "https://testnet.toncenter.com/api/v2/jsonRPC",
    toncenterKey: "18c55f54f4d6d229d4a6230d6cd70a537228cf8a0aa37573d0812c60f7658a40"
}
const { TonClient } = require("@ton/ton");

const httpClient = new HttpClient({
    baseUrl: testnet.tonapi,
    baseApiParams: {
        headers: {
            Authorization: `Bearer ${process.env.TONTOKEN}`,
            'Content-type': 'application/json'
        }
    }
});
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// Initialize the API client
const client = new Api(httpClient);

const contractClient = new TonClient({
    endpoint: testnet.toncenter,
    apiKey: testnet.toncenterKey
})


function numberToTwoDecimals(num) {
    if (num) {
        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,9})?/)[0];
        return Number(with2Decimals);
    } else {
        return 0;
    }
}

module.exports = { numberToTwoDecimals, sleep, client, contractClient }