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
    loading: false,
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
    const fin = () => {
      this.setState({ loading: false });
    }

    this.setState({
      loading: true,
      estimates: null,
    });

    client.getEstimates(start, end)
      .then((estimates) => {
        this.setState({ estimates });
        fin();
      })
      .catch((err) => {
        console.log('Error getting estimates: %s', err);
        fin();
      });
  }

  onBoundsChange = (bounds) => {
    console.log('bounds change: %j', bounds);
    this.setState({ bounds });
  }

  render() {
    const { estimates, location, bounds, loading } = this.state;
    return (
      <div className="App">
        <LocationSearchGroup
          onChange={this.updateEstimates}
          bounds={bounds}
        />
        <MapView
          location={location}
          onBoundsChange={this.onBoundsChange}
        />
        {(loading || estimates)
          && <EstimateView loading={loading} {...{ estimates }} />}
      </div>
    );
  }
}
