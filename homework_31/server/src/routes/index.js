import Router from "express";
import textRouter from "./textRouter.js";
import httpStatuses from "../constants/httpStatuses.js";

const routes = new Router();
routes.use('', textRouter);

routes.all('*', (req, res) => {
  res.json({
    status: httpStatuses.NOT_FOUND,
    message: 'Not found'
  });
});

export default routes;
