import React from 'react';
import PropTypes from 'prop-types';

export default function EstimateError(props) {
  const { service, error } = props;
  const style = { color: 'red' };
  return (
    <div style={style}>
      {service} - { error }
    </div>
  );
}

EstimateError.propTypes = {
  service: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};
