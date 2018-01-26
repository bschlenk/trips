import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import './style.css';

export default class LocationSearchBox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    bounds: PropTypes.object,
    placeholder: PropTypes.string,
  }

  state = {
    places: [],
  }

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    const { location } = places[0].geometry;
    const loc = {
      lat: location.lat(),
      lng: location.lng(),
    };
    this.props.onChange(loc);
  }

  render() {
    const {
      bounds,
      placeholder = 'Enter Location',
    } = this.props;
    const { places } = this.state;

    return (
      <div className="LocationSearchBox">
        <StandaloneSearchBox
          ref={ref => this.searchBox = ref}
          onPlacesChanged={this.onPlacesChanged}
          bounds={bounds}
        >
          <input
            className="LocationSearchBox__Input"
            type="text"
            placeholder={placeholder}
          />
        </StandaloneSearchBox>
      </div>
    );
  }
}
