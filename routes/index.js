const route = require("express").Router();
const createError = require("http-errors");
const swapRoute = require("./swap/swap");
const tokenRoute = require("./token/token")


//token
route.use("/token", tokenRoute);

// //swap
route.use("/swap", swapRoute);

//404 error handler
route.use((req, res, next) => {
    next(createError.NotFound("Not Found"));
});

//error handler
route.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    if (!res.headersSent) { 
        res.send({
            error: {
                status: err.status || 500,
                message: err.message,
            },
        });
    } else {
        console.log(err.message);
    }

});

module.exports = route;