import Router from "express";
import TextController from "../controllers/TextController.js";
const textRouter = new Router();

textRouter.get('/text', TextController.get);
textRouter.post('/text', TextController.set);

export default textRouter;
