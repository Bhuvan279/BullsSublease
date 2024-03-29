import {
  AppBar,
  Box,
  styled,
  Toolbar,
  Typography,
  InputBase,
  Grid,
  Paper,
  Container,
  Button,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";
import FilterListIcon from "@mui/icons-material/FilterList";
import "../styles/Navbar.css";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
}));

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [savedRooms, setSavedRooms] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [address, setAddress] = useState("");
  const { currentUser, dispatch } = useContext(AuthContext);
  const [profileBar, setProfileBar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showProfileBar = () => setProfileBar(!profileBar);

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const uid = userFromLocalStorage ? userFromLocalStorage.uid : null;
    const getSavedRooms = async () => {
      const res = await axios.get(
        `http://localhost:8383/getSavedRooms/${uid}`
      );
      setSavedRooms(res.data)
    }
    getSavedRooms()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8383?q=${query}&minPrice=${minPrice}&maxPrice=${maxPrice}&from=${from}&to=${to}`
      );
      setFilteredData(res.data)

    };
    fetchData();
    
  }, [query, minPrice, maxPrice, from, to]);

  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the logout action
    auth
      .signOut(currentUser)
      .then(() => {
        console.log("Logged out");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT", payload: null });
        <Navigate to="/login" />;
      })
      .catch((error) => {
        console.log("There is an error");
      });
    // Clear user from local storage
  };
  
  return (
    <>
      <AppBar position="sticky" className="appbar">
        <StyledToolbar>
          <Typography variant="h6" style={{ fontFamily: "Outfit" }}>
            SUBLEASE.IO
          </Typography>
          <div className="navbar-search">
            <FilterListIcon
              onClick={showSidebar}
              style={{ marginRight: "10px" }}
            />
            <Search>
              <InputBase
                placeholder="search..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </Search>
          </div>
          <div>
            <img
              src="./default-profile.jpg"
              alt="Logo"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              onClick={showProfileBar}
            />
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items">
              <div className="price-container">
                <Typography style={{ fontFamily: "Outfit", color: "black" }}>
                  PRICE RANGE:{" "}
                </Typography>
                <div className="price-minmax-container">
                  <InputBase
                    placeholder="Min"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="min-container"
                  />
                  <InputBase
                    placeholder="Max"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="max-container"
                  />
                </div>
              </div>
              <div className="date-container">
                <Typography style={{ fontFamily: "Outfit", color: "black" }}>
                  DATE RANGE:{" "}
                </Typography>
                <div className="date-fromto-container">
                  <InputBase
                    type="date"
                    placeholder="From"
                    onChange={(e) => setFrom(e.target.value)}
                    className="min-container"
                  />
                  <InputBase
                    type="date"
                    placeholder="To"
                    onChange={(e) => setTo(e.target.value)}
                    className="max-container"
                  />
                </div>
              </div>
            </ul>
          </nav>
          <nav className={profileBar ? "profile-menu active" : "profile-menu"}>
            <ul className="profile-menu-items">
              <div className="price-container">
                <Link to="/user/account-settings"><Button style={{ fontFamily: "Outfit", color: "black" }} >
                  {currentUser.displayName}
                </Button></Link>
                <Button
                  style={{ fontFamily: "Outfit", color: "black" }}
                  onClick={handleLogout}
                >
                  Logout
                  <LogoutIcon/>
                </Button>
                <Link to="/addroom"><Button style={{ fontFamily: "Outfit", color: "black" }}>
                  Add Room
                </Button></Link>
              </div>
            </ul>
          </nav>
        </StyledToolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          {filteredData && filteredData.map((item, index) => (
            <Grid item xs={12} sm={4} ms={4} key={index}>
              {savedRooms.includes(item.id) ? (
                <RoomCard item={item} saved={true}/>
                ) : (
                <RoomCard item={item} saved={false}/>          
                )
              }    
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Navbar;
