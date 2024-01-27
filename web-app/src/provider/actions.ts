import { Booking, Hotel, UserInfo } from '../types/Booking';

export enum Actions {
    SET_USER_INFO,
    ADD_BOOKING,
    UPDATE_BOOKING,
    REMOVE_BOOKING,
    SET_ALL_AVAILABLE_HOTELS,
    SET_SELECTED_HOTEL,
}
export type Events =
  | { type: Actions.SET_USER_INFO; payload: UserInfo }
  | { type: Actions.ADD_BOOKING; payload: Booking }
  | { type: Actions.UPDATE_BOOKING; payload: Booking }
  | { type: Actions.REMOVE_BOOKING; payload: Booking }
  | { type: Actions.SET_ALL_AVAILABLE_HOTELS; payload: Hotel[] }
  | { type: Actions.SET_SELECTED_HOTEL; payload: Hotel };