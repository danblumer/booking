
import { render, fireEvent, screen } from '@testing-library/react';
import { useBookingContext } from '../../../provider/BookingContextProvider';
import { useNavigate } from 'react-router';
import MyReservations from '../index';
import { Actions } from '../../../provider/actions';

jest.mock('../../../provider/BookingContextProvider');
jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('MyReservations', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    (useBookingContext as jest.Mock).mockReturnValue({
      state: {
        bookings: [
          {
            id: 'booking1',
            hotel: { name: 'Hotel 1' },
            startDate: new Date(),
            endDate: new Date(),
            user: { name: 'John', lastName: 'Doe' },
            price: 100,
          },
        ],
      },
      dispatch: mockDispatch,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<MyReservations />);
  });

  test('calls dispatch and navigate with correct arguments when Update button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: Actions.SET_SELECTED_BOOKING,
      payload: {
        id: 'booking1',
        hotel: { name: 'Hotel 1' },
        startDate: expect.any(Date),
        endDate: expect.any(Date),
        user: { name: 'John', lastName: 'Doe' },
        price: 100,
      },
    });

    expect(mockNavigate).toHaveBeenCalledWith('/checkout/booking1');
  });
});