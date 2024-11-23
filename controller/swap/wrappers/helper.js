const { Address, Dictionary, beginCell, Builder } = require('@ton/core');
const { contractClient, client } = require('../../../utils');
const { factory, TONADDRESS, router } = require('./config.js');
const { Sha256 } = require("@aws-crypto/sha256-js");
const { query } = require('../../../model/query.js');
const { default: BigNumber } = require('bignumber.js');

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

const getGetPair = async (a, b) => {
    const module = await import('./_Factory.js');

    const swapFactoryAddress = new module.Factory(
        Address.parse(factory)
    );

    const _instance = contractClient.open(swapFactoryAddress)

    const _info = await _instance.getGetPair(a, b)

    return _info
}

const getGetPairchild = async (pair, address) => {
    const module = await import('./_Pair.js');

    const pairChildAddress = new module.Pair(
        Address.parse(pair)
    );

    const _instance = contractClient.open(pairChildAddress)

    const _info = await _instance.getGetPairchild(address)

    return _info
}

const getAmountOut = async (pair, amountIn, token) => {
    const module = await import('./_Pair.js');

    const pairAddress = new module.Pair(
        Address.parse(pair)
    );

    const _instance = contractClient.open(pairAddress)

    const _info = await _instance.getGetAmountOut(amountIn, token)

    return _info
}

const getPairInfo = async (pair) => {
    const module = await import('./_Pair.js');

    const pairAddress = new module.Pair(
        Address.parse(pair)
    );

    const _instance = contractClient.open(pairAddress)

    const _info = await _instance.getParentinfo()

    return _info
}

