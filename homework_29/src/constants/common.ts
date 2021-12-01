import logo from '../images/logo.jpg';

const APPLICATION_NAME: string = 'Delta World';
const APPLICATION_COPYRIGHT_SYMBOL: string = '©';
const APPLICATION_YEAR_FOUNDATION: string = '1970';
const APPLICATION_YEAR_CURRENT: string = new Date().getFullYear().toString();
const APPLICATION_LOGO: string = logo;
const COOKIE_LIFETIME: number = 608800;
const MAXIMUM_DATE = new Date(new Date().setFullYear(new Date().getFullYear() - 16));
const EMPTY_STRING: '' = '';

const LOADING_EMULATION_TIME: number = 200;

const FORM_LIMIT_USERS: number = 6;
const FORM_LIMIT_POSTS: number = 6;
const FORM_LIMIT_USER_POSTS: number = 6;
const FORM_LIMIT_POST_COMMENTS: number = 6;

export enum ModalID {
  POSTS = 'selectPost',
  POSTS_USER = 'selectPostUser',
  UPDATE_USER = 'openUpdateUser'
}

export {
  APPLICATION_NAME, APPLICATION_COPYRIGHT_SYMBOL, APPLICATION_YEAR_CURRENT, APPLICATION_YEAR_FOUNDATION,
  APPLICATION_LOGO, LOADING_EMULATION_TIME, FORM_LIMIT_USERS, FORM_LIMIT_POSTS, FORM_LIMIT_USER_POSTS,
  COOKIE_LIFETIME, EMPTY_STRING, MAXIMUM_DATE, FORM_LIMIT_POST_COMMENTS
};
