import { Dayjs } from "dayjs";

export interface Hotel {
    id: string
    name: string;
    address:string;
    country: string;
    city: string;
    availableDates: string[];
    facilities: string[];
    price: number;
    rating: number;
    reviewCount: number;
}
export interface LoggedUser {
    id: string
    name: string;
    lastName: string;
    email: string;
}
export interface UserInfo extends LoggedUser{
    address:string;
}
export interface UserFilter {
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
    searchTerm?: string;
}
export interface Booking {
    id: string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    user: UserInfo;
    price: number;
}