const getGetWalletAddress = async (master, owner) => {
    const module = await import('./_Jetton.js');

    const JettonAddress = new module.SampleJetton(
        Address.parse(master)
    );

    const _instance = contractClient.open(JettonAddress)

    const _info = await _instance.getGetWalletAddress(owner)

    return _info
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

// Calculates price impact for a given reserve and amount
function calculatePriceImpact(reserveX, reserveY, amountX) {
    const originalPrice = reserveY / reserveX;
    const amountYOut = (reserveY * amountX) / (reserveX + amountX);
    const newPrice = (reserveY - amountYOut) / (reserveX + amountX);
    const priceImpact = ((1 - newPrice / originalPrice) * 100);
    return priceImpact;
}

// Calculates output amount and price impact
async function calcAmountOut(value, pair) {
    try {
        const amount = parseInt(String(value.amount).split(".")[0], 10);
        const amountOut = Number(await getAmountOut(pair.address, amount, Address.parse(value.in)));

        const pairInfo = await getPairInfo(pair.address);

        const impact = value.in === pair.tokenA
            ? calculatePriceImpact(Number(pairInfo.reserve0), Number(pairInfo.reserve1), amount)
            : calculatePriceImpact(Number(pairInfo.reserve1), Number(pairInfo.reserve0), amount);
        
        return { amountOut, impact };
    } catch (error) {
        console.error("Error in calcAmountOut:", error);
        return null;
    }
}

// Helper function to determine token order
function determineTokenOrder(tokenIn, tokenOut) {
    const a = beginCell().storeAddress(Address.parse(tokenIn)).endCell().hash();
    const b = beginCell().storeAddress(Address.parse(tokenOut)).endCell().hash();
    return a < b ? [tokenIn, tokenOut] : [tokenOut, tokenIn];
}

// Fetch pairs for a specific token (utility function)
async function fetchRoutePairs(token) {
    return await query(`SELECT * FROM pair WHERE (tokenA = ? OR tokenB = ?) AND active = ?`, [token, token, true]);
}

// Format response for direct pair route
async function formatDirectPairResponse(value, pair) {
    const { amountOut, impact } = await calcAmountOut(value, pair);
    return [{
        in: value.in === pair.tokenA ? pair.tokenA : pair.tokenB,
        inSym: value.in === pair.tokenA ? pair.symbolA : pair.symbolB,
        pair: pair.address,
        startTime: pair.startTime,
        impact,
        amountOut: amountOut / (10 ** (value.out === pair.tokenA ? pair.decimalA : pair.decimalB)),
        outSym: value.in === pair.tokenB ? pair.symbolA : pair.symbolB,
        out: value.in === pair.tokenB ? pair.tokenA : pair.tokenB,
    }];
}

async function formatPathLoop(value, pair) {
    const { amountOut, impact } = await calcAmountOut(value, pair);
    return {
        in: value.in === pair.tokenA ? pair.tokenA : pair.tokenB,
        inSym: value.in === pair.tokenA ? pair.symbolA : pair.symbolB,
        pair: pair.address,
        startTime: pair.startTime,
        impact,
        amountOut: amountOut,
        outSym: value.in === pair.tokenB ? pair.symbolA : pair.symbolB,
        out: value.in === pair.tokenB ? pair.tokenA : pair.tokenB,
    };
}

async function getMultiPairPath(value) {
    const allPairs = await fetchAllPairs(value); // Fetch all available pairs from your data source
    const paths = [];
    const visitedPairs = new Set();

    // Recursive helper function to find paths
    function dfs(currentToken, currentPath) {
        
        // If we reach the `tokenOut`, save the current path
        if (currentToken === value.out) {
            paths.push([...currentPath]);
            return;
        }

        // Find pairs connected to the `currentToken`
        for (const pair of allPairs) {
            // Skip already visited pairs
            if (visitedPairs.has(pair)) continue;

            // Check if the pair contains the `currentToken`
            if (pair.tokenA === currentToken || pair.tokenB === currentToken) {
                const nextToken = pair.tokenA === currentToken ? pair.tokenB : pair.tokenA;

                // Mark the pair as visited and add it to the current path
                visitedPairs.add(pair);
                currentPath.push(pair);

                // Continue the search with the `nextToken`
                dfs(nextToken, currentPath);

                // Backtrack: remove the pair from the path and unmark it
                currentPath.pop();
                visitedPairs.delete(pair);
            }
        }
    }

    
    
    // Start the DFS from `tokenIn`
    dfs(value.in, []);

    
    // Select the optimal path (e.g., shortest path) if needed
    const optimalPath = paths.sort((a, b) => a.length - b.length)[0]; // Shortest path by default

    if (!optimalPath) {
        throw new Error(`No available path from ${value.in} to ${value.out}`);
    }

    return optimalPath;
}

// Utility function to fetch all pairs
async function fetchAllPairs(value) {
    const routeIN = await fetchRoutePairs(value.in);
    const routeOUT = await fetchRoutePairs(value.out);
    return [...routeIN, ...routeOUT];
}



// Format response for multi-pair routes
async function formatMultiPairResponse(value, paths) {
    const arr = [];

    // Set initial values based on user input
    let currentValue = { ...value, amount: value.amount };

    for (let i = 0; i < paths.length; i++) {
        const currentPair = paths[i];
        
        // Determine `in` and `out` tokens for this pair based on `currentValue`
        const inToken = currentValue.in;
        const outToken = inToken === currentPair.tokenA ? currentPair.tokenB : currentPair.tokenA;

        // Calculate output and impact for the current pair
        const pairImpact = await calcAmountOut(currentValue, currentPair);

        // Format and push current pair data into the array
        arr.push({
            in: inToken,
            inSym: inToken === currentPair.tokenA ? currentPair.symbolA : currentPair.symbolB,
            pair: currentPair.address,
            startTime: currentPair.startTime,
            impact: pairImpact.impact,
            amountOut: pairImpact.amountOut / (10 ** (outToken === currentPair.tokenA ? currentPair.decimalA : currentPair.decimalB)),
            outSym: outToken === currentPair.tokenA ? currentPair.symbolA : currentPair.symbolB,
            out: outToken
        });

        // Prepare `currentValue` for the next pair, using the output token and amount from this pair
        currentValue = {
            in: outToken,
            amount: pairImpact.amountOut
        };
    }

    return arr;
}

// Arrange tokens based on address hash order
function arrangeTokens(tokenA, tokenB) {
    const aHash = beginCell().storeAddress(Address.parse(tokenA.address)).endCell().hash();
    const bHash = beginCell().storeAddress(Address.parse(tokenB.address)).endCell().hash();
    return aHash < bHash ? [tokenA, tokenB] : [tokenB, tokenA];
}

// Get account and pair information
async function getAccountAndPairInfo(token0, token1) {
    const _info = await getGetPair(Address.parse(token0.address), Address.parse(token1.address))
    const account = await client.accounts.getAccount(_info);
    const pair = await query(`SELECT * FROM pair WHERE address = ?`, [account.address]);
    return { account: {...account, _info}, pair };
}

// Create a new pair in the database if not existing
async function createNewPairInDb(token0, token1, account) {
    const [jettonInfoA, jettonInfoB] = await Promise.all([
        token0.address === TONADDRESS ? { metadata: { symbol: "TON", decimals: 9, image: "https://impulsefinance.s3.us-east-1.amazonaws.com/images/1729582979540ton_symbol.png" } } : client.jettons.getJettonInfo(token0.address),
        token1.address === TONADDRESS ? { metadata: { symbol: "TON", decimals: 9, image: "https://impulsefinance.s3.us-east-1.amazonaws.com/images/1729582979540ton_symbol.png" } } : client.jettons.getJettonInfo(token1.address)
    ]);

    await query(`INSERT INTO pair (tokenA, tokenB, symbolA, symbolB, decimalA, decimalB, imageA, imageB, address, addressf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [token0.address, token1.address, jettonInfoA.metadata.symbol, jettonInfoB.metadata.symbol, jettonInfoA.metadata.decimals, jettonInfoB.metadata.decimals, jettonInfoA.metadata.image, jettonInfoB.metadata.image, account.address, account._info.toString()]);
} 

// Update the pair's start time
async function updatePairStartTime(address, startDate) {
    const formattedDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
    await query(`UPDATE pair SET startTime = ? WHERE address = ?`, [formattedDate, address]);
}

// Handle child account creation or response
async function handleChildAccount(account, value, res) {
    const _info = await getGetPairchild(account.address, Address.parse(value.address));
    const _account = await client.accounts.getAccount(_info);

    if (_account.status === "active") {
        res.status(200).json({ status: 200, data: { created: true, address: account.address, child: true, childAddress: _account.address } });
    } else {
        const creatorData = await prepareChildCreatorData(value, _account);
        res.status(200).json({ status: 200, data: { created: true, address: account.address, creator: creatorData.toBoc().toString("base64"), child: false, childAddress: _account.address } });
    }
}

// Prepare creator data for child account
async function prepareChildCreatorData(value, account) {
    const childToken0Wallet = value.token0.address === TONADDRESS ? Address.parse(TONADDRESS) : await getGetWalletAddress(value.token0.address, Address.parse(account.address));
    const childToken1Wallet = value.token1.address === TONADDRESS ? Address.parse(TONADDRESS) : await getGetWalletAddress(value.token1.address, Address.parse(account.address));

    return beginCell().store((builder) => {
        builder.storeUint(3199865964, 32);
        builder.storeAddress(Address.parse(value.address));
        builder.storeAddress(childToken0Wallet);
        builder.storeAddress(childToken1Wallet);
    }).endCell();
}

// Prepare data for pair creation if the account is inactive
async function preparePairCreationBody(token0, token1, value) {
    const jettonParams = {
        name: `Impulse Swap LP: ${token0.symbol}-${token1.symbol}`,
        description: "This is an LP token from Impulse Swap",
        symbol: `${token0.symbol}-${token1.symbol}`,
        image: "https://minter.ton.org/static/media/logo.3c3503cfcef8632dbe566c16c3921262.svg",
    };
    const content = buildOnchainMetadata(jettonParams);

    const token0Wallet = token0.address === TONADDRESS ? Address.parse(TONADDRESS) : await getGetWalletAddress(token0.address, Address.parse(router));
    const token1Wallet = token1.address === TONADDRESS ? Address.parse(TONADDRESS) : await getGetWalletAddress(token1.address, Address.parse(router));

    return beginCell().store((builder) => {
        builder.storeUint(1189874577, 32);
        builder.storeAddress(Address.parse(token0.address));
        builder.storeAddress(Address.parse(token1.address));
        builder.storeInt(Number((new BigNumber(value.start ? value.start : 0))), 257);
        builder.storeRef(content);
        const walletBuilder = new Builder();
        walletBuilder.storeAddress(Address.parse(router));
        walletBuilder.storeAddress(token0Wallet);
        walletBuilder.storeAddress(token1Wallet);
        builder.storeRef(walletBuilder.endCell());
    }).endCell();
}


module.exports = {
    getGetPair, getGetPairchild, getGetWalletAddress, buildOnchainMetadata,
    getAmountOut, formatMultiPairResponse, formatDirectPairResponse, getPairInfo,
    fetchRoutePairs, determineTokenOrder, arrangeTokens, getAccountAndPairInfo, createNewPairInDb,
    updatePairStartTime, handleChildAccount, preparePairCreationBody, getMultiPairPath, calcAmountOut, formatPathLoop
}