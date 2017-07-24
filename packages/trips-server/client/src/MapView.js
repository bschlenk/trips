import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './MapView.css';

const MapViewInternal = withGoogleMap(props => (
  <GoogleMap
      ref={props.onMapLoad.bind(this)}
      defaultZoom={15}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
  />
));

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      location: null,
    };
  }

  componentDidMount() {
    findLocation().then(location => {
      console.log('setting location to', location);
      // this.setState({ location });
      this.map.setCenter(location);
    }).catch(error => {
      this.setState({ error });
    });
  }

  render() {
    return (
      <MapViewInternal
          onMapLoad={e => this.map = e}
          containerElement={
            <div className="MapView__container" />
          }
          mapElement={
            <div className="MapView__map" />
          }
          defaultCenter={this.state.location} />
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
