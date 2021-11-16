import * as UsersAC from './usersAction';
import * as PagenatorAC from './pagenatorAction';
import * as ThemeCheckboxAC from './themeCheckboxAction';
import * as SelectorAC from './selectorAction';

export default {
  ...UsersAC,
  ...PagenatorAC,
  ...ThemeCheckboxAC,
  ...SelectorAC
};
