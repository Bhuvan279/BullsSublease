import "../styles/Addroom.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {storage} from "../firebase";
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { Navigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import {SkeletonText} from '@chakra-ui/react'

function Addroom() {
    const [apartment, setApartment] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [progress, setProgress] = useState();    

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
      const listing = { apartment, desc, price, from, to, img};

      // setFile(URL.createObjectURL(e.target.files[0]));
      fetch('http://localhost:8383/addRoom', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listing)
      }).then(() => {
        console.log('new blog added');
        <Navigate to="/" />
      })

    }
  
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
         
          <label>Description</label>
          <textarea
            required
            value={desc}
            placeholder="Enter description/bus stops near your place."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <label>Upload images of your apartment and room.</label>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
          <button>Add Blog</button>
        </form>
      </div>
    );
}

export default Addroom;
