import { Booking, Hotel, UserFilter, UserInfo } from '../types/Interfaces';

export enum Actions {
    SET_USER_INFO,
    ADD_BOOKING,
    UPDATE_BOOKING,
    REMOVE_BOOKING,
    SET_ALL_AVAILABLE_HOTELS,
    SET_SELECTED_HOTEL,
    SET_USER_FILTER,
}
export type Events =
  | { type: Actions.SET_USER_INFO; payload: UserInfo }
  | { type: Actions.ADD_BOOKING; payload: Booking }
  | { type: Actions.UPDATE_BOOKING; payload: Booking }
  | { type: Actions.REMOVE_BOOKING; payload: string }
  | { type: Actions.SET_ALL_AVAILABLE_HOTELS; payload: Hotel[] }
  | { type: Actions.SET_SELECTED_HOTEL; payload: Hotel | undefined }
  | { type: Actions.SET_USER_FILTER; payload: UserFilter };