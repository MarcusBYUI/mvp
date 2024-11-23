const { query } = require("../../model/query");
const createError = require("http-errors");
const Joi = require("joi");
const {calcAmountOut, formatPathLoop} = require("./wrappers/helper")
const { client } = require("../../utils");
const { formatDirectPairResponse, fetchRoutePairs, determineTokenOrder, arrangeTokens, getAccountAndPairInfo, createNewPairInDb, updatePairStartTime, handleChildAccount, preparePairCreationBody, getMultiPairPath } = require("./wrappers/helper.js");
require("./wrappers/listener")


// const getImpact = async(ever, value, pair) => {
//     try {
//         //get amount out for pair and price impact
//         const instance = new ever.Contract(pairABI, pair.address);
//         const num = String(value.amount).includes(".") ? String(value.amount).split(".")[0] : value.amount
//             //get name
//         const { value0: amountOut } = await instance.methods._amountOut({ answerId: 0, _tokenRoot: value.in, amount: num }).call();
//         const { reserve0 } = await instance.methods.reserve0({}).call();
//         const { reserve1 } = await instance.methods.reserve1({}).call();
//         if (value.in == pair.tokenA) {
//             const price = reserve0 / reserve1
//             const paid = num / amountOut
//             const impact = ((paid - price) / price) * 100
//             return { impact, amountOut }
//         } else {
//             const price = reserve1 / reserve0
//             const paid = num / amountOut
//             const impact = ((paid - price) / price) * 100
//             return { impact, amountOut }
//         }
//     } catch (error) {
//         return false
//     }
// }



// const getToken = async(req, res, next) => {
//     const schema = Joi.object().keys({
//         address: Joi.string().required(),
//         owner: Joi.string().allow(null, '')
//     });


//     try {
//         //validation
//         const value = await schema.validateAsync(req.body);

//         const { ever } = await everline().catch((err) => {
//             throw new Error(err.message)
//         });

//         const instance = new ever.Contract(tokenRootABI, value.address);
//         //get name
//         //symbol
//         //decimal
//         //return root aswell
//         const { value0: name } = await instance.methods.name({ answerId: 0 }).call();
//         const { value0: symbol } = await instance.methods.symbol({ answerId: 0 }).call();
//         const { value0: decimal } = await instance.methods.decimals({ answerId: 0 }).call();

//         const obj = { name, symbol, root: value.address, balance: 0, decimal, image: "https://impulsefinance.s3.us-east-1.amazonaws.com/images/1700217945900unknown.png" }

//         if (value.owner) {
//             try {


//                 const { value0: wallet } = await instance.methods
//                     .walletOf({
//                         answerId: 0,
//                         walletOwner: value.owner,
//                     })
//                     .call();

//                 const walletIns = new ever.Contract(tokenWalletABI, wallet._address)
//                 const { value0 } = await walletIns.methods.balance({ answerId: 0 }).call();

//                 obj.balance = obj.balance = value0 > 0 ? value0 / 10 ** obj.decimal : 0

//                 res.status(200).json({ status: 200, data: obj })
//             } catch (error) {
//                 res.status(200).json({ status: 200, data: obj })
//             }
//         }



//     } catch (e) {
//         next(createError(422, e.message));
//         return;
//     }

// }

// const checkPairSingle = async(req, res, next) => {
//     const schema = Joi.object().keys({
//         address: Joi.string().required(),
//         in: Joi.string().required(),
//         out: Joi.string().required()
//     });


//     try {
//         //validation
//         const value = await schema.validateAsync(req.body);
//         const { tokenA, tokenB } = value.in < value.out ? { tokenA: value.in, tokenB: value.out } : { tokenA: value.out, tokenB: value.in }


//         const check = await query(`SELECT * FROM pair WHERE tokenA = ? AND tokenB = ?`, [tokenA, tokenB]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (check.length == 0) {
//             res.status(200).json({ status: 200, data: [] })
//             return
//         }

