import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../index";
import { useNavigate } from "react-router-dom";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  
  describe("Header Component", () => {
    let navigateMock: jest.Mock;
  
    beforeEach(() => {
      navigateMock = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("renders with logo and menu items", () => {
      render(<Header />);
  
      expect(screen.getByAltText("Hotel Logo")).toBeInTheDocument();
      expect(screen.getByText("Hotels")).toBeInTheDocument();
      expect(screen.getByText("My Reservations")).toBeInTheDocument();
    });
  
    test("navigates to '/' when Hotels menu item is clicked", () => {
      render(<Header />);
  
      fireEvent.click(screen.getByText("Hotels"));
  
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  
    test("navigates to '/mybooking' when My Reservations menu item is clicked", () => {
      render(<Header />);
  
      fireEvent.click(screen.getByText("My Reservations"));
  
      expect(navigateMock).toHaveBeenCalledWith("/mybooking");
    });
  });