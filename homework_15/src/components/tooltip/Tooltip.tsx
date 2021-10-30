import React from 'react';
import './Tooltip.css';

interface IProps {
  children: React.ReactNode;
  textInfo: string;
  themeDark?: boolean;
}

interface IState {
  hovered: boolean;
}

const initialState = {
  hovered: false
};

class Tooltip extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = initialState;
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver(e: React.SyntheticEvent) {
    this.setState({ hovered: true });
    e.stopPropagation();
  }

  mouseOut(e: React.SyntheticEvent) {
    this.setState({ hovered: false });
    e.stopPropagation();
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <div className="tooltip" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {
          this.state.hovered && (
            <div className={`tooltip__info ${this.props.themeDark ? 'tooltip__info_theme_dark' : ''}`}>
              {this.props.textInfo}
            </div>
          )
        }
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;