//         const single = await query(`SELECT * FROM pairsingle WHERE pairAddress = ? and user = ?`, [check[0].address, value.address]).catch((err) => {
//             throw Error(err.message)
//         });

//         res.status(200).json({ status: 200, data: single })

//     } catch (e) {
//         next(createError(422, e.message));
//         return;
//     }

// }

// const createPair = async(req, res, next) => {
//     const schema = Joi.object().keys({ in: Joi.string().required(),
//         out: Joi.string().required(),
//         owner: Joi.string().required(),
//         startTime: Joi.string().required(),
//     });

//     let value = false

//     try {
//         //validation
//         value = await schema.validateAsync(req.body);

//         const { tokenA, tokenB } = value.in < value.out ? { tokenA: value.in, tokenB: value.out } : { tokenA: value.out, tokenB: value.in }

//         const check = await query(`SELECT * FROM pair WHERE tokenA = ? AND tokenB = ?`, [tokenA, tokenB]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (check.length > 0) {
//             throw Error("Pair already created")
//         }

//         if (tokenA == tokenB || String(tokenB).toLowerCase() == String(tokenA).toLowerCase()) {
//             throw Error("Pair already created")
//         }

//         value.tokenA = tokenA
//         value.tokenB = tokenB

//         const { ever, client } = await everline().catch((err) => {
//             throw new Error(err.message)
//         });


//         const instanceA = new ever.Contract(tokenRootABI, tokenA);
//         const instanceB = new ever.Contract(tokenRootABI, tokenB);

//         //get symbol
//         const { value0: symbol } = await instanceA.methods.symbol({ answerId: 0 }).call();
//         value.symbolA = symbol;

//         // get decimals
//         const { value0: decimal } = await instanceA.methods.decimals({ answerId: 0 }).call();
//         value.decimalA = Number(decimal);

//         //get symbol
//         const { value0: symbolb } = await instanceB.methods.symbol({ answerId: 0 }).call();
//         value.symbolB = symbolb;

//         // get decimals
//         const { value0: decimalb } = await instanceB.methods.decimals({ answerId: 0 }).call();
//         value.decimalB = Number(decimalb);

//         const chefAddress = new Address(CHEF);

//         const chefInstance = new ever.Contract(chefABI, chefAddress);
//         const { value0 } = await chefInstance.methods.getPayment({ answerId: 0, _account: value.owner }).call();

//         if (value0.amount == 0) {
//             throw Error("No payment found")
//         }

//         value0.amount = value0.amount / 10 ** 9

//         const info = value0

//         //check if harsh in table, if so return false
//         const result = await query(
//             `SELECT * FROM pair WHERE harsh = ?`, [info.id]
//         ).catch((err) => {
//             throw Error(err.message)
//         });

//         if (result.length > 0) {
//             throw Error("Duplicate payment")
//         }

//         //it is now established harsh has not been used before
//         //discounted scenerio
//         const start = String(new Date(value.startTime).getTime())
//         if (info.amount >= 5) {
//             main(client, ever, value)
//                 .then(async(pairAddress) => {
//                     client.close();
//                     const result = await query(`INSERT INTO pair (
//                         tokenA, 
//                         tokenB, 
//                         symbolA,
//                         symbolB,
//                         decimalA,
//                         decimalB,
//                         harsh,
//                         address, 
//                         startTime
//                         ) VALUES (?,?,?,?,?,?,?,?,?)`, [
//                         value.tokenA,
//                         value.tokenB,
//                         value.symbolA,
//                         value.symbolB,
//                         value.decimalA,
//                         value.decimalB,
//                         info.id,
//                         pairAddress,
//                         start.slice(0, 10)
//                     ]).catch(async(err) => {
//                         next(createError.UnprocessableEntity(err.message));
//                         return;
//                     });

//                     if (!result) {
//                         return;
//                     }

//                     res.status(200).json({ status: 200, message: "Pair was created successfuly" });

