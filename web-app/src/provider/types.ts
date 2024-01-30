// context/BookingContext.tsx
import { Dispatch } from 'react';
import { Booking, Hotel, UserFilter, UserInfo, LoggedUser } from '../types/Interfaces';
import { Events } from './actions';

export interface BookingContextState {
    bookings: Booking[];
    userInfo?: UserInfo;
    availableHotels: Hotel[];
    selectedHotel?: Hotel;
    selectedBooking?: Booking;
    userFilter?: UserFilter;
    loggedUser: LoggedUser;
  }
  
export interface BookingContextProps {
    state: BookingContextState;
    dispatch: Dispatch<Events>;
}