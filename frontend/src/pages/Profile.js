import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { dispatch } = useContext(AuthContext);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "LOGOUT", payload: null });
        }}
      >
        Log out
      </button>
    </>
  );
}
