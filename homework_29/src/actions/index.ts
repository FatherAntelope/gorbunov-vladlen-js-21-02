import * as UsersFormAC from './usersFormAction';
import * as PostsFormAC from './postsFormAction';
import * as UserFullFormAC from './userFullFormAction';
import * as UserPostsFormAC from './userPostsAction';
import * as LoginUserFormAC from './loginUserFormAction';
import * as RegisterUserFormAC from './sendUserFormAction';
import * as ModalsFormAC from './modalsFormAction';
import * as PostCommentsFormAC from './postCommentsAction';
import * as PostFormAC from './postFormAction';
import * as BurgerHeaderAC from './burgerHeaderAction';
import * as ImageEditFormAC from './imageEditFormAction';

export default {
  ...UsersFormAC,
  ...PostsFormAC,
  ...UserFullFormAC,
  ...UserPostsFormAC,
  ...LoginUserFormAC,
  ...RegisterUserFormAC,
  ...ModalsFormAC,
  ...PostCommentsFormAC,
  ...PostFormAC,
  ...BurgerHeaderAC,
  ...ImageEditFormAC
};
