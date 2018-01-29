import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationSearchBox from './components/LocationSearchBox';
import './style.css';

export default class LocationSearchGroup extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
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
      <div className="LocationSearchGroup">
        <LocationSearchBox
          placeholder="Starting Point"
          onChange={this.onStartChange}
        />
        <LocationSearchBox
          placeholder="Destination"
          onChange={this.onEndChange}
        />
      </div>
    )
  }
}
