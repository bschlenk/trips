import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Estimate from './components/Estimate';
import Centered from 'components/responsive/Centered';
import './style.css';

export default class EstimateView extends Component {
  static propTypes = {
    estimates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    return (
      <Centered>
        <ul className="EstimateView">
          {this.props.estimates.map(estimate => {
            const { service, flavor } = estimate;
            const key = `${service}#${flavor}`;
            return <Estimate key={key} {...estimate} />;
          })}
        </ul>
      </Centered>
    );
  }
}
