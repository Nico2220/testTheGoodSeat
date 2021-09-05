/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import { Offers } from "../types/offers";
import { Spinner } from "./Spinner";

interface IProps {
  offers: Offers[] | [];
  isTableLoading: boolean;
}

export const Table = (props: IProps) => {
  if (props.isTableLoading) {
    return (
      <div className="spin">
        <Spinner />
      </div>
    );
  }

  if (!props.offers.length)
    return (
      <p className="offer-text">
        Choose your route and the offers will show here
      </p>
    );

  return (
    <table>
      <thead className="loan-refund">
        <tr>
          <th>Porvider</th>
          <th>Category</th>
          <th>Arrival time</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        {props.offers.map((offer) => {
          console.log("time=", offer.arrivalTime);
          return (
            <tr key={offer.offerId}>
              <th>{offer.providerCode}</th>
              <th>{offer.category}</th>
              <th>{offer.arrivalTime}</th>
              <th>{`${offer.price} ${offer.currency}`}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
