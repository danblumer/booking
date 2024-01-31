import React from "react";
import { useBookingContext } from "../../provider/BookingContextProvider";
import {
  Container,
  DefaultPageContentContainer,
} from "../../components/container/styled";
import Header from "../../components/header";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Typography } from "@mui/material";
import CustomFormikTextBox from "../../components/form/customFormikTextBox";
import { Booking, Hotel } from "../../types/Interfaces";
import { Actions } from "../../provider/actions";
import AlertDialog from "../../components/dialog";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  CheckoutFormContainer,
  CheckoutStyledForm,
  PriceContainer,
} from "./styled";
import dayjs from "dayjs";
import CustomFormikDatePicker from "../../components/form/customFormikDatePicker";
import { formatCurrency } from "../../utils/numberUtils";
import {
  calculateTotalStay,
  getHotelTotalPrice,
} from "../../services/hotelServices";
import { useParams } from "react-router";

type FormValues = {
  name: string;
  lastName: string;
  address: string;
  email: string;
  startDate: string;
  endDate: string;
};

const Checkout = () => {
  const { state, dispatch } = useBookingContext();
  const { selectedHotel, selectedBooking, loggedUser } = state;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const bookSavedText =
    "Your room has been booked. You will receive an email with the details.";
  const hotelData = selectedHotel || selectedBooking?.hotel;
  const navigate = useNavigate();
  const { bookid } = useParams();
  const editMode = Boolean(bookid);
  

  const getInitialValues = () => {
    const bookingFound = state.bookings.find((b) => b.id === bookid);
    let initialValues: FormValues = {
      name: "",
      lastName: "",
      address: "",
      email: "",
      startDate: state.userFilter?.startDate
        ? dayjs(state.userFilter?.startDate).format("MM/DD/YYYY")
        : "",
      endDate: state.userFilter?.endDate
        ? dayjs(state.userFilter?.endDate).format("MM/DD/YYYY")
        : "",
    };
    if(bookingFound){
      initialValues = {
        name: bookingFound?.user.name || "",
        lastName: bookingFound?.user.lastName || "",
        address: bookingFound?.user.address || "",
        email: bookingFound?.user.email || "",
        startDate: bookingFound?.startDate
          ? dayjs(bookingFound?.startDate).format("MM/DD/YYYY")
          : "",
        endDate: bookingFound?.endDate
          ? dayjs(bookingFound?.endDate).format("MM/DD/YYYY")
          : "",
      }
    }

    return initialValues;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
  });

  const validateForm = async (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (dayjs(values.startDate).isAfter(dayjs(values.endDate))) {
      errors.endDate = "End Date must be greater than start date";
    }

    return errors;
  };

  const handleNewBooking = (booking: Booking) => {
    dispatch({ type: Actions.ADD_BOOKING, payload: booking });
    setIsModalOpen(true);
  };
  const handleUpdateBooking = (booking: Booking) => {
    dispatch({ type: Actions.UPDATE_BOOKING, payload: booking });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    closeModalAndRedirect();
  };
  const handleModalOK = () => {
    closeModalAndRedirect();
  };
  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  const handleSubmit = (values: FormValues) => {
    const bookingData: Booking = {
      id: uuidv4(),
      startDate: dayjs(values.startDate),
      endDate: dayjs(values.endDate),
      price: hotelData?.price || 0,
      user: {
        id: loggedUser.id,
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
      },
      hotel: hotelData as Hotel,
    };
    if(editMode){
      bookingData.id = bookid as string;
      handleUpdateBooking(bookingData);
    }
    else{
      handleNewBooking(bookingData);
    }
  };

  return (
    <Container>
      <Header />
      <DefaultPageContentContainer>
        {(hotelData && (
          <>
            <Typography component="div" variant="h6">
              Hotel Checkout, please fill the fields bellow
            </Typography>
            {editMode && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="span"
              >
                <b>Edit your reservation here</b>
              </Typography>
            )}
            <CheckoutFormContainer>
              <Typography component="div" variant="h6">
                {hotelData.name}
              </Typography>
              <Formik
                initialValues={getInitialValues()}
                validationSchema={validationSchema}
                validate={validateForm}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({ handleSubmit, values }) => (
                  <CheckoutStyledForm onSubmit={handleSubmit}>
                    <CustomFormikTextBox label="Guest Name" name="name" />
                    <CustomFormikTextBox label="Guest Last Name" name="lastName" />
                    <CustomFormikTextBox label="E-Mail" name="email" />
                    <CustomFormikTextBox label="Address" name="address" />
                    <CustomFormikDatePicker
                      label="Start Date"
                      name="startDate"
                    />
                    <CustomFormikDatePicker label="End Date" name="endDate" />
                    <PriceContainer>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="span"
                      >
                        <b>Hotel Price</b> : {formatCurrency(hotelData.price)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="span"
                      >
                        <b>Total Days:</b>
                        {` ${calculateTotalStay(values.startDate, values.endDate)}`}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="span"
                      >
                        <b>Total Price</b>:
                        {getHotelTotalPrice(
                          values.startDate,
                          values.endDate,
                          hotelData.price
                        )}
                      </Typography>
                      <div>
                        <Button variant="outlined" type="submit">
                          Book
                        </Button>
                      </div>
                    </PriceContainer>
                  </CheckoutStyledForm>
                )}
              </Formik>
              <AlertDialog
                open={isModalOpen}
                contentText={bookSavedText}
                handleClose={handleModalClose}
                handleOk={handleModalOK}
                title="Booking"
              />
            </CheckoutFormContainer>
          </>
        )) || (
          <Typography component="div" variant="h6">
            No hotel selected
          </Typography>
        )}
      </DefaultPageContentContainer>
    </Container>
  );
};

export default Checkout;
