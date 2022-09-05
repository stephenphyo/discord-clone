import React from 'react';

/* CSS Imports */
import './SidebarChannel.css';

/* Redux Imports */
import { useDispatch } from 'react-redux';
import { setChannelInfo } from 'app/slices/channelSlice';

function SidebarChannel({ data }) {

    /* Redux */
    const dispatch = useDispatch();

    return (
        <li className='sidebar_channel' onClick={() => dispatch(
            setChannelInfo({
                channelId: data.id,
                channelName: data.data.name
            })
        )}>
            {data.data.name}
        </li>
    );
}

export default SidebarChannel;