import { AppBar, Box, styled, Toolbar, Typography, InputBase, Grid, Paper, Container } from '@mui/material'
import React, { useState , useEffect} from 'react'
import axios from 'axios'
import {Users} from '../user'
import RoomCard from './RoomCard'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/Navbar.css'

const StyledToolbar = styled(Toolbar)({
  display:"flex",
  justifyContent:"space-between"
})

const Search = styled("div")(({theme}) => ({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius:theme.shape.borderRadius,
  width:"40%",
}))

const Icons = styled(Box)(({theme}) => ({
  backgroundColor:"white"
}))

const Navbar = () => {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")


  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const fetchData = async () =>{
      const res = await axios.get(`http://localhost:8383?q=${query}&maxPrice=${maxPrice}&minPrice=${minPrice}`)
      setData(res.data)
      console.log(res.data)
    }
    fetchData()
  }, [query, maxPrice, minPrice])

  
  return (
    <>
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant='h6' style={{fontFamily:"Outfit"}}>SUBLEASE.IO</Typography>
        <Search><InputBase placeholder='search...' onChange={e=>setQuery(e.target.value)} /></Search>
        <FilterListIcon onClick={showSidebar}/>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'> 
            <div className='navbar-toggle'>
              <CloseIcon onClick={showSidebar} style={{color:"black"}}/>
            </div>
            <div className='navbar-toggle'>
              <Typography style={{fontFamily:"Outfit", color:"black"}}>PRICE RANGE: </Typography>
              <InputBase placeholder='search...' onChange={e=>setMinPrice(e.target.value)} />
              <InputBase placeholder='search...' onChange={e=>setMaxPrice(e.target.value)} />
            </div>
          </ul>
        </nav>
      </StyledToolbar>
    </AppBar>
    <Container maxWidth="lg">
      <Grid container spacing={5} style={{marginTop:"10px", marginBottom:"10px"}}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={4} ms={4} key={index}>
            <RoomCard item={item}/>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  )
}

export default Navbar