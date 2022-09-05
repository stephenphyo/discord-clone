import React, { useState, useRef } from 'react';

/* CSS Imports */
import './Chat.css';

/* MUI Imports */
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

/* Component Imports */
import ChatMessage from './ChatMessage';
import ChatMember from './ChatMember';

function Chat() {

    /* useState */
    const [showMemberList, setShowMemberList] = useState(true);
    const [search, setSearch] = useState('');

    /* Testing */
    const lastMsgRef = useRef();

    return (
        <section className='chat'>
            {/* Chat Header */}
            <div className='chat_header'>
                <div className='chat_header_name'>
                    a
                </div>
                <div className='chat_header_options'>
                    <NotificationsRoundedIcon />
                    <PushPinRoundedIcon id='pin' />
                    <PeopleAltRoundedIcon
                        className={`${showMemberList ? 'selected' : ''}`}
                        onClick={() => setShowMemberList(!showMemberList)} />
                    <div className={`chat_header_options_search ${search.length !== 0 ? 'expand' : ''}`}>
                        <input type='text'
                            placeholder='Search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        <div className='chat_header_options_search_icon'>
                            {
                                search.length === 0
                                ? <SearchRoundedIcon id='search' />
                                    : <CloseRoundedIcon onClick={() => setSearch('')} />
                            }
                        </div>
                    </div>
                    <InboxRoundedIcon />
                    <HelpRoundedIcon />
                </div>
            </div>

            {/* Chat Body */}
            <div className='chat_body'>
                {/* Chat Body Chatspace */}
                <div className='chat_body_chatspace'>
                    <ul className='chat_body_chatspace_messages'>
                        {/* <div className='chat_message' id='test'>Message</div> */}
                        {Array(12).fill().map((item, index) => {
                            const lastMessage = index - 1;
                            return (<ChatMessage key={index} ref={lastMessage ? lastMsgRef : null} />)
                        })}
                    </ul>
                    <div className='chat_body_chatspace_scroll2end'>
                        <ExpandMoreRoundedIcon onClick={() => lastMsgRef.current?.scrollIntoView({ behavior: 'smooth'})} />
                    </div>

                    {/* Chat Body Chatspace Input */}
                    <div className='chat_body_chatspace_input'>
                        Footer
                    </div>
                </div>

                {/* Chat Body Members */}
                <div className={`chat_body_members ${showMemberList ? 'show' : ''}`}>
                    <p className='chat_body_members_role'>
                        <span id='badge'></span>
                        Admin -
                        <span id='count'>10</span>
                    </p>
                    <ul className='chat_body_members_list'>
                        {Array(100).fill().map((iten, index) => {
                            return (
                                <ChatMember />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Chat;