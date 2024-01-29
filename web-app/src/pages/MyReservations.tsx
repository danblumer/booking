import React from "react";
import { useBookingContext } from "../provider/BookingContextProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AlertDialog from "../components/dialog";
import { Actions } from "../provider/actions";
import {
  Container,
  DefaultPageContentContainer,
} from "../components/container/styled";
import Header from "../components/header";

const MyReservations: React.FC = () => {
  const { state, dispatch } = useBookingContext();
  const { bookings } = state;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = React.useState<
    string | undefined
  >(undefined);
  const modalText = "Are you sure you want to delete this booking?";

  const handleDeleteClick = (bookingId: string) => {
    setIsModalOpen(true);
    setBookingIdToDelete(bookingId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setBookingIdToDelete(undefined);
  };
  const handleModalOk = () => {
    dispatch({
      type: Actions.REMOVE_BOOKING,
      payload: bookingIdToDelete as string,
    });
    setIsModalOpen(false);
    setBookingIdToDelete(undefined);
  };

  return (
    <Container>
      <Header />
      <h2>My Reservations</h2>
      <DefaultPageContentContainer>
        {(bookings.length === 0 && <span>No bookings</span>) || (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Id</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.startDate}</TableCell>
                    <TableCell>{booking.endDate}</TableCell>
                    <TableCell>{`${booking.user.name} ${booking.user.lastName}`}</TableCell>
                    <TableCell>{booking.price}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleDeleteClick(booking.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DefaultPageContentContainer>
      <AlertDialog
        open={isModalOpen}
        contentText={modalText}
        handleClose={handleModalClose}
        handleOk={handleModalOk}
        title="Booking"
        showDisagree
      />
    </Container>
  );
};

export default MyReservations;
