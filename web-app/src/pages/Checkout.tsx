import React from "react";
import { useBookingContext } from "../provider/BookingContextProvider";
import { Container } from "../components/container/styled";
import Header from "../components/header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import CustomFormikTextBox from "../components/form/customFormikTextBox";
import { Booking } from "../types/Interfaces";
import { Actions } from "../provider/actions";
import AlertDialog from "../components/dialog";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
  });

  if (!selectedHotel) {
    return (
      <div>
        <h2>No hotel selected</h2>
      </div>
    );
  }
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

  return (
    <Container>
      <Header />
      <div>
        <h2>Checkout</h2>
        <span>{selectedHotel.name}</span>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            address: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const newBooking: Booking = {
              id: uuidv4(),
              startDate: userFilter?.startDate ?? "",
              endDate: userFilter?.endDate ?? "",
              price: selectedHotel.price,
              user: {
                id: loggedUser.id,
                name: values.name,
                lastName: values.lastName,
                email: values.email,
                address: values.address,
              },
            };
            handleNewBooking(newBooking);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <CustomFormikTextBox label="Name" name="name" />
              </div>
              <div>
                <CustomFormikTextBox label="Last Name" name="lastName" />
              </div>
              <div>
                <CustomFormikTextBox label="E-Mail" name="email" />
              </div>
              <div>
                <CustomFormikTextBox label="Address" name="address" />
              </div>
              <div>
                <span>Check-in :</span>
              </div>
              <div>
                <span>Check-out :</span>
              </div>
              <div>
                <span>Price :</span>
              </div>
              <div>
                <Button variant="outlined" type="submit">
                  Book
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <AlertDialog
        open={isModalOpen}
        contentText={bookSavedText}
        handleClose={handleModalClose}
        handleOk={handleModalOK}
        title="Booking"
      />
    </Container>
  );
};

export default Checkout;
