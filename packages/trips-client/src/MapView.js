import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './MapView.css';

const DEFAULT_ZOOM = 15;
const DEFAULT_LOCATION = { lat: 47.613869, lng: -122.331772 };

const MapViewInternal = withGoogleMap(props => (
  <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_LOCATION}
      {...props}
  />
));

export default class MapView extends Component {
  state = {
    error: null,
    location: null,
  };

  componentDidMount() {
    findLocation().then(location => {
      console.log('setting location to', location);
      this.setState({ location });
    }).catch(error => {
      this.setState({ error });
    });
  }

  render() {
    const { location } = this.state;
    const zoom = location ? 18 : DEFAULT_ZOOM;
    return (
      <MapViewInternal
        containerElement={
          <div className="MapView__container" />
        }
        mapElement={
          <div className="MapView__map" />
        }
        center={location}
        zoom={zoom}
      />
    );
  }
}

function findLocation() {
  // Try HTML5 geolocation.
  return new Promise((res, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        res(pos);
      }, () => {
        rej("Geolocation service failed");
      });
    } else {
      // Browser doesn't support Geolocation
      rej("Browser doesn't support geolocation");
    }
  });
}
