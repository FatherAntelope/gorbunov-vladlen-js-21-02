import { EventEmitter } from 'events';
import { DEFAULT_FUNCTION, SELECT_PAGE, SET_COUNT_PAGES } from '../constants/actions';
import dispatcher from '../dispatcher';
import { ISelectPage, ISetCountPages } from '../types/actions';

class PagenatorStore extends EventEmitter {
  private stateSelectPage;

  private stateCountPages;

  constructor() {
    super();
    this.stateSelectPage = 0 as number;
    this.stateCountPages = 0 as number;
    this.getStateSelectPage = this.getStateSelectPage.bind(this);
  }

  public readonly getStateSelectPage = (): number => this.stateSelectPage;

  public readonly getStateCountPages = (): number => this.stateCountPages;

  handleActionSelectPage(action: ISelectPage) {
    switch (action.type) {
      case SELECT_PAGE:
        this.stateSelectPage = action.payload;
        this.emit('change');
        break;
      default: DEFAULT_FUNCTION();
    }
  }

  handleActionSetCountPages(action: ISetCountPages) {
    switch (action.type) {
      case SET_COUNT_PAGES:
        this.stateCountPages = action.payload;
        this.emit('change');
        break;
      default: DEFAULT_FUNCTION();
    }
  }
}

const pagenatorStore = new PagenatorStore();
dispatcher.register(pagenatorStore.handleActionSelectPage.bind(pagenatorStore));
dispatcher.register(pagenatorStore.handleActionSetCountPages.bind(pagenatorStore));

export default pagenatorStore;
