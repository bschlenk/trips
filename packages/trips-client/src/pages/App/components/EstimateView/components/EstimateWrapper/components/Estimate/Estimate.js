import React from 'react';
import PropTypes from 'prop-types';
import AppIcon from 'components/AppIcon/AppIcon';
import Price from './components/Price/Price';
import Duration from './components/Duration/Duration';
import './Estimate.css';

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
        <span className="Estimate__Header__Service">
          {service}
        </span>
        {flavor
          && <span className="Estimate__Header__Flavor">: {flavor}</span>}
      </header>
      <div className="Estimate__InfoGroup">
        <AppIcon className="Estimate__AppIcon" app={service} />
        <Duration className="Estimate__Duration" value={duration} />
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
