import React, { useState } from "react";
import { StyledGrid, ErrorMessageContainer } from "./styled";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import Logo from "../../assets/svg/ico-search.svg?react";
import { useBookingContext } from "../../provider/BookingContextProvider";
import CustomDatePicker from "../form/customDatePicker";
import { Actions } from "../../provider/actions";
import dayjs, { Dayjs } from "dayjs";
import { generateItems } from "../../data/dataUtils";

const SearchBar: React.FC = () => {
  const { state, dispatch } = useBookingContext();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const validateForm = (): string | undefined => {
    const startDate = state.userFilter?.startDate;
    const endDate = state.userFilter?.endDate;
    if (!startDate) {
      return "Start Date is required";
    }
    if (!endDate) {
      return "End Date is required";
    }
    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      return "End Date must be greater than Start Date";
    }
    return undefined;
  };
  const handleSearchClick = () => {
    if (validateForm()) {
      setErrorMessage(validateForm());
      return;
    }
    setErrorMessage(undefined);

    const data = generateItems(
      state.userFilter?.startDate as Dayjs,
      state.userFilter?.endDate as Dayjs,
      state.userFilter?.searchTerm || "Fake Name"
    );
    dispatch({
      type: Actions.SET_ALL_AVAILABLE_HOTELS,
      payload: data,
    });
  };
  const handleHotelNameChanged = (value: string) => {
    dispatch({
      type: Actions.SET_USER_FILTER,
      payload: { ...state.userFilter, searchTerm: value },
    });
  };
  const handleStartDateChanged = (value: Dayjs | null) => {
    dispatch({
      type: Actions.SET_USER_FILTER,
      payload: { ...state.userFilter, startDate: value },
    });
  };
  const handleEndDateChanged = (value: Dayjs | null) => {
    dispatch({
      type: Actions.SET_USER_FILTER,
      payload: { ...state.userFilter, endDate: value },
    });
  };
  return (
    <>
      <ErrorMessageContainer>
        <label>{errorMessage}</label>
      </ErrorMessageContainer>
      <StyledGrid container spacing={2} columnSpacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Hotel Name"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => handleHotelNameChanged(e.target.value)}
            value={state.userFilter?.searchTerm || ""}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDatePicker
            label="Start Date"
            onChange={(date) => handleStartDateChanged(date)}
            value={state.userFilter?.startDate || null}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDatePicker
            error={false}
            helperText={""}
            label="End Date"
            onChange={(date) => handleEndDateChanged(date)}
            value={state.userFilter?.endDate || null}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="outlined"
            startIcon={<Logo />}
            onClick={handleSearchClick}
            fullWidth
            data-testid="search-button"
          >
            Search
          </Button>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default SearchBar;
