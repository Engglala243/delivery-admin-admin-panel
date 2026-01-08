import userReducer, {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../redux/slices/userSlice";

describe("userSlice", () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  test("should return initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("should handle fetchUsers.pending", () => {
    const action = { type: fetchUsers.pending.type };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test("should handle fetchUsers.fulfilled", () => {
    const users = [{ _id: "1", name: "John Doe" }];
    const action = { type: fetchUsers.fulfilled.type, payload: users };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(users);
  });

  test("should handle fetchUsers.rejected", () => {
    const error = "Failed to fetch users";
    const action = { type: fetchUsers.rejected.type, payload: error };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  test("should handle createUser.fulfilled", () => {
    const newUser = { _id: "2", name: "Jane Doe" };
    const action = { type: createUser.fulfilled.type, payload: newUser };
    const state = userReducer(initialState, action);

    expect(state.users).toContain(newUser);
  });

  test("should handle updateUser.fulfilled", () => {
    const existingUser = { _id: "1", name: "John Doe" };
    const updatedUser = { _id: "1", name: "John Smith" };
    const stateWithUser = { ...initialState, users: [existingUser] };

    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer(stateWithUser, action);

    expect(state.users[0]).toEqual(updatedUser);
  });

  test("should handle deleteUser.fulfilled", () => {
    const user = { _id: "1", name: "John Doe" };
    const stateWithUser = { ...initialState, users: [user] };

    const action = { type: deleteUser.fulfilled.type, payload: "1" };
    const state = userReducer(stateWithUser, action);

    expect(state.users).toHaveLength(0);
  });
});
