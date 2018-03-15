import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationSearchBox from './components/LocationSearchBox/LocationSearchBox';
import Centered from 'components/Centered/Centered';
import geocodeLocation from 'utils/geocodeLocation';
import './LocationSearchGroup.css';

export default class LocationSearchGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onStartChange: PropTypes.func,
    onEndChange: PropTypes.func,
    bounds: PropTypes.object,
    currentLocation: PropTypes.object,
  }

  state = {
    currentAddress: undefined,
  }

  componentWillReceiveProps({ currentLocation }) {
    if (!this.props.currentLocation && currentLocation) {
      this.onStartChange(currentLocation);
      geocodeLocation(currentLocation)
        .then((currentAddress) => {
          this.setState({ currentAddress });
        })
        .catch((err, data) => {
          console.log(
            'Could not geocode %j: %s %j',
            currentLocation, err, data);
        });
    }
  }

  onStartChange = (start) => {
    console.log('got start location: %j', start);
    this.start = start;
    this.props.onStartChange && this.props.onStartChange(start);
    this.triggerChange();
  }

  onEndChange = (end) => {
    console.log('got end location: %j', end);
    this.end = end;
    this.props.onEndChange && this.props.onEndChange(end);
    this.triggerChange();
  }

  triggerChange() {
    const { start, end } = this;
    if (start && end) {
      this.props.onChange({ start, end });
    }
  }

  render() {
    return (
      <Centered>
        <div className="LocationSearchGroup">
          <LocationSearchBox
            placeholder="Starting Point"
            onChange={this.onStartChange}
            bounds={this.props.bounds}
            initialValue={this.state.currentAddress}
          />
          <LocationSearchBox
            placeholder="Destination"
            onChange={this.onEndChange}
            bounds={this.props.bounds}
          />
        </div>
      </Centered>
    )
  }
}
