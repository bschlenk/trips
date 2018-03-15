import React, { Component } from 'react';
import MapView from './components/MapView/MapView';
import EstimateView from './components/EstimateView/EstimateView';
import LocationSearchGroup from './components/LocationSearchGroup/LocationSearchGroup';
import * as client from 'utils/client';
import findLocation from 'utils/findLocation';
import getBounds from 'utils/getBounds';
import './App.css';

export default class App extends Component {
  state = {
    currentLocation: undefined,
    start: undefined,
    end: undefined,
    bounds: null,
    loading: false,
    error: null,
  }

  componentDidMount() {
    findLocation().then(location => {
      console.log('setting location to', location);
      const bounds = getBounds(location);
      this.setState({ currentLocation: location, bounds });
    }).catch(error => {
      this.setState({ error });
    });
  }

  updateEstimates = ({ start, end }) => {
    this.setState({
      start,
      end,
      loading: true,
      estimates: null,
    });

    client.getEstimates(start, end)
      .then((estimates) => {
        this.setState({ estimates });
      })
      .catch((err) => {
        console.log('Error getting estimates: %s', err);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  onBoundsChange = (bounds) => {
    console.log('bounds change: %j', bounds);
    this.setState({ bounds });
  }

  render() {
    const {
      estimates,
      currentLocation,
      bounds,
      loading,
      start,
      end,
    } = this.state;

    const locations = [start, end].filter(val => val != null);

    return (
      <div className="App">
        <LocationSearchGroup
          onChange={this.updateEstimates}
          onStartChange={start => this.setState({ start })}
          onEndChange={end => this.setState({ end })}
          bounds={bounds}
          currentLocation={currentLocation}
        />
        <MapView
          onBoundsChange={this.onBoundsChange}
          locations={locations}
        />
        {(loading || estimates)
          && <EstimateView loading={loading} {...{ estimates }} />}
      </div>
    );
  }
}
