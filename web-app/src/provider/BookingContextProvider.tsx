// context/BookingContext.tsx
import React, { createContext, useReducer, ReactNode } from 'react';
import { Actions, Events } from './actions';
import { BookingContextProps, BookingContextState } from './types';

const initialState: BookingContextState = {
  bookings: [],
  userInfo: undefined,
  availableHotels: []
};

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

const bookingReducer = (state: BookingContextState, action: Events): BookingContextState => {
  switch (action.type) {
    case Actions.ADD_BOOKING:
      return { ...state, bookings: [...state.bookings, action.payload] };
    case Actions.REMOVE_BOOKING:
      return { ...state, bookings: state.bookings.filter((booking) => booking.id !== action.payload.id) };
    default:
      return state;
  }
};

const BookingContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = (): BookingContextProps => {
  const context = React.useContext(BookingContext);

  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }

  return context;
};

export { BookingContextProvider, useBookingContext };