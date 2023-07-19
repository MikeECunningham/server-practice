import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as basicAuth from "express-basic-auth";
import https from "https";
import fs from "fs";
import * as db from "./queries";
import config from "./config";
import { connectDB } from "./db/ormConfig";
import displayHome from "./endpoints/displayHome";
import getUsers from "./endpoints/unprotected/getUsers";
import getUserById from "./endpoints/unprotected/getUserById";
import updateUser from "./endpoints/protected/updateUser";
import createUser from "./endpoints/unprotected/createUser";
import deleteUser from "./endpoints/protected/deleteUser";
import authenticate from "./middlewares/basicAuth";

let db_res = db.init();
if (!db_res) {
  throw "DB init returned falsey: " + db_res;
}

const app: Express = express();
const port = config.port;

// const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  // origin: allowedOrigins
};
app.use(cors(options));

app.get("*", bodyParser.urlencoded({extended: false, limit: config.urlEncodedMax}));
app.post("*", bodyParser.json({limit: config.bodyParserMax}));
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) { return res.send({ failure: "Invalid JSON" }); } else { next(); }
});

app.get("/", displayHome);
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);

app.use(authenticate);
app.put("/auth/users/:id", updateUser);
app.delete("/auth/users/:id", deleteUser);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});