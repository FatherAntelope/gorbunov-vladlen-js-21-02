import React from 'react';
import './Pagenator.css';
import Page from './page/Page';

interface IProps {
  themeDark?: boolean;
  countPages: number;
  selectPage: (currentPage: number) => void;
}

interface IState {
  currentPage: number;
  pages: number[];
}

class Pagenator extends React.Component<IProps, IState> {
  // eslint-disable-next-line react/sort-comp
  private pagesArr: number[];

  constructor(props: IProps) {
    super(props);
    this.pagesArr = [];
    this.state = {
      currentPage: 0,
      pages: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(): void {
    for (let i = 0; i < this.props.countPages; i += 1) {
      this.pagesArr.push(i);
    }
    this.setState({ pages: this.pagesArr });
    this.pagesArr = [];
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (prevProps.countPages !== this.props.countPages) {
      for (let i = 0; i < this.props.countPages; i += 1) {
        this.pagesArr.push(i);
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ pages: this.pagesArr, currentPage: 0 });
      this.pagesArr = [];
    }
  }

  handleClick(e: React.BaseSyntheticEvent): void {
    if (Number(e.target.dataset.page || this.state.currentPage) !== this.state.currentPage) {
      this.setState({ currentPage: Number(e.target.dataset.page || this.state.currentPage) });
      this.props.selectPage(e.target.dataset.page);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="pagenator" onClick={this.handleClick}>
        {
          this.state.pages.map((item) => (
            <Page
              themePageDark={this.props.themeDark}
              pageNum={item}
              isActive={item === this.state.currentPage}
              key={item}
            />
          ))
        }
      </div>
    );
  }
}

export default Pagenator;
