import React from 'react';
import './ToDoTask.css';

type ITask = {
  text: string,
  done: boolean
};

interface IProps {
  task: ITask;
  doneTask: () => void;
  removeTask: () => void;
}

class ToDoTask extends React.Component<IProps> {
  render() {
    return (
      <div className="todo-task">
        <div className="todo-task__info">
          <div
            onClick={this.props.doneTask}
            className={`todo-task__check ${this.props.task.done && 'todo-task__check_active'} `}
          />
          <span className={`todo-task__text ${this.props.task.done && 'todo-task__text_check_active'}`}>
            {this.props.task.text}
          </span>
        </div>
        <div className="todo-task__trash">
          <span onClick={this.props.removeTask} className="todo-task__link">Удалить</span>
        </div>
      </div>
    );
  }
}

export default ToDoTask;
