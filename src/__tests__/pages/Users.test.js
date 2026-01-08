import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders, mockUser } from "../utils/testUtils";
import Users from "../../pages/users/Users";

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe("Users Page", () => {
  const initialState = {
    users: {
      users: [mockUser],
      loading: false,
      error: null,
    },
  };

  test("renders page title and add button", () => {
    renderWithProviders(<Users />, { preloadedState: initialState });

    expect(screen.getByText(/users management/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add user/i })
    ).toBeInTheDocument();
  });
});
