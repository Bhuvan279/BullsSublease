import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
} from "@mui/material";

const SignUpForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Collect user email and password
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // Only accept password with at least 6 characters and match the check
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

  const handleSignUp = (e) => {
    e.preventDefault();
    // Only create user if password is valid
    if (validPassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          // Update profile after user is created
          updateProfile(user, {
            displayName: `${firstname} ${lastname}`,
            email: email,
          }).then(() => {
            // Reset the input text content and component state
            setFirstname("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPasswordCheck("");
            navigate("/", {
              state: { email: email },
            });
          });
        })
        .catch((error) => {
          setError("Something is not working, please try again");
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <div className="login">
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm Password"
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <MuiLink component={Link} to="/login" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
          {/* Display error message */}
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;
