import React , { useContext } from 'react'
import './AccountSettings.css'
import { AuthContext } from "../../contexts/AuthContext";



const AccountSettings = () => {
    const { currentUser, dispatch } = useContext(AuthContext);
    return (
        <div className='accountsettings'>
            <h1 className='personalinfo'>Personal Info</h1>
            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='first-name'>First Name</label>
                    <input type='text' name='name' id='name'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='last-name'>Last Name</label>
                    <input type='text' name='name' id='name'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='name' id='name'></input>
                </div>
            </div>
            <button className='accountsettings-button'>Save Changes</button>
        </div>
    )
}

export default AccountSettings