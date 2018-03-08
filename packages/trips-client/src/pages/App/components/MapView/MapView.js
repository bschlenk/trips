import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { noop } from 'utils/functions';
import './MapView.css';

const DEFAULT_ZOOM = 16;
const DEFAULT_LOCATION = { lat: 47.613869, lng: -122.331772 };

const MapViewInternal = withGoogleMap((props) => {
  const { children, onLoad = noop, ...rest } = props;
  return (
    <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_LOCATION}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
      ref={onLoad}
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

  componentDidMount() {
    /*
    const bounds = this.googleMap.getBounds();
    if (bounds && this.props.onBoundsChanged) {
      this.props.onBoundsChanged(bounds);
    }
    */
  }

  render() {
    const { location = DEFAULT_LOCATION, ...rest } = this.props;
    const props = {
      center: location,
      ...rest,
    };
    return (
      <MapViewInternal
        containerElement={
          <div className="MapView__container" />
        }
        mapElement={
          <div className="MapView__map" />
        }
        onLoad={ref => this.googleMap = ref}
        {...props}
      >
        <Marker position={location} />
      </MapViewInternal>
    );
  }
}
