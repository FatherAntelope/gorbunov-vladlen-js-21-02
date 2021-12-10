import { combineReducers } from 'redux';
import usersFormReducer from './usersFormReducer';
import postsFormReducer from './postsFormReducer';
import userFullFormReducer from './userFullFormReducer';
import userPostsFormReducer from './userPostsFormReducer';
import loginUserFormReducer from './loginUserFormReducer';
import sendUserFormReducer from './sendUserFormReducer';
import postCommentsReducer from './postCommentsReducer';
import postFormReducer from './postFormReducer';
import modalsFormReducer from './modalsFormReducer';
import burgerHeaderReducer from './burgerHeaderReducer';
import imageEditFormReducer from './imageEditFormReducer';

export const rootReducer = combineReducers({
  usersForm: usersFormReducer,
  postsForm: postsFormReducer,
  userFullForm: userFullFormReducer,
  userPostsForm: userPostsFormReducer,
  loginUserForm: loginUserFormReducer,
  sendUserForm: sendUserFormReducer,
  modalsForm: modalsFormReducer,
  postCommentsForm: postCommentsReducer,
  postForm: postFormReducer,
  burgerHeader: burgerHeaderReducer,
  imageEditForm: imageEditFormReducer
});

export type RootState = ReturnType<typeof rootReducer>;
