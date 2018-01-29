import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './style.css';

const DEFAULT_ZOOM = 16;
const DEFAULT_LOCATION = { lat: 47.613869, lng: -122.331772 };

const MapViewInternal = withGoogleMap((props) => {
  const { children, ...rest } = props;
  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_LOCATION}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
      {...rest}
    >
      {children}
    </GoogleMap>
  );
});

export default class MapView extends Component {
  static propTypes = {
    location: PropTypes.object,
  }

  render() {
    const { location = DEFAULT_LOCATION } = this.state;
    const props = {
      center: location,
    };
    return (
      <MapViewInternal
        containerElement={
          <div className="MapView__container" />
        }
        mapElement={
          <div className="MapView__map" />
        }
        {...props}
      >
        <Marker position={location} />
      </MapViewInternal>
    );
  }
}
