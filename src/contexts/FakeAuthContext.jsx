/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  isLoading: false,
  error: "",
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "user/loggedIn":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
      };

    case "user/loggedOut":
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
      };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "user/loggedIn", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "user/loggedOut" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new Error("AuthContext was used outside AuthProvuder");
  return value;
}

export { AuthProvider, useAuth };
