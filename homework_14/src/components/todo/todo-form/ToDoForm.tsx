import React from 'react';
import './ToDoForm.css';

interface IProps {
  addTask: (task: string) => void;
}

interface IState {
  input: string
}

class ToDoForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { input: '' };
  }

  handlerChange = (e: any) => {
    this.setState({ input: e.target.value });
  };

  addTask = (e: any): void => {
    const { input } : any = this.state;
    if (input) {
      this.props.addTask(input);
      this.setState({ input: '' });
    }
    e.preventDefault();
  };

  render() {
    const { input } : any = this.state;
    return (
      <form onSubmit={this.addTask} className="todo-form" action="#">
        <div className="todo-form__field">
          <input onChange={this.handlerChange} value={input} className="todo-form__input" type="text" />
          <button className="todo-form__button" type="submit">Добавить</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
