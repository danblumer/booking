// context/BookingContext.tsx
import { Dispatch } from 'react';
import { Booking, Hotel, UserInfo } from '../types/Booking';
import { Events } from './actions';

export interface BookingContextState {
    bookings: Booking[];
    userInfo?: UserInfo;
    availableHotels: Hotel[];
  }
  
export interface BookingContextProps {
    state: BookingContextState;
    dispatch: Dispatch<Events>;
}