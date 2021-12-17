import Router from 'express';
import PostController from '../controllers/PostController';
const postRouter = Router();

postRouter.get('/post', PostController.getPosts);
postRouter.get('/post/:id', PostController.getPost);
postRouter.get('/user/:id/post', PostController.getPostsByUser);

export default postRouter;
