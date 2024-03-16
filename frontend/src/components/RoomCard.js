import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from "react-router-dom";
import DefaultImage from "../images/default_house.jpg"
import {db} from '../firebase'

const RoomCard = ({item, saved}) => {
  const [currSaved, setCurrSaved] = useState(saved)


  const handleSave = () => {
    setCurrSaved(!currSaved)
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    const uid = userFromLocalStorage ? userFromLocalStorage.uid : null;
    const updateSavedRooms = async () => {
      const res = await axios.get(
        `http://localhost:8383/saveRoom/${uid}/${item.id}`
      );
      console.log(res.data)
    }
    updateSavedRooms()
  }

  return (
    <Card sx={{ maxWidth: 345 }} style={{padding:"10xp", marginBottom:"30px"}}>
      
      {item.img ? (
        <CardMedia
            component="img"
            alt=""
            height="140"
            image={item.img}
            style={{ borderRadius: "5px" }}
        />
      ) : (
        <CardMedia
            component="img"
            alt=""
            height="140"
            image={DefaultImage}
            style={{ borderRadius: "5px" , objectFit: "contain"}}
        />
      )}
      <CardContent style={{display:"flex", flexDirection:"column", gap:"5px"}}>
        <CardContent style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"0", alignItems:"center"}}>
          <div >
            <Typography variant="h5" component="div" style={{fontFamily:"Outfit"}}>${item.price}</Typography>
          </div>
          <div>
            <Typography variant="h9" color="text.secondary" style={{fontFamily:"Outfit"}}>
              {item.from.substring(5,7)}/{item.from.substring(8)}/{item.from.substring(2,4)} - {item.to.substring(5,7)}/{item.to.substring(8)}/{item.to.substring(2,4)}
            </Typography>
          </div>
        </CardContent>
        <CardContent  style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"0"}}>
            <PlaceIcon/>
            <Typography variant="h6" component="div" style={{fontFamily:"Outfit", color:"green"}}>{item.apartment}</Typography>
        </CardContent>
      </CardContent>
      <CardContent style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"0 15px 10px 15px", justifyContent:"space-between"}}>
        <Link to={`/room-desc/${item.id}`} ><Button>Show More</Button></Link>
        {currSaved ?  (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" style={{width: "30px", height: "30px", color: "grey"}} onClick={handleSave}>
          <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
          </svg>
        
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{width: "30px", height: "30px", color: "grey"}} onClick={handleSave}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        )

        }

      </CardContent>
    </Card>
  )
}

export default RoomCard