// context/BookingContext.tsx
import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { Actions, Events } from "./actions";
import { BookingContextProps, BookingContextState } from "./types";
import { Hotel } from "../types/Interfaces";
import hotelsData from "../data/hotels.json";
import { getLoggedUser } from "../services/loggedUserServices";

const initialState: BookingContextState = {
  bookings: [],
  userInfo: undefined,
  availableHotels: [], // Updated: Initialize with an empty array
  loggedUser: getLoggedUser(),
};

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);

const bookingReducer = (
  state: BookingContextState,
  action: Events
): BookingContextState => {
  switch (action.type) {
    case Actions.ADD_BOOKING:
      return { ...state, bookings: [...state.bookings, action.payload] };
    case Actions.REMOVE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload
        ),
      };
    case Actions.SET_ALL_AVAILABLE_HOTELS:
      return { ...state, availableHotels: action.payload };
    case Actions.SET_SELECTED_HOTEL:
      return { ...state, selectedHotel: action.payload };
    case Actions.SET_USER_FILTER:
      return { ...state, userFilter: action.payload };
    default:
      return state;
  }
};

const BookingContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotels: Hotel[] = hotelsData as unknown as Hotel[];
        dispatch({ type: Actions.SET_ALL_AVAILABLE_HOTELS, payload: hotels });
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };


    fetchHotels();
  }, []);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = (): BookingContextProps => {
  const context = React.useContext(BookingContext);

  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }

  return context;
};

export { BookingContextProvider, useBookingContext };
