export interface IThemeCheckboxState {
  isDarkTheme: boolean
}

export enum IThemeCheckBoxACTypes {
  TOGGLE_THEME = 'THEME_CHECKBOX/TOGGLE_THEME'
}

interface IToggleThemeAC {
  type: IThemeCheckBoxACTypes.TOGGLE_THEME,
  payload: boolean
}

export type ThemeCheckboxAC = IToggleThemeAC;
