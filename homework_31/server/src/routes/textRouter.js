import Router from "express";
import TextController from "../controllers/TextController.js";
const userRouter = new Router();

userRouter.get('/text');
userRouter.post('/text', TextController.set);

export default userRouter;
