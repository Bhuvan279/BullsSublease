import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from "react-router-dom";
import DefaultImage from "../images/default_house.jpg"

const RoomCard = ({item}) => {
  

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
      <Link to={`/room-desc/${item.id}`} ><Button>Show More</Button></Link>
    </Card>
  )
}

export default RoomCard