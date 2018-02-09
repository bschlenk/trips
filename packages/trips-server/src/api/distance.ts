import * as gmaps from '@google/maps';
import { LocationInput } from './locations';

const googleMapsClient = gmaps.createClient({
  key: process.env.GOOGLE_MAPS_KEY,
});

export interface DistanceResponse {
  /** The distance between the start and end points. */
  distance: number;
  /** The time in seconds to drive the distance. */
  duration: number;
}

interface LatLng {
  lat: number;
  lng: number;
}

function locationToGmapsLocation(loc: LocationInput): LatLng | string {
  if (typeof loc === 'string') {
    return loc;
  }
  const { latitude: lat, longitude: lng } = loc;
  return { lat, lng };
}

type ElementStatus =
  /** Indicates the response contains a valid result. */
  'OK' |
  /** Indicates that the provided request was invalid. */
  'INVALID_REQUEST' |
  /**
   * Indicates that the product of origins and destinations
   * exceeds the per-query limit.
   */
  'MAX_ELEMENTS_EXCEEDED' |
  /**
   * Indicates the service has received too many requests from your
   * application within the allowed time period.
   */
  'OVER_QUERY_LIMIT' |
  /**
   * Indicates that the service denied use of the Distance Matrix service
   * by your application.
   */
  'REQUEST_DENIED' |
  /**
   * Indicates a Distance Matrix request could not be processed due to a
   * server error. The request may succeed if you try again.
   */
  'UNKNOWN_ERROR';

type RowStatus =
  /** Indicates the response contains a valid result. */
  'OK' |
  /**
   * Indicates that the origin and/or destination of this pairing
   * could not be geocoded.
   */
  'NOT_FOUND' |
  /** Indicates no route could be found between the origin and destination. */
  'ZERO_RESULTS' |
  /** Indicates the requested route is too long and cannot be processed. */
  'MAX_ROUTE_LENGTH_EXCEEDED';

interface DistanceMatrixResponse {
  status: number;
  headers: { [key: string]: string };
  json: {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: {
      elements: {
        status: ElementStatus;
        duration: {
          value: number;
          text: string;
        },
        distance: {
          value: number;
          text: string;
        },
      }[];
    }[];
    status: RowStatus;
  };
  requestUrl: string;
  query: {
    destinations: string,
    origins: string,
    key: string,
  };
}

export function computeDistance(start: LocationInput, end: LocationInput):
    Promise<DistanceResponse> {
  return new Promise((resolve, reject) => {
    googleMapsClient.distanceMatrix(
      {
        units: 'imperial',
        origins: [locationToGmapsLocation(start)],
        destinations: [locationToGmapsLocation(end)],
      },
      (err: Error, response: DistanceMatrixResponse) => {
        if (err) {
          reject(err);
          return;
        }
        if (response.status >= 400) {
          reject(new Error(`Google Distance Matrix returned ${response.status} status`));
          return;
        }
        const element = response.json.rows[0].elements[0];
        if (element.status !== 'OK') {
          reject(new Error(getErrorMessage(element.status)));
          return;
        }
        const duration = element.duration.value;
        const distance = element.distance.value;
        resolve({ duration, distance });
      },
    );
  });
}

function getErrorMessage(status: string): string {
  switch (status) {
    case 'ZERO_RESULTS':
      return 'No route could be found between origin and destination';
  }
  return `Could not get distance from google: ${status}`;
}
