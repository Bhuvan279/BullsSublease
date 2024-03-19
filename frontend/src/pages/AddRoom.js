import "../styles/Addroom.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {storage} from "../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  useLoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import {SkeletonText} from '@chakra-ui/react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import zIndex from "@mui/material/styles/zIndex";


function Addroom() {
    const [apartment, setApartment] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [progress, setProgress] = useState();    
    const [address, setAddress] = useState();
    const navigate = useNavigate()

    const {isLoaded} = useLoadScript({
      googleMapsApiKey: "AIzaSyChNWUyBkZecgdDLBKnHnnImOtWDromc-A",
      libraries: ["places"],
    });
    

    useEffect(() => {
      const uploadFile = () => {
        const name= new Date().getTime()+ file.name;
        const storageRef= ref(storage, file.name);
        const uploadTask= uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot)=>{
          const progress= (snapshot. bytesTransferred / snapshot. totalBytes) * 100;
          setProgress (progress);
          switch (snapshot.state) {
            case "paused":
              console.log ("Upload is Pause"); 
              break;
            case "running":
              console.log ("Upload is Running"); 
              break; 
            default: 
              break;
          }
        }, (error) => {
          console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImg( downloadURL)
        })
      });
        }; 
      file && uploadFile()
      }, [file]);
      
    const handleSubmit = (e) => {
      e.preventDefault();
      const listing = { apartment, address, desc, price, from, to, img};
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      const uid = userFromLocalStorage ? userFromLocalStorage.uid : null;
      // setFile(URL.createObjectURL(e.target.files[0]));
      fetch(`http://localhost:8383/addRoom/${uid}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing)
      }).then(() => {
        console.log('new room added');
        navigate('/')
      })
      
    }
    if (!isLoaded)  return <div>Loading...</div>
    return (
      <div className="create">
        <h2>Add a New Posting</h2>
        <form onSubmit={handleSubmit}>
          <label>Apartment Name</label>
          <input 
            type="text" 
            required 
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
          <label>Address </label>
          <div><PlacesAutocomplete setAddress={setAddress}/></div>
          <label>Price per month</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />
          <label>From</label>
          <input
            type="date"
            required
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
          />
          <label>To</label>
          <input
            type="date"
            required
            value={to}
            onChange={(e)=>setTo(e.target.value)}
          />
         
          <label>Contact me</label>
          <textarea
            required
            value={desc}
            placeholder="How does the person contact you? eg: email, phone number, social media etc."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label>Upload images of your apartment and room.</label>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
          <button>Add Posting</button>
        </form>      
      </div>
    );
}


const PlacesAutocomplete=({setAddress})=>{
  const {
    ready,
    value,
    setValue,
    suggestions:{status, data},
    clearSuggestions,
  }= usePlacesAutocomplete();

  const handleSelect= async (address) =>{
    setValue(address, false)
    clearSuggestions()
    const results= await getGeocode({address})
    const {lat,lng} = await getLatLng(results[0])
    setAddress({address,lat,lng})
  }
  return (
    <div>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        disabled={!ready} 
        className="combobox-input" 
        placeholder="Enter address."
      />
      {status === "OK" && (
        <ul className="pop">
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
} 

export default Addroom;
