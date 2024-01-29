import React from "react";
import { useBookingContext } from "../../provider/BookingContextProvider";
import {
  Container,
  DefaultPageContentContainer,
} from "../../components/container/styled";
import Header from "../../components/header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Typography } from "@mui/material";
import CustomFormikTextBox from "../../components/form/customFormikTextBox";
import { Booking } from "../../types/Interfaces";
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
import CustomDatePicker from "../../components/form/customDatePicker";
import CustomFormikDatePicker from "../../components/form/customFormikDatePicker";
import { formatCurrency } from "../../utils/numberUtils";
import {
  calculateTotalStay,
  calculateTotalStayPrice,
  getHotelTotalPrice,
} from "../../services/hotelServices";

type FormValues = {
  name: string;
  lastName: string;
  address: string;
  email: string;
  startDate: string;
  endDate: string;
};

const Checkout: React.FC = () => {
  const { state, dispatch } = useBookingContext();
  const { selectedHotel, userFilter, loggedUser } = state;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const bookSavedText =
    "Your room has been booked. You will receive an email with the details.";
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    startDate: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
    /*startDate: Yup.date()
    .transform((value, originalValue) => {
      return dayjs.isDayjs(dayjs(originalValue)) ? originalValue : new Date('') 
    })
    .required('Required'),
    */
  });

  const validateForm = async (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (dayjs(values.startDate).isBefore(dayjs(values.endDate))) {
      errors.endDate = "End Date should be greater than start date";
    }

    // More custom validation logic for other fields...

    return errors;
  };

  const handleNewBooking = (booking: Booking) => {
    dispatch({ type: Actions.ADD_BOOKING, payload: booking });
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
    const newBooking: Booking = {
      id: uuidv4(),
      startDate: userFilter?.startDate,
      endDate: userFilter?.endDate,
      price: selectedHotel?.price || 0,
      user: {
        id: loggedUser.id,
        name: values.name,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
      },
    };
    handleNewBooking(newBooking);
  };

  return (
    <Container>
      <Header />
      <DefaultPageContentContainer>
        {(selectedHotel && (
          <>
            <Typography component="div" variant="h6">
              Hotel Checkout, please fill the fields bellow
            </Typography>
            <CheckoutFormContainer>
              <Typography component="div" variant="h6">
                {selectedHotel.name}
              </Typography>
              <Formik
                initialValues={{
                  name: "",
                  lastName: "",
                  address: "",
                  email: "",
                  startDate: "",
                  endDate: "",
                }}
                validationSchema={validationSchema}
                validate={validateForm}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {({ handleSubmit, values }) => (
                  <CheckoutStyledForm onSubmit={handleSubmit}>
                    <CustomFormikTextBox label="Name" name="name" />
                    <CustomFormikTextBox label="Last Name" name="lastName" />
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
                        <b>Hotel Price</b> :{" "}
                        {formatCurrency(selectedHotel.price)}
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
                          selectedHotel.price
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
