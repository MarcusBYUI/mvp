const { 
    getTokenList,
    searchToken,
    getPairStatus,
    quote,
    confirmTx,
    getPairList,
    getPairByAddress,
    getLpBalance
 } = require("../../controller/swap/swap")
const routes = require("express").Router();

routes.post("/tokenlist", getTokenList)
routes.post("/searchtoken", searchToken)
routes.post("/pairinfo", getPairStatus)
routes.post("/quote", quote)
routes.post("/confirm", confirmTx)
routes.post("/pairbyid", getPairByAddress)
routes.post("/lpbalance", getLpBalance)


routes.get("/pairlist", getPairList)
 
// routes.post("/", quote);
// routes.get("/", getHomeStats);
// routes.post("/token", getToken);
// routes.post("/check", checkPairSingle);
// routes.post("/create", createPair);
// routes.post("/activate", createSingle);
// routes.post("/liq", liqQuote);
// routes.post("/psingle", getPairAndSingle);
// routes.post("/liqout", getLiqOut);
// routes.get("/history/:address", getHistory);
// routes.get("/reward/:address", getImpulseReward);
// routes.get("/claim/:address", claimImpulseReward);
// routes.get("/pairs", getPairs);
// routes.get("/pairs/:address", getSinglePair);

module.exports = routes;