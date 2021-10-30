import './App.css';
import React from 'react';
import Wrapper from '../wrapper/Wrapper';
import Main from '../main/Main';
import Comment from '../comment/Comment';
import Pagenator from '../pagenator/Pagenator';
import ThemeCheckbox from '../theme-checkbox/ThemeCheckbox';
import Tooltip from '../tooltip/Tooltip';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Wrapper>
          <Main headerTitle="Пользователи">
            <div className="row">
              <div className="col-6">
                <Tooltip textInfo="60d0fe4f5311236168a109cb">
                  <Comment />
                </Tooltip>
              </div>
            </div>
            <div className="row row_space-between">
              <Pagenator />
              <ThemeCheckbox />
            </div>
          </Main>
        </Wrapper>
      </div>
    );
  }
}

export default App;
