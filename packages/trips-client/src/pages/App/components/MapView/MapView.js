import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { noop } from 'utils/functions';
import getContainingBounds from 'utils/getContainingBounds';
import isNotEmptyArray from 'utils/isNotEmptyArray';
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
    locations: PropTypes.array,
  }

  static defaultProps = {
    locations: [],
  }

  componentWillReceiveProps({ locations }) {
    if (isNotEmptyArray(locations)) {
      const bounds = getContainingBounds(locations);
      this.googleMap.fitBounds(bounds);
    }
  }

  render() {
    const { locations, ...props } = this.props;
    return (
      <MapViewInternal
        containerElement={
          <div className="MapView__container" />
        }
        mapElement={
          <div className="MapView__map" />
        }
        onLoad={ref => this.googleMap = ref}
        onBoundsChanged={this.onBoundsChanged}
        {...props}
      >
        {locations.map((location, i) => <Marker key={i} position={location} />)}
      </MapViewInternal>
    );
  }
}
