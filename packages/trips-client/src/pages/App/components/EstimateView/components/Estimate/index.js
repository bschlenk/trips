import React from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash-es/isNumber';
import AppIcon from '../AppIcon';
import './style.css';

function priceDisplay(cents) {
  return (cents / 100).toFixed(2);
}

function Price({ value, ...props }) {
  const priceStr = (isNumber(value))
    ? `$${priceDisplay(value)}`
    : `$${priceDisplay(value.low)} - $${priceDisplay(value.high)}`;
  return <span {...props}>{priceStr}</span>;
}

function Duration({ value, ...props }) {
  const minutes = Math.round(value / 60);
  return <span {...props}>{minutes} minutes</span>;
}

export default function Estimate(props) {
  const {
    service,
    flavor,
    duration,
    price,
  } = props;

  return (
    <li className="Estimate">
      <header className="Estimate__Header">
        {`${service}${flavor ? ' ' : ''}`}{flavor && <span className="Estimate__Flavor">{flavor}</span>}
      </header>
      <AppIcon className="Estimate__AppIcon" app={service} />
      <div className="Estimate__Info">
        <Duration className="Estimate__Duration" value={duration} />
        <br />
        <Price className="Estimate__Price" value={price} />
      </div>
    </li>
  );
}

Estimate.propTypes = {
  service: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  price: PropTypes.oneOf([PropTypes.number, PropTypes.object]).isRequired,
  flavor: PropTypes.string,
}
