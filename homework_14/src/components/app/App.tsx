import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Segment from '../segment/Segment';
import ToDoForm from '../todo/todo-form/ToDoForm';
import ToDoTask from '../todo/todo-task/ToDoTask';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <Segment>
            <ToDoForm />
            <ToDoTask />
            <ToDoTask />
            <ToDoTask />
          </Segment>
        </Wrapper>
      </div>
    );
  }
}

export default App;
