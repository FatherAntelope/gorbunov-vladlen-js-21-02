import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Segment from '../segment/Segment';
import ToDoForm from '../todo/todo-form/ToDoForm';
import ToDoTask from '../todo/todo-task/ToDoTask';

interface IProps {
  [key: string] : string
}

interface ITask {
  id: number,
  text: string,
  done: boolean
}

interface IState {
  currentKey: number,
  tasks: ITask[];
}

class App extends React.Component<IProps, IState> {
  private static addDataInLocalStorage<T>(key: string, data: T): void {
    const arrObj: T[] = JSON.parse(localStorage.getItem(key) || '[]');
    arrObj.push(data);
    localStorage.setItem(key, JSON.stringify(arrObj));
  }

  private static getDataOfLocalStorage<T>(key: string): T | null {
    const storage: string | null = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    }
    return null;
  }

  private static setDataInLocalStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentKey: Number(App.getDataOfLocalStorage<string>('currentKey') || 0),
      tasks: App.getDataOfLocalStorage<ITask[]>('tasks') || []
    };
  }

  private doneTask = (id: number): void => {
    const index: number = this.state.tasks.map((item) => item.id).indexOf(id);
    this.state.tasks[index].done = !this.state.tasks[index].done;
    App.setDataInLocalStorage<ITask[]>('tasks', this.state.tasks);
    this.setState({ tasks: this.state.tasks });
  };

  private removeTask = (id: number): void => {
    const index: number = this.state.tasks.map((item) => item.id).indexOf(id);
    this.state.tasks.splice(index, 1);
    App.setDataInLocalStorage<ITask[]>('tasks', this.state.tasks);
    this.setState({ tasks: this.state.tasks });
  };

  private addTask = (taskName: string) : void => {
    let key = this.state.currentKey;
    const task: ITask = { id: key, text: taskName, done: false };
    key += 1;
    App.setDataInLocalStorage<number>('currentKey', key);
    App.addDataInLocalStorage<ITask>('tasks', task);
    this.state.tasks.push(task);
    this.setState({ currentKey: key, tasks: this.state.tasks });
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
