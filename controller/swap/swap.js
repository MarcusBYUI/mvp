const { query } = require("../../model/query");
const createError = require("http-errors");
const Joi = require("joi");
const {calcAmountOut, formatPathLoop} = require("./wrappers/helper")
const { client } = require("../../utils");
const { formatDirectPairResponse, fetchRoutePairs, determineTokenOrder, arrangeTokens, getAccountAndPairInfo, createNewPairInDb, updatePairStartTime, handleChildAccount, preparePairCreationBody, getMultiPairPath } = require("./wrappers/helper.js");
require("./wrappers/listener")

const getTokenList = async (req, res, next) => {
    const schema = Joi.object().keys({
        address: Joi.string()
    });

    try {
        // Validation
        const value = await schema.validateAsync(req.body);

        // Fetch token list once initially
        let list = await query(`SELECT * FROM tokenlist`, []);
        let addressList = list.map((token) => token.address);

        if (value.address) {
            // User connected - get balances of user's jettons and account
            const jettons = await client.accounts.getAccountJettonsBalances(value.address);
            const account = await client.accounts.getAccount(value.address);


            // Process jettons for balance and insert new tokens
            for (const jetton of jettons.balances) {
                const { jetton: jettonData } = jetton;

                // If jetton doesn't exist in the list, add it to the database
                if (!addressList.includes(jettonData.address) && Number(jetton.balance) > 0 && !jettonData.name.includes("Impulse Swap")) {
                    const { bounceable: { b64url } } = await client.accounts.addressParse(jettonData.address);


                    await query(
                        `INSERT INTO tokenlist (name, symbol, decimals, logo, address, friendly, verified) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [
                            jettonData.name,
                            jettonData.symbol,
                            jettonData.decimals,
                            jettonData.image,
                            jettonData.address,
                            b64url,
                            jettonData.verification !== "none" // verified status
                        ]
                    );
                }
            }

            // Refresh token list after potential inserts
            list = await query(`SELECT * FROM tokenlist`, []);
            addressList = list.map((token) => token.address);

            // Set native token balance (if assuming index 0 is native token)
            if (list[0]) {
                list[0].balance = account.balance;
            }

            // Update balances for the frontend
            for (const jetton of jettons.balances) {
                const { jetton: jettonData } = jetton;
                const index = addressList.indexOf(jettonData.address);

                if (index !== -1) {
                    list[index].balance = jetton.balance;
                }
            }
        }

        // Send the list with balances to the frontend
        res.status(200).json({ status: 200, data: list });
    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }
};

const searchToken = async (req, res, next) => {
    const schema = Joi.object().keys({
        token: Joi.string().required(),
        owner: Joi.string()
    });

    try {
        // Validate the input
        const value = await schema.validateAsync(req.body);

        // Fetch jetton information
        const jettonInfo = await client.jettons.getJettonInfo(value.token);

        // Parse the token address
        const { bounceable: { b64url } } = await client.accounts.addressParse(value.token);

        // Check if the token already exists in the database
        const existingToken = await query(`SELECT * FROM tokenlist WHERE address = ?`, [jettonInfo.metadata.address]);

        if (existingToken.length === 0) {
            // Insert token into the database only if it doesn't already exist
            await query(
                `INSERT INTO tokenlist (name, symbol, decimals, logo, address, friendly, verified) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    jettonInfo.metadata.name,
                    jettonInfo.metadata.symbol,
                    jettonInfo.metadata.decimals,
                    jettonInfo.metadata.image,
                    jettonInfo.metadata.address,
                    b64url,
                    jettonInfo.verification !== "none" // verified status
                ]
            );
        }

        // Prepare token info object
        const tokenInfo = {
            name: jettonInfo.metadata.name,
            symbol: jettonInfo.metadata.symbol,
            decimals: jettonInfo.metadata.decimals,
            logo: jettonInfo.metadata.image,
            address: jettonInfo.metadata.address,
            friendly: b64url,
            verified: jettonInfo.verification !== "none",
            balance: 0, // Default balance
            amount: 0 // Default amount
        };

        if (value.owner) {
            // Fetch the owner's jetton balances
            const { balances: jettonBals } = await client.accounts.getAccountJettonsBalances(value.owner);


            // Find the balance for the requested token
            for (const jetton of jettonBals) {
                const { jetton: jettonData } = jetton;
                if (jettonData.address === jettonInfo.metadata.address) {
                    tokenInfo.balance = jetton.balance;
                    break; // Stop the loop early once we find the matching token
                }
            }
        }

        // Send the response with the token info
        res.status(200).json({ status: 200, data: tokenInfo });

    } catch (error) {
        // Handle errors in a unified way
        if (error.error) {
            console.log(error.error);

            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }

    }
};

const getPairStatus = async (req, res, next) => {
    const schema = Joi.object({
        tokenA: Joi.object().required(),
        tokenB: Joi.object().required(),
        start: Joi.number(),
        address: Joi.string(),
    });

    try {
        // Validate the input
        const value = await schema.validateAsync(req.body);
        if (value.tokenA.address === value.tokenB.address) throw Error("Cannot pair the same token");

        // Arrange tokens based on hash order
        const [token0, token1] = arrangeTokens(value.tokenA, value.tokenB);
        value.token0 = token0;
        value.token1 = token1;

        // Retrieve account and pair information
        const { account, pair } = await getAccountAndPairInfo(token0, token1);
        if (!account) throw new Error("Account retrieval failed.");

        if (!pair.length) await createNewPairInDb(token0, token1, account, value);

        // Update start time if provided and pair exists
        if (pair.length && value.start) {
            const startDate = new Date(value.start);
            await updatePairStartTime(account.address, startDate);
        }

        if (account.status === "active") {
            await query(`UPDATE pair SET active = ? WHERE address = ?`, [true, account.address]);
            if (value.address) {
                await handleChildAccount(account, value, res);
            } else {
                res.status(200).json({ status: 200, data: { created: true, address: account.address } });
            }
        } else {
            const body = await preparePairCreationBody(token0, token1, value, account);
            res.status(200).json({ status: 200, data: { created: false, address: account.address, creator: body.toBoc().toString("base64") } });
        }
    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }
};

const quote = async (req, res, next) => {
    const schema = Joi.object().keys({
        in: Joi.string().required(),
        out: Joi.string().required(),
        amount: Joi.number().unsafe().required(),
    });

    try {
        const value = await schema.validateAsync(req.body);
        if (value.in === value.out) throw Error("Can't pair the same token");

        // Arrange tokens based on hash comparison
        const [tokenA, tokenB] = determineTokenOrder(value.in, value.out);
        value.tokenA = tokenA;
        value.tokenB = tokenB;

        // Check for direct pair or route
        const possiblePairs = await fetchRoutePairs(value.in)
        if (!possiblePairs.length) return res.status(200).json({ pair: false });

        const directPair = possiblePairs.find(p => p.tokenA === tokenA && p.tokenB === tokenB);

        const routeOUT = await fetchRoutePairs(value.out);

        if (!routeOUT.length && !directPair) return res.status(200).json({ pair: false });

        let result;


        if (directPair) {
            result = await formatDirectPairResponse(value, directPair);

            if (!result || result[0].amountOut == 0) {
                // Disqualify route if any segment has amountOut of zero
                return res.status(200).json({ pair: false });
            }

        } else {
            const optimalPath = await getMultiPairPath(value); // Already finds the optimal path
            result = []
            let currentValue = { ...value, amount: value.amount };
            let totalImpact = 0;
            let isValidRoute = true;

            // Validate the path and calculate final amountOut and totalImpact
            for (const pair of optimalPath) {

                const routeInfo = await formatPathLoop(currentValue, pair);
                
                if (!routeInfo || routeInfo.amountOut === 0) {
                    isValidRoute = false; // Invalid if any segment has amountOut of zero
                    break;
                }

                
                result.push({...routeInfo,
                    amountOut: routeInfo.amountOut / (10 ** (routeInfo.out === pair.tokenA ? pair.decimalA : pair.decimalB))
                });
                currentValue = { in: routeInfo.out, amount: routeInfo.amountOut };
            }

            // Format the response for the optimal route
            if (!isValidRoute) {
                return res.status(200).json({ pair: false }); // No valid route
            }

        }


        res.status(200).json({ quote: result });
    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }
};

const confirmTx = async (req, res, next) => {
    const schema = Joi.object().keys({
        harsh: Joi.string().required(),
    });

    try {
        //validation
        const value = await schema.validateAsync(req.body);
        const times = 0;

        const checkInterval = setInterval(async () => {
            const tx = await client.blockchain.getBlockchainTransaction(value.harsh).catch((e) => { });
            if (times > 15) {
                clearInterval(checkInterval)
                res.status(200).json({ status: 200, message: "Confirmed" })
            }

            if (tx?.success) {
                clearInterval(checkInterval)
                setTimeout(() => {
                    return res.status(200).json({ status: 200, message: "Confirmed" })
                }, 30000);
            }

        }, 10000);

    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }

}

const getPairList = async (req, res, next) => {
    try {

        const list = await query(`SELECT * FROM pair where active = ?`, [true]);
        res.status(200).json({ status: 200, data: list });


    } catch (error) {
        next(createError(422, error.message));
        return;
    }

}

const getPairByAddress = async (req, res, next) => {
    const schema = Joi.object().keys({
        address: Joi.string().required(),
        user: Joi.string(),
    });

    try {
        //validation
        const { address } = await schema.validateAsync(req.body);

        const result = await query(`SELECT * FROM pair where addressf = ? AND active = ?`, [address, true]);
        res.status(200).json({ status: 200, data: result[0] });


    } catch (error) {
        next(createError(422, error.message));
        return;
    }

}

const getLpBalance = async (req, res, next) => {
    const schema = Joi.object().keys({
        address: Joi.string().required(),
        pair: Joi.string().required()
    });

    try {
        //validation
        let balance = 0;
        const { address, pair } = await schema.validateAsync(req.body);

        const { balances } = await client.accounts.getAccountJettonsBalances(address);

        for (let i = 0; i < balances.length; i++) {
            const element = balances[i];

            if (element.jetton.address == pair) {
                balance = Number(element.balance)
            }

        }

        res.status(200).json({ status: 200, data: balance });


    } catch (error) {
        if (error.error) {
            next(createError(error.status, error.error.error));
        } else {
            next(createError(422, error.message));
        }
    }

}


module.exports = {
    getTokenList,
    searchToken,
    getPairStatus,
    quote,
    confirmTx,
    getPairList,
    getPairByAddress,
    getLpBalance
    // getToken,
    // checkPairSingle,
    // createPair,
    // createSingle,
    // liqQuote,
    // getPairAndSingle,
    // getLiqOut,
    // getHistory,
    // getImpulseReward,
    // claimImpulseReward,
    // getPairs,
    // getSinglePair,
    // getHomeStats
}