import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //collect user email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  //reset content of input
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  //only accept passwod with at least 6 characters and match the check
  const validPassword = () => {
    let isValid = true;
    if (password !== "" && password.length < 6) {
      isValid = false;
      setError("Password must have more than 6 characters!");
    }
    if (password !== passwordCheck) {
      isValid = false;
      setError("Password does not match!");
    }
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    //only create user if password is valid
    if (validPassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          //reset the input text content and component state
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordCheckRef.current.value = "";
          navigate("/", {
            state: { email: email },
          });
        })
        .catch((error) => {
          setError("Something is not working, please try again");
        });
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
          required
        />
        <input
          type="password"
          placeholder="Enter your password again"
          onChange={(e) => setPasswordCheck(e.target.value)}
          ref={passwordCheckRef}
          required
        />
        <button type="submit">Sign up</button>
        <Link to="/Login">Already have an account?</Link>

        {/* display error message */}
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default SignUpForm;
