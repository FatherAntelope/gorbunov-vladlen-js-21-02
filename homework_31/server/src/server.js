import express from 'express';
import serverConfig from "../config/serverConfig.js";
import fileLog from "./logger.js";
import context from "request-context";
import { v4 as generateUUID } from 'uuid';
import routes from "./routes/index.js";

const app = express();

app.use(express.json()).use(context.middleware('request'));
app.use((req, res, next) => {
  context.set('uuid', generateUUID());
  res.type('text/plain')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    .set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', routes);

app.listen(serverConfig.port, serverConfig.host, () => {
  const message = `Server started on ${serverConfig.host}:${serverConfig.port}`;
  console.log(message);
  fileLog.message(message);
});

process.on('SIGINT', () => {
  const message = 'Server is turned off';
  console.log(message);
  fileLog.message(message);
});
