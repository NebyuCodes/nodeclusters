import { Server } from "http";
import { Connection } from "mongoose";

/**
 * @param {Server} server
 * @param {Connection} dbConnection
 * @returns {}
 */

import { handlErrors } from "./handleErrors";

export const graceFullShutDown = (server: Server, dbConnection: Connection) => {
  process.on("SIGINT", () => {
    handlErrors(server, dbConnection);
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    handlErrors(server, dbConnection);
    process.exit(0);
  });
};
