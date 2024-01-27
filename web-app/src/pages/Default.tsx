import React from "react";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import { useBookingContext } from "../provider/BookingContextProvider";
/*
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  // your custom styles go here
}) as typeof Button;
*/

const DefaultPage: React.FC = () => {
  const { state } = useBookingContext();
  console.log('state', state);
  return (
    <>
      <Header />
      <SearchBar />
    </>
  );
};

export default DefaultPage;
