import Router from 'express';
import UserController from '../controllers/UserController';
const userRouter = Router();

userRouter.get('/user', UserController.getUsers);
userRouter.get('/user/:id', UserController.getUser);
userRouter.get('/user/:id/login', UserController.loginUser);
userRouter.post('/user/create', UserController.createUser);
userRouter.put('/user/:id', UserController.updateUser);

export default userRouter;
