import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import WeatherIcon from 'material-ui/svg-icons/image/wb-sunny';
import TemperatureIcon from 'material-ui/svg-icons/editor/show-chart';

export default class WeatherPage extends Component {
  constructor() {
    super();
    this.state = { placeName: null, weather: null, temperature: null, loading: false };
    this.Places = [
      { name: '札幌', id: 2128295 },
      { name: '東京', id: 1850147 },
      { name: '大阪', id: 1853909 },
      { name: '沖縄', id: 1894616 },
    ];
    this.OpenWeatherMapKey = 'db76bcbd4f977074e42d8ff223cbffee';
  }
  selectPlace(index) {
    if (index > 0) {
      const place = this.Places[index - 1];
      this.setState({ placeName: place.name, weather: null, temperature: null, loading: true });
      this.getWheather(place.id);
    }
  }
  getWheather(id) {
    const delay = (mSec) => new Promise((resolve) => setTimeout(() => resolve(), mSec));

    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${this.OpenWeatherMapKey}&id=${id}&lang=ja&units=metric`)
      .then((response) => response.json())
      .then((json) => {
        delay(700).then(() => {
          this.setState({ weather: json.weather[0].description, temperature: json.main.temp, loading: false });
          console.log('loading: ' + this.state.loading);
        });
      })
      .catch((response) => {
        this.setState({ loading: false });
        console.log('**error**', response);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ margin: 30 }}>
          <CardHeader title={<Title place={this.state.placeName} />} />
          <CardText style={{ position: 'relative' }}>
            <RefreshIndicator status={this.state.loading ? 'loading' : 'hide'} top={40} left={100} loadingColor="#f00" />
            <WeatherInformation weather={this.state.weather} temperature={this.state.temperature} />
          </CardText>
          <CardActions>
            <PlaceSelector places={this.Places} actionSelect={(ix) => this.selectPlace(ix)} />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

const Title = (props) => <h1>{props.place ? props.place + 'の天気' : '天気情報'}</h1>;
Title.propTypes = {
  place: PropTypes.string,
};

const WeatherInformation = (props) => (
  <List>
    <ListItem leftIcon={<WeatherIcon />} primaryText={props.weather} />
    <ListItem leftIcon={<TemperatureIcon />} primaryText={props.temperature ? `${props.temperature} ℃` : ''} />
  </List>
);
WeatherInformation.propTypes = {
  weather: PropTypes.string,
  temperature: PropTypes.number,
};

const PlaceSelector = (props) => (
  <DropDownMenu value={-1} onChange={(event, index) => props.actionSelect(index)}>
    <MenuItem value={-1} primaryText="場所を選択" />
    {props.places.map((place, ix) => (
      <MenuItem key={ix} value={ix} primaryText={place.name} />
    ))}
  </DropDownMenu>
);
PlaceSelector.propTypes = {
  places: PropTypes.array,
  actionSelect: PropTypes.func,
};
