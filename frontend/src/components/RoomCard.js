import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'

const RoomCard = ({item}) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{padding:"10xp", marginBottom:"30px"}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.img}
        style={{borderRadius:"5px"}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"Outfit"}}>${item.price}</Typography>
        <Typography variant="h9" color="text.secondary">
          {item.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default RoomCard