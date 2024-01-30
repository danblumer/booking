import dayjs, { Dayjs } from "dayjs";
import { formatCurrency } from "../utils/numberUtils";

export const calculateTotalStayPrice = (price: number, stayDays: number): number => {
    return price * stayDays;
};
export const calculateTotalStay = (startDate: Dayjs | string | null, endDate: Dayjs | string | null): number => {
    if(!startDate || !endDate) return 0;
    const total = dayjs(endDate).diff(dayjs(startDate), 'day')
    return total < 0 ? 0 : total;
};
export const getHotelTotalPrice = (startDate: Dayjs | string | null, endDate: Dayjs | string | null, price: number): string => {
    const totalStay = calculateTotalStay(startDate, endDate);
    const totalPrice = calculateTotalStayPrice(price, totalStay);
    return formatCurrency(totalPrice);
}

export const getInitialFilterDataRange = () : [Dayjs, Dayjs]=> {
    const startDate = dayjs();
    const endDate = dayjs().add(5, 'day');
    return [startDate, endDate];
}