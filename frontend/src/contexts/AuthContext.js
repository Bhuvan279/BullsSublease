import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: "LOGIN", payload: currentUser }); // Dispatch LOGIN action if user is authenticated
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        dispatch({ type: "LOGOUT", payload: null }); // Dispatch LOGOUT action if user is not authenticated
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
