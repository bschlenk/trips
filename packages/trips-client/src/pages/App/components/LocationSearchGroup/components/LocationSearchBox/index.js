import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import './style.css';

function Input({ placeholder, className, ...props }) {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      {...props}
    />
  );
}

export default class LocationSearchBox extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    bounds: PropTypes.object,
    placeholder: PropTypes.string,
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

    return (
      <StandaloneSearchBox
        ref={ref => this.searchBox = ref}
        className="LocationSearchBox"
        onPlacesChanged={this.onPlacesChanged}
        bounds={bounds}
      >
        <Input
          className="LocationSearchBox__Input"
          placeholder={placeholder}
        />
      </StandaloneSearchBox>
    );
  }
}
