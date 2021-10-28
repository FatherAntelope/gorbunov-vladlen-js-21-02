import React from 'react';
import './ToDoForm.css';

type Task = {
  id: number,
  text: string,
  done: boolean
};

interface Props {
  addTask: (task: Task[]) => void;
}

interface State {
  input: string
}

class ToDoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { input: '' };
  }

  // eslint-disable-next-line react/sort-comp
  addTask = (e: any): void => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const { input } : any = this.state;
    if (input) {
      this.props.addTask(input);
      this.setState({ input: '' });
    }
    e.preventDefault();
  };

  handlerChange = (e: any) => {
    this.setState({ input: e.target.value });
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
