import React, { Component } from 'react';
import MapView from './components/MapView';
import LocationSearchGroup from './components/LocationSearchGroup';
import EstimateView from './components/EstimateView';
import * as client from 'utils/client';
import { findLocation } from 'utils/map';
import './style.css';

export default class App extends Component {
  state = {
    location: undefined,
    error: null,
  }

  componentDidMount() {
    findLocation().then(location => {
      console.log('setting location to', location);
      this.setState({ location });
    }).catch(error => {
      this.setState({ error });
    });
  }

  updateEstimates = ({ start, end }) => {
    client.getEstimates(start, end)
      .then((estimates) => this.setState({ estimates }));
  }

  render() {
    const { estimates, location } = this.state;
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
