import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import{
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";
//"use client";
import {
    useLoadScript,   
  } from '@react-google-maps/api'

function Maps(){
    const params = useParams()
    const [roomInfo, setRoomInfo] = useState({});
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [position, setPosition] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
          const res = await axios.get(
            `http://localhost:8383/room-desc/${params.roomID}`
          );
          setRoomInfo({...res.data})
          setPosition({address: res.data.address.address, lat: res.data.address.lat, lng: res.data.address.lng})
        };
        fetchData();
      }, []);
      
    
    return (
        <div>
        <APIProvider apiKey="AIzaSyChNWUyBkZecgdDLBKnHnnImOtWDromc-A">
            <div style={{height:"50vh"}}>
                {position.lat && position.lng && (
                    <Map zoom={18} center={{ lat: position.lat, lng: position.lng }} mapId="90e32c63633aacbd">
                        <AdvancedMarker position={{lat: position.lat, lng: position.lng}}>
                            <Pin />
                        </AdvancedMarker>
                    </Map>
                )}
            </div>
        </APIProvider>
        <div style={{ backgroundColor: '#EAF7EE', padding: '20px' }}>
                    <h2 style={{ color: 'green', marginBottom: '10px' }}>Apartment Information</h2>
                    <p><strong>Apartment Name:</strong> {roomInfo.apartment}</p>
                    <p><strong>Price per month:</strong> {roomInfo.price}</p>
                    <p><strong>Address:</strong> {position.address}</p> Assuming position contains address
                    <p><strong>Dates Available:</strong> {roomInfo.from} until {roomInfo.to}</p>
                    <p><strong>Contact me:</strong> {roomInfo.desc}</p>
                </div>
                {roomInfo.img && (
                <div style={{ flex: '1' }}>
                    <img src={roomInfo.img} alt="Apartment" style={{ maxWidth: '100%', maxHeight: '50vh' }} />
                </div>
            )}
        </div>
    )
}
export default Maps