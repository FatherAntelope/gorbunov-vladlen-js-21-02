import express, { Express, NextFunction, Request, Response } from 'express';
import { getServerConfigs, IHttpHeader } from './utils/configServer';
import { v4 as generateUUID } from 'uuid';
import routes from './routes';
import logger from './logger';
const context = require('request-context');
const { httpHeaders } = getServerConfigs();

const app: Express = express();

app
  .use(express.json({limit: '20mb'}))
  .use(context.middleware('request'))
  .use((req: Request, res: Response, next: NextFunction) => {
    context.set('uuid', generateUUID());
    res.type('application/json');
    httpHeaders.forEach((httpHeader: IHttpHeader) => res.set(httpHeader.option, httpHeader.value));
    next();
  });
app.use('/api', routes);

app.use((err: any , req: Request, res: Response, next: NextFunction) => {
  logger.fatal(err)
  res.status(500).send(err.toString())
  next()
})

export default app;
