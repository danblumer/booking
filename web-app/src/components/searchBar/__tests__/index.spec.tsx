import { render, screen, fireEvent } from "@testing-library/react";
import { Dayjs } from "dayjs";
import SearchBar from "../index";
import { useBookingContext } from "../../../provider/BookingContextProvider";
import { Actions } from "../../../provider/actions";
import { Hotel } from "../../../types/Interfaces";
jest.mock("../../../provider/BookingContextProvider");

describe("SearchBar", () => {
  const mockDispatch = jest.fn();
  const mockState = {
    userFilter: {
      startDate: null as Dayjs | null,
      endDate: null as Dayjs | null,
      searchTerm: "",
    },
    data: [] as Hotel[],
  };

  beforeEach(() => {
    (useBookingContext as jest.Mock).mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct initial values", () => {
    render(<SearchBar />);

    expect(screen.getByLabelText("Hotel Name")).toHaveValue("");
  });

  test("dispatches SET_USER_FILTER action with searchTerm when hotel name is changed", () => {
    render(<SearchBar />);
    const hotelNameInput = screen.getByLabelText("Hotel Name");

    fireEvent.change(hotelNameInput, { target: { value: "Test Hotel" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.SET_USER_FILTER,
      payload: { ...mockState.userFilter, searchTerm: "Test Hotel" },
    });
  });

  });
