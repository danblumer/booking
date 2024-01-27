export interface Hotel {
    id: string
    name: string;
    address:string;
    availableDates:[];
}
export interface UserInfo {
    id: string
    name: string;
    address:string;
}
export interface Booking {
    id: string;
    startDate: string;
    endDate: string;
    user: UserInfo
}