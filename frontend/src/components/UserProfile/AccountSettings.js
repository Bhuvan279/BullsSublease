import React , { useContext } from 'react'
import './AccountSettings.css'
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
    const { currentUser, dispatch } = useContext(AuthContext);
    const [apartment, setApartment] = useState('');
    const [email, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [progress, setProgress] = useState();    
    const [address, setAddress] = useState();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const listing = { email, price, from, to};
        // setFile(URL.createObjectURL(e.target.files[0]));
        fetch(`http://localhost:8383/setPreferences/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listing)
        }).then(() => {
            console.log('new preference added');
            navigate('/')
        })
        }
    return (
        <div className='accountsettings'>
             <h2>Your Room Preferences</h2>
             <br></br>
             <h5>Set your room preferences to receive email notifications whenever a room matching your preferences is uploaded.</h5>
             <br></br>
        <form onSubmit={handleSubmit}>
          <label>Budget for room(per month)</label>
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
         
          <label>Email address</label>
          <input
            required
            value={email}
            placeholder="Email to receive notifications."
            onChange={(e) => setDesc(e.target.value)}
          ></input>
           <button>Save Preferences</button>
        </form>      
        </div>
    )
}

export default AccountSettings