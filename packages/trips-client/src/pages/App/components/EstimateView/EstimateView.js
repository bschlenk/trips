import React, { Component } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import EstimateWrapper from './components/EstimateWrapper/EstimateWrapper';
import EstimateFacade from './components/EstimateFacade/EstimateFacade';
import Centered from 'components/Centered/Centered';

import './EstimateView.css';

export default class EstimateView extends Component {
  static propTypes = {
    estimates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { loading } = this.props;
    return (
      <Centered>
        <ul className="EstimateView">
          {
            loading
              ? range(4).map(() => <EstimateFacade />)
              : this.props.estimates.map(estimate => (
                <EstimateWrapper {...{ estimate }} />))
          }
        </ul>
      </Centered>
    );
  }
}
