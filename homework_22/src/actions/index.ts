import * as UsersAC from './usersAction';
import * as PagenatorAC from './pagenatorAction';
import * as ThemeCheckboxAC from './themeCheckboxAction';
import * as SelectorAC from './selectorAction';
import * as UserAC from './userAction';

export default {
  ...UsersAC,
  ...PagenatorAC,
  ...ThemeCheckboxAC,
  ...SelectorAC,
  ...UserAC
};
