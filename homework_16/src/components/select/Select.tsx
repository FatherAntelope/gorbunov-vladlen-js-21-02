import React from 'react';
import './Select.css';

interface IProps {
  selectorValues: number[];
  limit: number;
  countUsers: number;
  selectLimit: (currentPage: number, countPages: number) => void;
}

interface IState {
  currentLimit: number
}

class Select extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      currentLimit: this.props.limit
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.BaseSyntheticEvent) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ currentLimit: Number(e.target.value) });
    this.props.selectLimit(Number(e.target.value), this.props.countUsers / Number(e.target.value));
    e.preventDefault();
  }

  render() {
    return (
      <select className="select" onChange={this.handleChange}>
        {
          this.props.selectorValues.map((item: number, index: number) => (
            <option
              value={item}
              key={index}
            >
              {item}
            </option>
          ))
         }
      </select>
    );
  }
}

export default Select;
