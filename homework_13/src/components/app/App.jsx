import React from "react";
import './App.css';
import './FlexGrid.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import AppWrapper from "./app-wrapper/AppWrapper";
import Section from "../section/Section";
import Card from "../card/Card";
import Filter from "../filter/Filter";

class App extends React.Component {
  render() {
    const dataFilter = [
      {
        title: "Морская рыба",
        inputs: [
          {id: 'product_shark', label: "Акула"},
          {id: 'product_perch', label: "Окунь"},
          {id: 'product_halibut', label: "Палтус"},
          {id: 'product_cod', label: "Треска"}
        ]
      },
      {
        title: "Пресноводная рыба",
        inputs: [
          {id: 'product_beloglazka', label: "Белоглазка"},
          {id: 'product_sturgeon', label: "Осётр"},
          {id: 'product_eel', label: "Речной окунь"},
          {id: 'product_burbot', label: "Налим"}
        ]
      }
    ];


    return (
      <div className="App">
        <AppWrapper>
          <Header>Интернет-магазин "Не только красивое"</Header>
          <Sidebar>
            <Filter dataGroup={dataFilter}/>
          </Sidebar>
          <Main>
            <Section titleH1="Рыба на любой вкус" subtitle="Мы продаем рыбу, а не только показываем!">
              <div className="row">
                <div className="col-6">
                  <Card link="#" linkText="Замороженная рыба" description="Мы заморозили рыбу для вас"/>
                </div>
                <div className="col-6">
                  <Card link="#" linkText="Живая рыба" description="На кухню или на разведение"/>
                </div>
              </div>
            </Section>
            <Section titleH2="Популярные">
              <div className="row">
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Палтус" buttonText="Купить"/></div>
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Сёмга" buttonText="Купить"/></div>
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Сом" buttonText="Купить"/></div>
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Мойва" buttonText="Купить"/></div>
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Сельдь" buttonText="Купить"/></div>
                <div className="col-4"><Card imgSrc="#" imgAlt="img" link="#" linkText="Тунец" buttonText="Купить"/></div>
              </div>
            </Section>
          </Main>
          <Footer info="Контакты" copy="@ 2021. ИП Рыбаков О. А."/>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
