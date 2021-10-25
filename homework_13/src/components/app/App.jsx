import React from "react";
import './App.css';
import './AppGrid.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="app-grid">
          <div className="app-grid__container">
            <div className="app-grid__grid">
              <Header/>
              <Sidebar/>
              <Main/>
              <Footer/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
