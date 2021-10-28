import React from 'react';
import './ToDoTask.css';

class ToDoTask extends React.Component {
  render() {
    return (
      <div className="todo-task">
        <div className="todo-task__info">
          <div className="todo-task__check todo-task__check_active" />
          <input
            type="text"
            className="todo-task__text todo-task__text_disabled todo-task__text_check_active"
            defaultValue="Задача"
            disabled
          />
        </div>
        <div className="todo-task__trash">
          <a className="todo-task__link" href="/">Удалить</a>
        </div>
      </div>
    );
  }
}

export default ToDoTask;
