import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
export default function Profile(props) {
  const { inputs } = props;
  const { currentUser, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the logout action
    auth
      .signOut(currentUser)
      .then(() => {
        console.log("Logged out");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT", payload: null });
        <Navigate to="/login" />;
      })
      .catch((error) => {
        console.log("There is an error");
      });
    // Clear user from local storage
  };

  if (!currentUser) {
    return <CircularProgress />;
  }

  return (
    <>
      <h1>Welcome {currentUser.displayName}</h1>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
      <Link to="/">Home</Link>
      {inputs.map((input) => {
        return (
          <div className="demoAccount" key={`${input.first_name}-${input.id}`}>
            <h1>
              {input.id}. {input.first_name} {input.last_name}
            </h1>
            <p>Email: {input.email}</p>
            <p>Gender: {input.gender}</p>
          </div>
        );
      })}
    </>
  );
}
