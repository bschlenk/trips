declare module 'node-uber' {

  class Uber {
    constructor(options: Uber.Options);

    estimates: Uber.Estimates;
  }

  namespace Uber {
    interface Options {
      client_id: string,
      client_secret: string,
      server_token: string,
    }

    interface Estimates {
      getPriceForRouteAsync: (
        startLat: number,
        startLon: number,
        endLat: number,
        endLon: number,
        seats?: number
      ) => Promise<PriceEstimate>;
    }

    interface PriceEstimate {
      prices: {
        display_name: string,
        duration: number,
        high_estimate: number,
        low_estimate: number,
      }[];
    }
  }

  export = Uber;
}
