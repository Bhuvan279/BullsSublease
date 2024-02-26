import React from 'react'
import { useParams } from 'react-router-dom'
import UserSidebar from '../../components/UserProfile/UserSidebar'
import AccountSettings from '../../components/UserProfile/AccountSettings'
import './UserProfile.css'

const UserProfile = () => {

    const {activePage} = useParams()

    return (
        <div className='userprofile'>
            <div className='userprofilein'>
                <div className='left'>
                    {<UserSidebar activePage={activePage}/>}
                </div>
                <div className='right'>
                    {activePage === 'account-settings' && <AccountSettings/>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile