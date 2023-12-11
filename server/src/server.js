const express = require("express");
const server = express();
const morgan = require("morgan");
const { router } = require("./routes/index");
const cors = require("cors");

/* Middlewares */
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
