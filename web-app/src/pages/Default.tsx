import Header from "../components/header";
import SearchBar from "../components/searchBar";
import { useBookingContext } from "../provider/BookingContextProvider";
import HotelCard from "../components/hotelCard";
import { calculateTotalStayPrice } from "../services/hotelServices";
import { Actions } from "../provider/actions";
import { Hotel } from "../types/Interfaces";
import { useNavigate } from "react-router-dom";
import { Container, DefaultPageContentContainer } from "../components/container/styled";

const DefaultPage = () => {
  const { state, dispatch } = useBookingContext();
  const { availableHotels } = state;
  const navigate = useNavigate();
  const handleSelectHotel = (selectedHotel?: Hotel) => {
    dispatch({ type: Actions.SET_SELECTED_HOTEL, payload: selectedHotel });
    navigate('/checkout');
  };
  
  return (
    <Container>
      <Header />
      <DefaultPageContentContainer>
        <SearchBar />
        {availableHotels.map((item) => (
          <HotelCard
            key={item.id}
            hotelData={item}
            handleSelectHotel={handleSelectHotel}
          />
        ))}
      </DefaultPageContentContainer>
    </Container>
  );
};

export default DefaultPage;
