import { createServer } from "http";
import { app } from "./app";
import { mongoBootstrap } from "./db";
import { cpus } from "os";
import cluster from "cluster";
import { configs } from "../configs";
import { handlErrors } from "./utils";
import { graceFullShutDown } from "./utils/graceFullShutdown";

/**
 * @param {}
 * @return {}
 */

export const serverBootstrap = () => {
  // CPUs
  const numCpus = cpus().length;

  // Fork child processes
  if (cluster.isPrimary && configs.clustering === "true") {
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker with PID ${worker.process.pid} died.`);
      console.log(code);
      console.log(signal);
      cluster.fork();
    });
  } else {
    // Create server
    const server = createServer(app);

    // Listen on a specific port
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Listening on ${port}...`);
    });

    // Connected to the max default connection pool
    const dbConnection = mongoBootstrap();

    // Handle global errors
    handlErrors(server, dbConnection);

    // Gracefull shutdown
    graceFullShutDown(server, dbConnection);
  }
};
