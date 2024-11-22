import { Server } from "http";
import { Connection } from "mongoose";
import { cleanUp } from "./cleanup";

/**
 * @param {Server} server
 * @param {Connection} dbConnection
 */

export const handlErrors = (server: Server, dbConnection: Connection) => {
  process.on("uncaughtException", (error) => {
    console.error("Uncaught error");
    console.log(error);
    cleanUp(server, dbConnection);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled rejection");
    console.log(reason);
    cleanUp(server, dbConnection);
  });
};
