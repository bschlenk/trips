import React, { Component } from 'react';
import MapView from './components/MapView';
import LocationSearchBox from './components/LocationSearchBox';
import EstimateView from './components/EstimateView';
import * as client from 'utils/client';
import './style.css';

export default class App extends Component {
  state = {}

  onStartChange = (start) => {
    console.log('got start location: %j', start);
    this.start = start;
    this.updateEstimates();
  }

  onEndChange = (end) => {
    console.log('got end location: %j', end);
    this.end = end;
    this.updateEstimates();
  }

  updateEstimates() {
    const { start, end } = this;
    if (start && end) {
      client.getEstimates(start, end).then((estimates) => {
        this.setState({ estimates });
      });
    }
  }

  render() {
    const { estimates } = this.state;
    return (
      <div className="App">
        <LocationSearchBox
          onChange={this.onStartChange}
          placeholder="Starting Point"
        />
        <LocationSearchBox
          onChange={this.onEndChange}
          placeholder="Destination"
        />
        <MapView />
        {estimates &&
          <EstimateView {...{ estimates }} />}
      </div>
    );
  }
}
