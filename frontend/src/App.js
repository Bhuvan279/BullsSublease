import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Users } from "./user";
import Addroom from "./pages/AddRoom"
import Maps from "./pages/Map"

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            index
            path="/"
            element={
              <RequireAuth>
                <Start />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile inputs={Users} />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/addroom"
            element={
              <RequireAuth>
                <Addroom />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/room-desc/:roomID"
            element={
              <RequireAuth>
                <Maps />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
