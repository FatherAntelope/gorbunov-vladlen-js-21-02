import Router, { Express } from 'express';
import HttpStatuses from '../constants/httpStatuses';
import userRouter from './userRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';

const routes: Express = Router();

routes.use('', userRouter);
routes.use('', postRouter);
routes.use('', commentRouter);

routes.use('*', (req, res) => {
  res.status(HttpStatuses.NOT_FOUND).json({
    status: HttpStatuses.NOT_FOUND,
    error: { message: 'End point not found' }
  });
});

export default routes;