//                 })
//                 .catch(async(error) => {
//                     const ponse = await sendRefund(value.owner, true, error.message)
//                     console.log(ponse);
//                     return next(createError(422, error.message));
//                 })
//         } else {
//             client.close();
//             throw Error("Insufficient amount received")
//         }

//     } catch (error) {
//         if (value) {
//             const ponse = await sendRefund(value.owner, true, error.message)
//             console.log(ponse);
//         }

//         next(createError(422, error.message));
//         return;
//     }
// };

// const createSingle = async(req, res, next) => {
//     const schema = Joi.object().keys({
//         owner: Joi.string().required(),
//         in: Joi.string().required(),
//         out: Joi.string().required(),
//     });

//     try {
//         //validation
//         const value = await schema.validateAsync(req.body);

//         //get pairInfo
//         const { tokenA, tokenB } = value.in < value.out ? { tokenA: value.in, tokenB: value.out } : { tokenA: value.out, tokenB: value.in }

//         const resp = await query(`SELECT * FROM pair WHERE tokenA = ? AND tokenB = ?`, [tokenA, tokenB]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (resp.length == 0) {
//             throw Error("Pair doesn't exist")
//         }

//         value.data = resp[0]

//         const { ever, client } = await everline().catch((err) => {
//             throw new Error(err.message)
//         });

//         value.tokenA = resp[0].tokenA
//         value.tokenB = resp[0].tokenB
//         value.pairAddress = resp[0].address


//         const chefAddress = new Address(CHEF);

//         const chefInstance = new ever.Contract(chefABI, chefAddress);
//         const { value0 } = await chefInstance.methods.getPayment({ answerId: 0, _account: value.owner }).call();

//         if (value0.amount == 0) {
//             throw Error("Activation failed")
//         }

//         value0.amount = value0.amount / 10 ** 9

//         const info = value0

//         //check if harsh in table, if so return false
//         const result = await query(
//             `SELECT * FROM pairsingle WHERE harsh = ?`, [info.id]
//         ).catch((err) => {
//             throw Error(err.message)
//         });

//         if (result.length > 0) {
//             throw Error("Activation failed")
//         }


//         //free, use impulse as stake params
//         if (info.amount >= 0.6) {
//             activator(client, ever, value)
//                 .then(async(singleAddress) => {
//                     client.close();
//                     await query(`INSERT INTO pairsingle (
//                         pairAddress, 
//                         user,
//                         harsh,
//                         address
//                         ) VALUES (?,?,?,?)`, [
//                         value.pairAddress,
//                         value.owner,
//                         info.id,
//                         singleAddress,
//                     ]).catch(async(err) => {
//                         console.log(err);
//                         return;
//                     });

//                     res.status(200).json({ status: 200, message: "Pair was activated successfully" });

//                 })
//                 .catch(async(error) => {
//                     return next(createError(422, error.message));
//                 })
//         } else {
//             client.close();
//             throw Error("Insufficient amount received")
//         }

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// };

// const liqQuote = async(req, res, next) => {
//     const schema = Joi.object().keys({ in: Joi.string().required(),
//         in: Joi.string().required(),
//         out: Joi.string().required(),
//         address: Joi.string().required(),
//         amount: Joi.number().required(),
//     });

//     try {
//         //validation
//         const value = await schema.validateAsync(req.body);
//         const { tokenA, tokenB } = value.in < value.out ? { tokenA: value.in, tokenB: value.out } : { tokenA: value.out, tokenB: value.in }

//         const check = await query(`SELECT * FROM pair WHERE tokenA = ? AND tokenB = ?`, [tokenA, tokenB]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (check.length == 0) {
//             res.status(200).json({ state: false, message: "creation" })
//             return
//         }

//         //get pairsingle
//         const single = await query(`SELECT * FROM pairsingle WHERE pairAddress = ? and user = ?`, [check[0].address, value.address]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (single.length == 0) {
//             res.status(200).json({ state: false, message: "activation" })
//             return
//         }

