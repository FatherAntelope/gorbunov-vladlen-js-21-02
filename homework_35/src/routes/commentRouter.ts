import Router from 'express';
import CommentController from '../controllers/CommentController';
const commentRouter = Router();

commentRouter.get('/post/:id/comment', CommentController.getCommentsByPost);

export default commentRouter;
