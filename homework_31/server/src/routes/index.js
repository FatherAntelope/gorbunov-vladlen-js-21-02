import Router from "express";
import userRouter from "./textRouter.js";

const routes = new Router();
routes.use('', userRouter);

export default routes;
