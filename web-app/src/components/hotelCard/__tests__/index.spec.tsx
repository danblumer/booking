import { render, screen, fireEvent } from "@testing-library/react";
import HotelCard from "../index";
import { Hotel } from "../../../types/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { formatCurrency } from "../../../utils/numberUtils";

describe("HotelCard", () => {
  const mockHandleSelectHotel = jest.fn();
  const mockHotelData : Hotel= {
    id: uuidv4(),
    name: "Test Hotel",
    country: "Test Country",
    city: "Test City",
    facilities: ["Facility 1", "Facility 2"],
    rating: 5,
    reviewCount: 100,
    price: 100,
    address: "",
    availableDates: []
  };

  beforeEach(() => {
    render(
      <HotelCard
        hotelData={mockHotelData}
        handleSelectHotel={mockHandleSelectHotel}
      />
    );
  });

  test("renders hotel name", () => {
    expect(screen.getByText(mockHotelData.name)).toBeInTheDocument();
  });

  test("renders hotel location", () => {
    expect(screen.getByText(`${mockHotelData.country} / ${mockHotelData.city}`)).toBeInTheDocument();
  });

  test("renders hotel facilities", () => {
    mockHotelData.facilities.forEach(facility => {
      expect(screen.getByText(`- ${facility}`)).toBeInTheDocument();
    });
  });

  test("renders hotel rating", () => {
    expect(screen.getByText(`${mockHotelData.rating} stars`)).toBeInTheDocument();
  });

  test("renders hotel review count", () => {
    expect(screen.getByText(`${mockHotelData.reviewCount} reviews`)).toBeInTheDocument();
  });

  test("renders hotel price", () => {
    const formattedPrice = formatCurrency(mockHotelData.price);
    expect(screen.getByText(`Price: ${formattedPrice}`)).toBeInTheDocument();
    expect(screen.getByText(`Price: ${formattedPrice}`).textContent).toBe(`Price: ${formattedPrice}`);
  });

  test("calls handleSelectHotel when BOOK button is clicked", () => {
    fireEvent.click(screen.getByText("BOOK"));
    expect(mockHandleSelectHotel).toHaveBeenCalledWith(mockHotelData);
  });
});