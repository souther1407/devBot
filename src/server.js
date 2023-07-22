import express from "express";
import cors from "cors";
import morgan from "morgan";
import initRoutes from "./routes/index.js";
const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
initRoutes(server);

export default server;