//         //get equivalent for amount sent in
//         const { ever } = await everline().catch((err) => {
//             throw new Error(err.message)
//         });

//         const instance = new ever.Contract(pairABI, check[0].address);

//         const { reserve0 } = await instance.methods.reserve0({}).call();
//         const { reserve1 } = await instance.methods.reserve1({}).call();

//         if (reserve0 == 0 || reserve1 == 0) {
//             res.status(200).json({ state: false, message: "zero", addy: single[0].address })
//         } else if (value.in == check[0].tokenA) {
//             const amount = (reserve1 * value.amount) / reserve0
//             res.status(200).json({ state: true, message: amount / (10 ** check[0].decimalB), addy: single[0].address })
//             return

//         } else {
//             const amount = (reserve0 * value.amount) / reserve1
//             res.status(200).json({ state: true, message: amount / (10 ** check[0].decimalA), addy: single[0].address })
//             return
//         }

//     } catch (error) {

//         next(createError(422, error.message));
//         return;
//     }
// }

// const getPairAndSingle = async(req, res, next) => {
//     const schema = Joi.object().keys({
//         pair: Joi.string().required(),
//         single: Joi.string().required(),
//     });

//     try {
//         //validation
//         const value = await schema.validateAsync(req.body)

//         const pair = await query(`SELECT * FROM pair WHERE address = ?`, [value.pair]).catch((err) => {
//             throw Error(err.message)
//         });

//         const single = await query(`SELECT * FROM pairsingle WHERE address = ?`, [value.single]).catch((err) => {
//             throw Error(err.message)
//         });


//         res.status(200).json({ status: 200, data: { pair, single } })


//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const getLiqOut = async(req, res, next) => {
//     const schema = Joi.object().keys({
//         amount: Joi.number().required(),
//         pair: Joi.string().required()
//     });

//     try {
//         const value = await schema.validateAsync(req.body)
//         const { ever } = await everline().catch((err) => {
//             throw new Error(err.message)
//         });
//         value.amount = value.amount * (10 ** 9)
//         const instance = new ever.Contract(pairABI, value.pair);
//         const num = String(value.amount).includes(".") ? String(value.amount).split(".")[0] : value.amount

//         const { value0, value1 } = await instance.methods.liqOut({ answerId: 0, shares: num }).call();

