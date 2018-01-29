import React, { Component } from 'react';
import MapView from './components/MapView';
import LocationSearchGroup from './components/LocationSearchGroup';
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

  updateEstimates = ({ start, end }) => {
    client.getEstimates(start, end)
      .then((estimates) => this.setState({ estimates }));
  }

  render() {
    const { estimates } = this.state;
    return (
      <div className="App">
        <LocationSearchGroup
          onChange={this.updateEstimates}
        />
        <MapView
          location={location}
        />
        {estimates
          && <EstimateView {...{ estimates }} />}
      </div>
    );
  }
}
