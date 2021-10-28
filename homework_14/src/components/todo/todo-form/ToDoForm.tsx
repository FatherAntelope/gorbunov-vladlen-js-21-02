import React from 'react';
import './ToDoForm.css';

class ToDoForm extends React.Component {
  render() {
    return (
      <form className="todo-form" action="#" method="post">
        <div className="todo-form__field">
          <input className="todo-form__input" type="text" />
          <button className="todo-form__button" type="submit">Добавить</button>
        </div>
      </form>
    );
  }
}

export default ToDoForm;
