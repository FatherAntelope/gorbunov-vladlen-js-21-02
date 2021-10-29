import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <h1>Текст</h1>
        </Wrapper>
      </div>
    );
  }
}

export default App;
