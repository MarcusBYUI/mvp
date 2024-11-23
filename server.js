const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");
const Routes = require("./routes");

const dotenv = require("dotenv");

dotenv.config();


//init express and middlewares
const app = express();
app.use(bodyParser.json());



//start Cron Job
//initCronJobs();

app.get("/", async(req, res, next) => {
    res.status(200).send("ok");
});

const whitelist = [
    "https://impulsefinance.org",
    "https://www.impulsefinance.org",
    "https://mini.impulsefinance.org",
    "http://localhost:5173",
    "https://localhost:5173",
    "http://192.168.1.41:5173",
    "https://impulsefinance.xyz",
    "https://www.impulsefinance.xyz",
    "https://frontend.d24dw7srx6g7eo.amplifyapp.com"
];
const corsOptions = {
    origin: function(origin, callback) {
       
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log(origin)
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3002;

//passport
app.enable("trust proxy");



//routes
app.use("/", Routes);

const server = http.createServer(app);


server.listen(PORT);
console.log(`Listening on ${PORT}`);