import React from 'react';
import isNumber from 'lodash/isNumber';

function priceDisplay(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars.replace(/\.00$/, '');
}

function getPriceString(value) {
  if (!isNumber(value)) {
    if (value.low === value.high) {
      value = value.low;
    } else {
      return `$${priceDisplay(value.low)} - $${priceDisplay(value.high)}`;
    }
  }
  return `$${priceDisplay(value)}`;
}

export default function Price({ value, ...props }) {
  return <span {...props}>{getPriceString(value)}</span>;
}
