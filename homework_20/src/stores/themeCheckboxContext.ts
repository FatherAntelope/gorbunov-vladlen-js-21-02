import { EventEmitter } from 'events';
import { DEFAULT_FUNCTION, TOGGLE_THEME } from '../constants/actions';
import dispatcher from '../dispatcher';
import { IToggleThemeAction } from '../types/actions';

class ThemeCheckboxContextStore extends EventEmitter {
  private stateIsDarkTheme;

  constructor() {
    super();
    this.stateIsDarkTheme = false as boolean;
    this.getStateIsDarkTheme = this.getStateIsDarkTheme.bind(this);
  }

  public readonly getStateIsDarkTheme = (): boolean => this.stateIsDarkTheme;

  public handleActionToggleTheme(action: IToggleThemeAction): void {
    switch (action.type) {
      case TOGGLE_THEME:
        this.stateIsDarkTheme = action.payload;
        this.emit('change');
        break;
      default: DEFAULT_FUNCTION();
    }
  }
}

const themeCheckboxContextStore = new ThemeCheckboxContextStore();
dispatcher.register(themeCheckboxContextStore.handleActionToggleTheme.bind(themeCheckboxContextStore));

export default themeCheckboxContextStore;
