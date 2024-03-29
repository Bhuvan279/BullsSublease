import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
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

import '../styles/Login.css'

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="container">
      <div className="login">
        <Typography variant="h5" align="center" gutterBottom style={{ fontFamily: "Outfit", color: "black" }}>
          Login
        </Typography>
        <form onSubmit={handleLogin} className="form">
          <Grid container spacing={2}>
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
          </Grid>
          <Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{fontFamily: "Outfit", backgroundColor:"green"}}>
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item style={{marginTop: "5px"}}>
              <MuiLink component={Link} to="/signup" variant="body2" style={{fontFamily: "Outfit"}}>
                Don't have an account? Sign Up
              </MuiLink>
            </Grid>
          </Grid>
          </Grid>
          {error && (
            <Typography variant="body2" color="error">
              Wrong email or password!
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
