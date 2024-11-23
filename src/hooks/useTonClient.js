import { TonClient } from "@ton/ton";

export function getTonClient() {
  const client = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC",
    apiKey: "2acc50980b170c31b7a45604e0b75845022869a70cbe6477ec03135e61322bfb"
})

// const client = new TonClient({
//     endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
//     apiKey: "342db3313f77cdf21b4c1170e611f98a10c63b455e001ce28d66437f7511899d"
// })
  return client
}