import React from "react";
import { useBookingContext } from "../provider/BookingContextProvider";

const Checkout: React.FC = () => {
  const { state } = useBookingContext();
  console.log("statew", state);
  return (
    <div>
    <h2>My Reservations</h2>
      {/* Add content for the home page if needed */}
    </div>
  );
};

export default Checkout;
