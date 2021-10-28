import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Segment from '../segment/Segment';
import ToDoForm from '../todo/todo-form/ToDoForm';
import ToDoTask from '../todo/todo-task/ToDoTask';

interface Props {
  [key: string] : string
}

interface Task {
  id: number,
  text: string,
  done: boolean
}

interface State {
  tasks: Task[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [
        { id: 0, text: 'Задача 1', done: false },
        { id: 1, text: 'Задача 2', done: false },
        { id: 2, text: 'Задача 3', done: false }
      ]
    };
  }

  doneTask = (id: number): void => {
    const index: number = this.state.tasks.map((item) => item.id).indexOf(id);
    const status: boolean = !this.state.tasks[index].done;

    this.setState((state: any) => {
      const { tasks } = state;
      tasks[index].done = status;
      return tasks;
    });
  };

  removeTask = (id: number): void => {
    const index: number = this.state.tasks.map((item) => item.id).indexOf(id);
    delete this.state.tasks[index];
    this.setState({ tasks: this.state.tasks });
  };

  addTask = (task: string) : void => {
    const { length } = this.state.tasks;
    this.state.tasks.push({ id: length !== 0 ? length : 0, text: task, done: false });
    this.setState({ tasks: this.state.tasks });
  };

  render() {
    const { tasks } = this.state;
    const doneTask = tasks.filter((item) => item.done);
    const notDoneTask = tasks.filter((item) => !item.done);

    return (
      <div className="App">
        <Wrapper>
          <Segment>
            <ToDoForm addTask={this.addTask} />
            {
              [...notDoneTask, ...doneTask].map((item) => (
                <ToDoTask
                  removeTask={() => this.removeTask(item.id)}
                  doneTask={() => this.doneTask(item.id)}
                  task={item}
                  key={item.id}
                />
              ))
            }
          </Segment>
        </Wrapper>
      </div>
    );
  }
}

export default App;
