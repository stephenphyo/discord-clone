import React, { useEffect, useState } from 'react';

/* CSS Imports */
import './Sidebar.css';

/* MUI Imports */
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Avatar from '@mui/material/Avatar';

/* Component Imports */
import SidebarChannel from './SidebarChannel';

/* Redux Imports */
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slices/userSlice';

/* Firebase Imports */
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { firebaseAuth } from 'services/Firebase/FirebaseAuth';
import firestore from 'services/Firebase/Firestore';

function Sidebar() {

    /* useState */
    const [openCategory, setOpenCategory] = useState(false);
    const [channels, setChannels] = useState([]);

    /* Redux */
    const authUser = useSelector(selectUser);

    /* Functions */
    const logout = () => {
        signOut(firebaseAuth)
            .then(() => console.log('Sign Out Successful'))
            .catch(err => console.log(err.message))
    };

    const addChannel = () => {
        const newChannel = prompt("Enter New Channel Name");

        if (newChannel) {
            addDoc(collection(firestore, 'channels'), {
                name: newChannel
            })
                .then(doc => {
                    console.log(`Channel Added: ${doc.id}`)

                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }

    /* useEffect */
    useEffect(() => {
        onSnapshot(collection(firestore, 'channels'), snapshot => {
            if (snapshot.docs.length === 0) {
                console.log('No Channel');
            } else {
                setChannels(snapshot.docs.map((channel) => {
                    return {
                        id: channel.id,
                        data: channel.data()
                    }
                }));
            }
        })
    }, []);

    /* Testing */
    useEffect(() => {
        console.log(channels)
    }, [channels]);

    return (
        <section className='sidebar'>
            <div className='sidebar_header'>
                Header Name
                <ExpandMoreRoundedIcon />
            </div>

            <div className='sidebar_body'>
                <div className='sidebar_body_category'>
                    <div className={`sidebar_body_category_name ${openCategory ? 'open' : ''}`}
                    onClick={() => setOpenCategory(!openCategory)}>
                        <ExpandMoreRoundedIcon />
                        <h4>Category 01</h4>
                    </div>
                    <AddRoundedIcon id='sidebar_body_category_addChannel'
                        onClick={() => addChannel()} />
                </div>
                <ul className='sidebar_body_channels'>
                    {channels.map((item, index) => (
                        <SidebarChannel key={index} data={item} />
                    ))}
                </ul>
            </div>

            <div className='sidebar_footer'>
                <div className='sidebar_footer_profile'>
                    <Avatar src={authUser.photoURL}
                        onClick={() => logout()} />
                    <div className='sidebar_footer_profile_info'>
                        <p id='username'>{authUser.displayName}</p>
                        <p id='userid'>xxxx</p>
                    </div>
                </div>
                <div className='sidebar_footer_options'>
                    <p id='icon'><MicRoundedIcon /></p>
                    <p id='icon'><HeadphonesRoundedIcon /></p>
                    <p id='icon'><SettingsRoundedIcon /></p>
                </div>
            </div>
        </section>
    );
}

export default Sidebar;