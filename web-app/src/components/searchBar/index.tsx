import React from "react";
import { StyledGrid } from "./styled";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
//import { ReactComponent as ColumnsFilterIcon } from 'assets/svg/columns-filter.svg';
import Logo from "../../assets/svg/ico-search.svg?react";
//import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../provider/BookingContextProvider";
import CustomDatePicker from "../form/customDatePicker";

const SearchBar: React.FC = () => {
  //const navigate = useNavigate();
  const { dispatch } = useBookingContext();
  const handleClick = () => {
    //navigate("/checkout");
  };
  return (
    <StyledGrid container spacing={2} columnSpacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          label="Hotel Name"
          variant="outlined"
          fullWidth
          size="small"
          //onChange={(e) => setFirstName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomDatePicker />
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomDatePicker />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          variant="outlined"
          startIcon={<Logo />}
          onClick={() => handleClick()}
          fullWidth
        >
          Search
        </Button>
      </Grid>
    </StyledGrid>
  );
};

export default SearchBar;
