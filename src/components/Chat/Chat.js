import React, { useState, useRef, useEffect } from 'react';

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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import GifRoundedIcon from '@mui/icons-material/GifRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';

/* Component Imports */
import ChatMessage from './ChatMessage';
import ChatMember from './ChatMember';

/* Redux Imports */
import { useSelector } from 'react-redux';
import { selectChannel } from 'app/slices/channelSlice';
import { selectUser } from 'app/slices/userSlice';

/* Firebase Imports */
import { onSnapshot, collection, query, orderBy, addDoc } from 'firebase/firestore';
import firestore from 'services/Firebase/Firestore';

function Chat() {

    /* useState */
    const [showMemberList, setShowMemberList] = useState(true);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    /* Redux */
    const channel = useSelector(selectChannel);
    const authUser = useSelector(selectUser);

    /* Testing */
    const lastMsgRef = useRef();

    /* Firestore */
    // const messagesRef = collection(firestore, 'channels', channel.channelId, 'messages');

    /* Functions */
    const send = () => {
        const messagesRef = collection(firestore, 'channels', channel.channelId, 'messages');
        addDoc(messagesRef, {
            author: authUser,
            content: message
        });
        setMessage('');
    };

    /* useEffect */
    useEffect(() => {
        if (channel.channelId) {
            const messagesRef = collection(firestore, 'channels', channel.channelId, 'messages');
            onSnapshot(query(messagesRef, orderBy("content", "asc")), snapshot => {
                setMessages(snapshot.docs.map(message => {
                    return {
                        id: message.id,
                        data: message.data()
                    }
                }))
            })
        }
    }, [channel.channelId]);

    /* Testing */
    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <section className='chat'>
            {/* Chat Header */}
            <div className='chat_header'>
                <div className='chat_header_name'>
                    {channel?.channelName}
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
                        {messages.map((item, index) => {
                            const lastMessage = index - 1;
                            return (
                                <ChatMessage key={index} ref={lastMessage ? lastMsgRef : null}
                                    data={item.data} />
                            )
                        })}
                    </ul>
                    <div className='chat_body_chatspace_scroll2end'>
                        <ExpandMoreRoundedIcon onClick={() => lastMsgRef.current?.scrollIntoView({ behavior: 'smooth'})} />
                    </div>

                    {/* Chat Body Chatspace Input */}
                    <div className='chat_body_chatspace_input'>
                        <div className='chat_body_chatspace_input_wrapper'>
                            <AddCircleRoundedIcon />
                            <input type='text'
                                placeholder='Enter message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => { e.key === 'Enter' && send() }} />
                            <div className='chat_body_chatspace_input_options'>
                                <CardGiftcardRoundedIcon />
                                <GifRoundedIcon id='gif' />
                                <SentimentSatisfiedAltRoundedIcon />
                            </div>
                        </div>
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

