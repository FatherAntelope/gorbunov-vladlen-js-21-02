import React from 'react';
import './ToDoTask.css';

type Task = {
  text: string,
  done: boolean
};

interface Props {
  task: Task;
  doneTask: () => void;
  removeTask: () => void;
}

class ToDoTask extends React.Component<Props> {
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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <span onClick={this.props.removeTask} className="todo-task__link">Удалить</span>
        </div>
      </div>
    );
  }
}

export default ToDoTask;
