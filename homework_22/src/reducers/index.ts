import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import pagenatorReducer from './pagenatorReducer';
import themeCheckboxReducer from './themeCheckboxReducer';
import selectorReducer from './selectorReducer';
import userReducer from './userReducer';

export const rootReducer = combineReducers({
  users: usersReducer,
  pagenator: pagenatorReducer,
  themeCheckbox: themeCheckboxReducer,
  selector: selectorReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
