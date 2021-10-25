import React from "react";
import './App.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import AppWrapper from "./app-wrapper/AppWrapper";
import Section from "../section/Section";
import Card from "../card/Card";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppWrapper>
          <Header>Интернет-магазин "Не только красивое"</Header>
          <Sidebar/>
          <Main>
            <Section titleH1="Рыба на любой вкус" subtitle="Мы продаем рыбу, а не только показываем!">
              <Card link="#" linkText="Замороженная рыба" description="Мы заморозили рыбу для вас"/>
              <Card link="#" linkText="Живая рыба" description="На кухню или на разведение"/>
            </Section>
            <Section titleH2="Популярные">
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Палтус" buttonText="Купить"/>
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Сёмга" buttonText="Купить"/>
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Сом" buttonText="Купить"/>
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Мойва" buttonText="Купить"/>
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Сельдь" buttonText="Купить"/>
              <Card imgSrc="#" imgAlt="img" link="#" linkText="Тунец" buttonText="Купить"/>
            </Section>
          </Main>
          <Footer info="Контакты" copy="@ 2021. ИП Рыбаков О. А."/>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
