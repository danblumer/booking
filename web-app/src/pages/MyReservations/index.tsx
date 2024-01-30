import React from "react";
import { useBookingContext } from "../../provider/BookingContextProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import AlertDialog from "../../components/dialog";
import { Actions } from "../../provider/actions";
import {
  Container,
  DefaultPageContentContainer,
} from "../../components/container/styled";
import Header from "../../components/header";
import dayjs from "dayjs";
import { getHotelTotalPrice } from "../../services/hotelServices";
import { NoDataFoundContainer } from "./styled";
import { useNavigate } from "react-router";

const MyReservations: React.FC = () => {
  const { state, dispatch } = useBookingContext();
  const { bookings } = state;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = React.useState<
    string | undefined
  >(undefined);
  const modalText = "Are you sure you want to delete this booking?";
  const navigate = useNavigate();

  const handleDeleteClick = (bookingId: string) => {
    setIsModalOpen(true);
    setBookingIdToDelete(bookingId);
  };

  const handleUpdateClick = (bookingId: string) => {
    const bookingFound = state.bookings.find((b) => b.id === bookingId);
      if (bookingFound) {
        dispatch({
          type: Actions.SET_SELECTED_BOOKING,
          payload: bookingFound,
        });
      }
    navigate(`/checkout/${bookingId}`);
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
      <Typography component="div" variant="h6">
        My Reservations
      </Typography>
      <DefaultPageContentContainer>
        {(bookings.length === 0 && (
          <NoDataFoundContainer>
            <Typography component="div" variant="h6">
              No bookings found
            </Typography>
          </NoDataFoundContainer>
        )) || (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Guest</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.hotel.name}</TableCell>
                    <TableCell>
                      {dayjs(booking.startDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>
                      {dayjs(booking.endDate).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>{`${booking.user.name} ${booking.user.lastName}`}</TableCell>
                    <TableCell>
                      {getHotelTotalPrice(
                        booking?.startDate,
                        booking?.endDate,
                        booking.price
                      )}
                    </TableCell>
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
                        onClick={() => handleUpdateClick(booking.id)}
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
