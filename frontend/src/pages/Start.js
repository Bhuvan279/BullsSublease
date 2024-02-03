import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Start() {
  const location = useLocation();
  const { email } = location.state || {};
  return (
    <>
      <h1>Welcome to BullsSublease!</h1>
      <Link to="/Login">Sign in</Link>
      <Link to="/SignUp">Create account</Link>
      {email && <p>Welcome {email}</p>}
    </>
  );
}
