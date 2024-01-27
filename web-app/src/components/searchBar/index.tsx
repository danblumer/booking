import React from "react";
import { Container } from "./styled";
import Grid from "@mui/material/Grid";
import { Button, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
//import { ReactComponent as ColumnsFilterIcon } from 'assets/svg/columns-filter.svg';
import Logo from "../../assets/svg/ico-search.svg?react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../provider/BookingContextProvider";
import { Actions } from "../../provider/actions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useBookingContext();
  const handleClick = () => {
    navigate("/checkout");
    dispatch(
        {
            type: Actions.ADD_BOOKING,
            payload: {
                id: "1",
                startDate: "2",
                endDate: "3",
                user: {
                    id: "1",
                    name: "blumao",
                    address:"seila",
                },
            }
        }
    )
    console.log("foi");
  };
  return (
    <Container>
      <Grid container spacing={2} columnSpacing={2}>
        <Grid item xs={12} md={4}>
          <Item>a</Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>a</Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item>a</Item>
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            variant="outlined"
            startIcon={<Logo />}
            onClick={() => handleClick()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchBar;
