export interface Hotel {
    id: string
    name: string;
    address:string;
    country: string;
    city: string;
    availableDates: string[];
    amenities: string[];
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
    quantityPeople: number;
    startDate: string;
    endDate: string;
    searchTerm: string
}
export interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    user: UserInfo;
    price: number;
}
