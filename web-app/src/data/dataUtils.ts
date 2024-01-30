import { Dayjs } from "dayjs";
import { Hotel } from "../types/Interfaces";
import { v4 as uuidv4 } from "uuid";


export const generateItems = (startDate: Dayjs, endDate: Dayjs, hotelName?: string = 'Fake Name'): Hotel[] => {
    const items: Hotel[] = [];
    const diff = endDate.diff(startDate, "day");
    const days = diff <= 0 || diff > 15 ? 15 : diff;

    for (let i = 1; i <= days; i++) {
        const item: Hotel = {
            id: uuidv4(),
            facilities: [
                `facilities ${Math.floor(Math.random() * 3) + 1}`,
                `facilities ${Math.floor(Math.random() * 3) + 1}`,
                `facilities ${Math.floor(Math.random() * 3) + 1}`,
            ],
            name: `Hotel Casino - ${hotelName}-${i}`,
            country: "USA",
            city: "Las Vegas",
            price: Math.random() * 1000,
            rating: Math.floor(Math.random() * 5) + 1,
            reviewCount: Math.floor(Math.random() * 10000),
            availableDates: [
                "2001-10-10",
                "2001-10-11",
            ],
            address: `Hotel Casino Address${i}`,
        };

        items.push(item);
    }

    return items;
}
