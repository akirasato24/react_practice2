import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Hello from './hello';
import JyankenGamePage from './jyankenGamePage';
import WeatherPage from './weatherPage';
import MoneyBook from './moneyBook';

class InitialPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
    <div>
      <div><Link to="/hello">Hello!</Link></div>
      <div><Link to="/jyanken">じゃんけん</Link></div>
      <div><Link to="/weatherPage">天気</Link></div>
      <div><Link to="/moneyBook">小遣い帳</Link></div>
    </div>
    );
  }
}
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={InitialPage} />
    <Route path="/hello" component={Hello} />
    <Route path="/jyanken" component={JyankenGamePage} />
    <Route path="/weatherPage" component={WeatherPage} />
    <Route path="/moneyBook" component={MoneyBook} />
  </BrowserRouter>,
  document.getElementById('root')
);
