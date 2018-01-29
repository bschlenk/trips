import isNumber from 'lodash-es/isNumber';
import sortBy from 'lodash-es/sortBy';

const endpoint = (process.env.NODE_ENV === 'production')
  ? 'something'
  : '';

function locationToQuery(location) {
  const { lat, lng } = location;
  return `${lat},${lng}`;
}

function lowPrice(estimate) {
  const { price } = estimate;
  return (isNumber(price))
    ? price
    : price.low;
}

function sortEstimates(estimates) {
  return sortBy(estimates, lowPrice);
}

export function getEstimates(start, end) {
  const s = locationToQuery(start);
  const e = locationToQuery(end);
  const url = `${endpoint}/api/estimates/coords?start=${s}&end=${e}`;

  return fetch(url, { accept: 'application/json' })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch estimates: ${res.statusText} (${res.status})`);
      }
      return res.json();
    })
    .then(sortEstimates);
}