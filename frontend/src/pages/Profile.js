import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function Profile(props) {
  const { inputs } = props;
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const { dispatch } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome {currentUser.displayName}</h1>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "LOGOUT", payload: null });
        }}
      >
        Log out
      </button>
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
