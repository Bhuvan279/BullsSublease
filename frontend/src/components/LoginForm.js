import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/", {
          state: { email: email },
        });
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <Link to="/SignUp">Don't have an account yet?</Link>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default LoginForm;
