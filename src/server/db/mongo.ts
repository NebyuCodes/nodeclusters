import mongoose, { connect, Connection } from "mongoose";
import { configs } from "../../configs";

/**
 * @param {}
 * @returns {Connection}
 */

export const mongoBootstrap = (): Connection => {
  connect(configs.db.remote)
    .then(() => {
      console.log("MongoDB is successfully connected...");
    })
    .catch((error) => {
      console.error("MongoDB connection Error.");
      console.error(error);
    });

  return mongoose.connection;
};
