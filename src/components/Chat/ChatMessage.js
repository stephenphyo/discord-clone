import React, { forwardRef } from 'react';

/* MUI Imports */
import Avatar from '@mui/material/Avatar';

const ChatMessage = forwardRef((props, ref) => {
    return (
        <div className='chat_message'
            ref={ref}>
            <Avatar src={props.data?.author?.photoURL} />
            <div className='chat_message_info'>
                <p>
                    <span id='username'>{props.data?.author?.displayName}</span>
                    <span id='timestamp'>11/11/2011</span>
                </p>
                <p id='content'>{props.data?.content}</p>
            </div>
        </div>
    )
});

export default ChatMessage;