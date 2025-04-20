import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { getUser } from "../../services/apiUserData";
const authInitialState = { user: null, isAuthenticated: false };
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}
export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    authInitialState
  );
  // const userData = getUser();
  function login(email, password) {
    if (email === userData.email && password === userData.password) {
      dispatch({ type: "login", payload: userData });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}
