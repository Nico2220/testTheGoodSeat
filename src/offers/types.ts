interface IOffer {
  offerId: string;
  providerCode: string;
  category: string;
  price: number;
  arrivalTime: number;
  currency: string;
  internalDeeplinkUrl: boolean | string;
}

export interface IOfferResponse {
  statusCode: number;
  body: IOffer[];
}
