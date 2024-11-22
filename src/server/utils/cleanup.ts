import { Server } from "http";
import { Connection } from "mongoose";

/**
 * @param {Server} server
 * @param {Connection} dbConnection
 */

export const cleanUp = (server: Server, dbConnection: Connection) => {
  server.close();
  dbConnection.close();
  process.exit(1);
};
