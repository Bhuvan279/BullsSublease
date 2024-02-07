import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
export default function Start() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <>
      <h1>Welcome to BullsSublease {currentUser.displayName}!</h1>
      <Link to="/Login">Sign in</Link>
      <Link to="/SignUp">Create account</Link>
      <Link to="/Profile">Your Profile</Link>
    </>
  );
}
