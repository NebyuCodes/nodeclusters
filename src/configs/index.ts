import { config } from "dotenv";
config();

export const configs = {
  env: <string>process.env.NODE_ENV,
  clustering: <string>process.env.CLUSTERING,
  db: {
    remote: <string>process.env.DB_REMOTE,
  },
};
