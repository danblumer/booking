import dayjs from "dayjs";
import {
  calculateTotalStayPrice,
  calculateTotalStay,
  getHotelTotalPrice,
  getInitialFilterDataRange,
} from "../hotelServices";

describe("calculateTotalStayPrice", () => {
  it("should calculate the total stay price correctly", () => {
    expect(calculateTotalStayPrice(100, 5)).toBe(500);
    expect(calculateTotalStayPrice(50, 3)).toBe(150);
    expect(calculateTotalStayPrice(80, 7)).toBe(560);
  });
});

describe("calculateTotalStay", () => {
  it("should calculate the total stay correctly", () => {
    const startDate = dayjs("2022-01-01");
    const endDate = dayjs("2022-01-05");
    expect(calculateTotalStay(startDate, endDate)).toBe(4);
  });

  it("should return 0 if either startDate or endDate is null", () => {
    expect(calculateTotalStay(null, dayjs())).toBe(0);
    expect(calculateTotalStay(dayjs(), null)).toBe(0);
    expect(calculateTotalStay(null, null)).toBe(0);
  });

  it("should return 0 if endDate is before startDate", () => {
    const startDate = dayjs("2022-01-05");
    const endDate = dayjs("2022-01-01");
    expect(calculateTotalStay(startDate, endDate)).toBe(0);
  });
});

describe("getHotelTotalPrice", () => {
  it("should calculate the hotel total price correctly", () => {
    const startDate = dayjs("2022-01-01");
    const endDate = dayjs("2022-01-05");
    const price = 100;
    expect(getHotelTotalPrice(startDate, endDate, price)).toBe("$400.00");
  });
});

describe("getInitialFilterDataRange", () => {
  it("should return an array with startDate and endDate", () => {
    const [startDate, endDate] = getInitialFilterDataRange();
    expect(startDate.isSame(dayjs(), "day")).toBe(true);
    expect(endDate.isSame(dayjs().add(5, "day"), "day")).toBe(true);
  });
});