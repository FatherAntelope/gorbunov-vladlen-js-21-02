import React from "react";
import './App.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import AppWrapper from "./app-wrapper/AppWrapper";
import Section from "../section/Section";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppWrapper>
          <Header>Интернет-магазин "Не только красивое"</Header>
          <Sidebar/>
          <Main>
            <Section titleH1="Рыба на любой вкус" subtitle="Мы продаем рыбу, а не только показываем!">

            </Section>
            <Section titleH2="Популярные">

            </Section>
          </Main>
          <Footer info="Контакты" copy="@ 2021. ИП Рыбаков О. А."/>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
