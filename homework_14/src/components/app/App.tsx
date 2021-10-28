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
        { id: 0, text: 'Задача1', done: false },
        { id: 1, text: 'Задача2', done: true }
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

    this.setState((state: any) => {
      const { tasks } = state;
      delete tasks[index];
      return tasks;
    });
  };

  addTask = (task: Task[]) : void => {
    this.setState((state: any) => {
      const { tasks } = state;
      return {
        tasks: [...tasks, {
          id: tasks.length !== 0 ? task.length : 0,
          text: task,
          done: false
        }]
      };
    });
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
