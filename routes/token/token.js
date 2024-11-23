const routes = require("express").Router();
const {
    getToken
} = require("../../controller/token/token");


routes.post("/", getToken);

 
module.exports = routes;