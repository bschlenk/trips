import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationSearchBox from './components/LocationSearchBox/LocationSearchBox';
import Centered from 'components/Centered/Centered';
import './LocationSearchGroup.css';

export default class LocationSearchGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    bounds: PropTypes.object,
  }

  onStartChange = (start) => {
    console.log('got start location: %j', start);
    this.start = start;
    this.triggerChange();
  }

  onEndChange = (end) => {
    console.log('got end location: %j', end);
    this.end = end;
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
