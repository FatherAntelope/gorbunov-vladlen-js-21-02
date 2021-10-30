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
  constructor(props: IProps) {
    super(props);

    const pages: number[] = [];
    for (let i = 0; i < this.props.countPages; i += 1) {
      pages.push(i);
    }

    this.state = {
      currentPage: 0,
      pages
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.BaseSyntheticEvent) {
    this.setState({ currentPage: Number(e.target.dataset.page || this.state.currentPage) });
    this.props.selectPage(e.target.dataset.page);
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
