import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https"; 


// SoftUni server emitter (this must also be ESM-compatible)
import server from "./server/server.js";

setGlobalOptions({ maxInstances: 1 });

export const serverFn = onRequest((req, res) => {
  server.emit("request", req, res);
});

