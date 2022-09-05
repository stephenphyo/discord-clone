import React from 'react';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';

function ChatMember() {
    return (
        <li className='chat_member'>
            <div className='chat_member_pfp'>
                <Avatar />
                <div id='online'></div>
            </div>
            <div className='chat_member_info'>
                <p id='username'>Stephen</p>
                <p id='status'>From the ashes we will rise</p>
            </div>
        </li>
    );
}

export default ChatMember;