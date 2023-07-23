import express from "express";
import cors from "cors";
import morgan from "morgan";
import initRoutes from "./routes/index.js";
const server = express();
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
initRoutes(server);

export default server;
