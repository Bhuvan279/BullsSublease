import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Start() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      console.log("User not authenticated, redirecting...");
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h1>Welcome to BullsSublease {currentUser.displayName}!</h1>
      <Link to="/login">Sign in</Link>
      <Link to="/signup">Create account</Link>
      <Link to="/profile">Your Profile</Link>
    </>
  );
}