//         res.status(200).json({ status: 200, data: { amountA: value0, amountB: value1 } })

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const getHistory = async(req, res, next) => {
//     const address = req.params.address
//     try {
//         const history = await query(`SELECT tokenInSym, tokenOutSym, amountIn, amountOutWithFee, tx, date FROM history WHERE user = ?`, [address]).catch((err) => {
//             throw Error(err.message)
//         });
//         const _history = history.reverse().splice(0, 7)
//         res.status(200).json({ status: 200, data: _history })

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const getImpulseReward = async(req, res, next) => {
//     const address = req.params.address
//     try {
//         const history = await query(`SELECT SUM(impulse) as impulse, COUNT(reward_id) as total FROM reward WHERE user = ?`, [address]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (history[0]) {

//             if (history[0].total >= 240) {
//                 res.status(200).json({ num: history[0].impulse, multiplier: 5 })

//             } else if (history[0].total >= 180) {
//                 res.status(200).json({ num: history[0].impulse, multiplier: 4 })

//             } else if (history[0].total >= 120) {
//                 res.status(200).json({ num: history[0].impulse, multiplier: 3 })

//             } else if (history[0].total >= 25) {
//                 res.status(200).json({ num: history[0].impulse, multiplier: 2 })

//             } else {
//                 res.status(200).json({ num: history[0].impulse, multiplier: 1 })

//             }

//         } else {
//             res.status(200).json({ num: 0, multiplier: 1 })
//         }

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const claimImpulseReward = async(req, res, next) => {
//     const address = req.params.address
//     try {
//         const history = await query(`SELECT SUM(impulse) as impulse, COUNT(reward_id) as total FROM reward WHERE user = ?`, [address]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (history[0]) {

//             let token;

//             if (history[0].total >= 240) {
//                 token = history[0].impulse * 5 * (10 ** 9);

//             } else if (history[0].total >= 180) {
//                 token = history[0].impulse * 4 * (10 ** 9);

//             } else if (history[0].total >= 120) {
//                 token = history[0].impulse * 3 * (10 ** 9);

//             } else if (history[0].total >= 25) {
//                 token = history[0].impulse * 2 * (10 ** 9);

//             } else {
//                 token = history[0].impulse * (10 ** 9);

//             }

//             if (token > 0) {
//                 const { ever, client } = await everline().catch((err) => {
//                     throw new Error(err.message)
//                 });
//                 const chefAddress = new Address(CHEF);

//                 const chefInstance = new ever.Contract(chefABI, chefAddress);
//                 const { value0 } = await chefInstance.methods.getPayment({ answerId: 0, _account: address }).call();
//                 if (value0.amount == 0) {
//                     throw Error("Claim failed")
//                 }

//                 value0.amount = value0.amount / 10 ** 9

//                 const info = value0

//                 //check if harsh in table, if so return false
//                 const result = await query(
//                     `SELECT * FROM claimtx WHERE harsh = ?`, [info.id]
//                 ).catch((err) => {
//                     throw Error(err.message)
//                 });

//                 if (result.length > 0) {
//                     throw Error("Claim failed")
//                 }

//                 if (value0.amount < 0.14){
//                     throw Error("Claim failed")

//                 }

//                 //delete userwards
//                 await query(`DELETE FROM reward WHERE user = ?`, [address]).catch((err) => {
//                     throw Error(err.message)
//                 });

//                 await query(`INSERT INTO claimtx (
//                     user,
//                     harsh
//                     ) VALUES (?,?)`, [
//                     address,
//                     info.id
//                 ]).catch(async(err) => {
//                     console.log(err);
//                     return;
//                 });

//                 //send token
//                 const instance = new ever.Contract(tokenRootABI, symbioteToken);

//                 const { value0: wallet } = await instance.methods
//                     .walletOf({
//                         answerId: 0,
//                         walletOwner: managerAddress,
//                     })
//                     .call();

//                 const num = String(token).includes(".") ? String(token).split(".")[0] : token


//                 const giverContract = {
//                     "ABI version": 2,
//                     "data": [],
//                     "events": [],
//                     "fields": [{
//                         "name": "_pubkey",
//                         "type": "uint256"
//                     },
//                     {
//                         "name": "_timestamp",
//                         "type": "uint64"
//                     }
//                     ],
//                     "functions": [{
//                         "inputs": [{
//                             "name": "dest",
//                             "type": "address"
//                         },
//                         {
//                             "name": "value",
//                             "type": "uint128"
//                         },
//                         {
//                             "name": "bounce",
//                             "type": "bool"
//                         },
//                         {
//                             "name": "flags",
//                             "type": "uint8"
//                         },
//                         {
//                             "name": "payload",
//                             "type": "cell"
//                         }
//                         ],
//                         "name": "sendTransaction",
//                         "outputs": []
//                     },
//                     {
//                         "inputs": [{
//                             "name": "flags",
//                             "type": "uint8"
//                         },
//                         {
//                             "name": "message",
//                             "type": "cell"
//                         }
//                         ],
//                         "name": "sendTransactionRaw",
//                         "outputs": []
//                     }
//                     ],
//                     "header": [
//                         "pubkey",
//                         "time",
//                         "expire"
//                     ],
//                     "version": "2.3"
//                 };

//                 const _ = (await client.abi.encode_message_body({
//                     address: wallet._address,
//                     abi: {
//                         type: "Contract",
//                         value: tokenWalletABI,
//                     },
//                     call_set: {
//                         function_name: 'transfer',
//                         input: {
//                             amount: num,
//                             recipient: address,
//                             deployWalletValue: "100000000",
//                             remainingGasTo: managerAddress,
//                             notify: true,
//                             payload: "te6ccgEBAQEAAgAAAA==",
//                         },
//                     },
//                     signer: {
//                         type: 'None',
//                     },
//                     is_internal: true,
//                 })).body

//                 client.close();

//                 const giverAccounts = new ever.Contract(giverContract, managerAddress);

//                 await giverAccounts.methods.sendTransaction({
//                     dest: wallet._address,
//                     value: 0.14 * 1e9,
//                     bounce: false,
//                     flags: 3,
//                     payload: _
//                 }).sendExternal({
//                     publicKey: `${process.env.PUBLICKEY}`,
//                 });


//                 res.status(200).json({ message: "Reward token sent" })

//             }



//         } else {
//             res.status(200).json({ message: "No balance to send" })
//         }

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }


// const getPairs = async(req, res, next) => {
//     try {
//         const stats = await query(
//             `SELECT * FROM swapstats WHERE swapstats_id = 1`, []
//         ).catch((err) => {
//             throw Error(err.message)
//         });


//         res.status(200).json({ status: 200, data: stats })

//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const getSinglePair = async(req, res, next) => {
//     const address = req.params.address

//     try {
//         const _fee = await query(
//             `SELECT * FROM admin WHERE admin_id = 1`, []
//         ).catch((err) => {
//             throw Error(err.message)
//         });

//         const venomPrice = _fee[0].venom
//         let pair = await query(`SELECT * FROM pair where address = ?`, [address]).catch((err) => {
//             throw Error(err.message)
//         });

//         if (pair[0].length == 0) {
//             throw new Error("Pair not found")
//         }

//         let valueLocked;
//         if (pair[0].symbolA.toLowerCase().includes("venom") || pair[0].symbolA.toLowerCase().includes("usd")) {
//             if (pair[0].symbolA.toLowerCase().includes("usd")) {
//                 valueLocked = pair[0].reserveA * 2
//             } else {
//                 valueLocked = pair[0].reserveA * 2 * venomPrice
//             }
//         } else if (pair[0].symbolB.toLowerCase().includes("venom") || pair[0].symbolB.toLowerCase().includes("usd")) {
//             if (pair[0].symbolB.toLowerCase().includes("usd")) {
//                 valueLocked = pair[0].reserveB * 2
//             } else {
//                 valueLocked = pair[0].reserveB * 2 * venomPrice
//             }
//         } else {
//             valueLocked = 0
//         }


//         //24hrs trading volume
//         const twentyFour = await new Promise(async(resolve, reject) => {
//             try {
//                 let volume = 0;

//                 const history = await query(`SELECT * FROM history where ((tokenIn = ? AND tokenOut = ?) OR (tokenIn = ? AND tokenOut = ?)) AND TIMESTAMPDIFF(HOUR, date, CURRENT_TIMESTAMP()) <= ? `, [pair[0].tokenB, pair[0].tokenA, pair[0].tokenA, pair[0].tokenB, 24])
//                 if (history.length == 0) {
//                     resolve(0)
//                 }
//                 for (let i = 0; i < history.length; i++) {
//                     const element = history[i];
//                     if (element.tokenInSym.toLowerCase().includes("usd") || element.tokenInSym.toLowerCase().includes("venom")) {
//                         //tokenIn is the stable token
//                         if (element.tokenInSym.toLowerCase().includes("wvenom")) {
//                             volume += element.amountIn * element.venom
//                         } else {
//                             volume += element.amountIn
//                         }
//                     } else {
//                         if (element.tokenOutSym.toLowerCase().includes("wvenom")) {
//                             volume += element.amountOutWithFee * element.venom
//                         } else {
//                             volume += element.amountOutWithFee

//                         }
//                     }

//                     if (history.length - 1 == i) {
//                         resolve(volume)
//                     }

//                 }

//             } catch (error) {
//                 reject(new Error(error.message))
//             }
//         }).catch((err) => {
//             next(createError(422, err.message));
//             return;
//         })



//         //7days trading volume
//         const oneWeek = await new Promise(async(resolve, reject) => {
//             try {
//                 let volume = 0;

//                 const history = await query(`SELECT * FROM history where ((tokenIn = ? AND tokenOut = ?) OR (tokenIn = ? AND tokenOut = ?)) AND TIMESTAMPDIFF(HOUR, date, CURRENT_TIMESTAMP()) <= ? `, [pair[0].tokenB, pair[0].tokenA, pair[0].tokenA, pair[0].tokenB, 168])
//                 if (history.length == 0) {
//                     resolve(0)
//                 }
//                 for (let i = 0; i < history.length; i++) {
//                     const element = history[i];
//                     if (element.tokenInSym.toLowerCase().includes("usd") || element.tokenInSym.toLowerCase().includes("venom")) {
//                         //tokenIn is the stable token
//                         if (element.tokenInSym.toLowerCase().includes("wvenom")) {
//                             volume += element.amountIn * element.venom
//                         } else {
//                             volume += element.amountIn
//                         }
//                     } else {
//                         if (element.tokenOutSym.toLowerCase().includes("wvenom")) {
//                             volume += element.amountOutWithFee * element.venom
//                         } else {
//                             volume += element.amountOutWithFee

//                         }
//                     }

//                     if (history.length - 1 == i) {
//                         resolve(volume)
//                     }

//                 }

//             } catch (error) {
//                 reject(new Error(error.message))
//             }
//         }).catch((err) => {
//             next(createError(422, err.message));
//             return;
//         })

//         //history
//         const history = await query(`SELECT tokenInSym, tokenOutSym, amountIn, amountOutWithFee, tx, date FROM history where (tokenIn = ? AND tokenOut = ?) OR (tokenIn = ? AND tokenOut = ?)`, [pair[0].tokenB, pair[0].tokenA, pair[0].tokenA, pair[0].tokenB])
//             //top traders
//         const topTraiders = await new Promise(async(resolve, reject) => {
//             try {

//                 const history = await query(`SELECT * FROM history where ((tokenIn = ? AND tokenOut = ?) OR (tokenIn = ? AND tokenOut = ?)) AND TIMESTAMPDIFF(HOUR, date, CURRENT_TIMESTAMP()) <= ? `, [pair[0].tokenB, pair[0].tokenA, pair[0].tokenA, pair[0].tokenB, 120])
//                 if (history.length == 0) {
//                     resolve({})
//                 }
//                 let volume = {};
//                 for (let i = 0; i < history.length; i++) {
//                     const element = history[i];
//                     if (element.tokenInSym.toLowerCase().includes("usd") || element.tokenInSym.toLowerCase().includes("venom")) {
//                         //tokenA is the stable token
//                         if (element.tokenInSym.toLowerCase().includes("wvenom")) {

//                             volume[element.user] = volume[element.user] ? volume[element.user] += (element.amountIn * element.venom) : volume[element.user] = element.amountIn * element.venom

//                         } else {
//                             volume[element.user] = volume[element.user] ? volume[element.user] += element.amountIn : volume[element.user] = element.amountIn
//                         }
//                     } else if (element.tokenOutSym.toLowerCase().includes("usd") || element.tokenOutSym.toLowerCase().includes("venom")) {
//                         if (element.tokenOutSym.toLowerCase().includes("wvenom")) {
//                             volume[element.user] = volume[element.user] ? volume[element.user] += (element.amountOutWithFee * element.venom) : volume[element.user] = element.amountOutWithFee * element.venom
//                         } else {
//                             volume[element.user] = volume[element.user] ? volume[element.user] += element.amountOutWithFee : volume[element.user] = element.amountOutWithFee
//                         }
//                     } else {
//                         volume[element.user] = volume[element.user] ? volume[element.user] : 0
//                     }


//                     if (history.length - 1 == i) {
//                         resolve(volume)
//                     }

//                 }

//             } catch (error) {
//                 reject(new Error(error.message))
//             }
//         }).catch((err) => {
//             next(createError(422, err.message));
//             return;
//         })

//         pair[0].valueLocked = valueLocked
//         pair[0].twentyFour = twentyFour
//         pair[0].oneWeek = oneWeek
//         pair[0].history = history

//         let newTraders = []


//         for (const key in topTraiders) {
//             const obj = {}
//             obj.user = key
//             obj.volume = topTraiders[key]
//             newTraders.push(obj)
//         }
//         const sort = newTraders.sort((a, b) => {
//             return b.volume - a.volume
//         })

//         pair[0].topTraiders = sort.length > 10 ? sort.splice(0, 10) : sort

//         res.status(200).json({ status: 200, data: pair[0] })


//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }
// }

// const getHomeStats = async(req, res, next) => {
//     try {

//         const _fee = await query(
//             `SELECT * FROM admin WHERE admin_id = 1`, []
//         ).catch((err) => {
//             throw Error(err.message)
//         });

//         const venomPrice = _fee[0].venom
//         let pair = await query(`SELECT * FROM pair where tokenA IN (?,?,?) OR tokenB IN (?,?,?)`, [WVENOM, USDT, USDC, WVENOM, USDT, USDC]).catch((err) => {
//             throw Error(err.message)
//         });

//         const tswap = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(history_id) as num FROM history`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const allTimeTVL = await new Promise(async(resolve, reject) => {
//             try {
//                 let volume = 0;

//                 for (let i = 0; i < pair.length; i++) {
//                     const element = pair[i];

//                     if (element.symbolA.toLowerCase().includes("usd") || element.symbolA.toLowerCase().includes("venom")) {
//                         //tokenIn is the stable token
//                         if (element.symbolA.toLowerCase().includes("wvenom")) {
//                             volume += element.reserveA * venomPrice
//                         } else {
//                             volume += element.reserveA
//                         }
//                     } else {
//                         if (element.symbolB.toLowerCase().includes("wvenom")) {
//                             volume += element.reserveB * venomPrice

//                         } else {
//                             volume += element.reserveB

//                         }
//                     }


//                     if (pair.length - 1 == i) {
//                         resolve(volume)
//                     }

//                 }

//             } catch (error) {
//                 reject(new Error(error.message))
//             }
//         }).catch((err) => {
//             next(createError(422, err.message));
//             return;
//         })

//         const tsale = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(sales_id) as num FROM sales`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const rsale = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT sum(raised) as num FROM sales`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const tpool = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(pool_id) as num FROM pools`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const rpool = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT sum(amountStaked) as num FROM pools`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const tnpool = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(pool_id) as num FROM nftpool`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const rnpool = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT sum(amountStaked) as num FROM nftpool`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const tlock = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(locker_id) as num FROM locker`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const rlock = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT sum(amount) as num FROM lock_list`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const tok = await new Promise(async(resolve, reject) => {
//             const hist = await query(`SELECT count(token_id) as num FROM token`, []).catch((err) => {
//                 throw Error(err.message)
//             });
//             resolve(hist)
//         })

//         const data = {}

//         data.totalSwap = tswap[0].num
//         data.tvl = allTimeTVL
//         data.totalSale = tsale[0].num
//         data.raisedSale = rsale[0].num * venomPrice
//         data.totalPool = tpool[0].num
//         data.amountPool = rpool[0].num
//         data.totalnPool = tnpool[0].num
//         data.amountnPool = rnpool[0].num
//         data.totalLock = tlock[0].num
//         data.amountLock = rlock[0].num
//         data.tokenCreated = tok[0].num

//         res.status(200).json({ status: 200, data: data })



//     } catch (error) {
//         next(createError(422, error.message));
//         return;
//     }

// }


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
                }, 25000);
            }

        }, 5000);

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