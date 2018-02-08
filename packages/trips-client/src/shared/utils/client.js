const endpoint = (process.env.NODE_ENV === 'production')
  ? process.env.REACT_APP_API_HOSTNAME
  : '';

function locationToQuery(location) {
  const { lat, lng } = location;
  return `${lat},${lng}`;
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
    });
}
