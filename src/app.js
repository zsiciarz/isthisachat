import React from 'react/addons';
import {ChatRoom} from './components/ChatRoom.js';

React.render(
    <ChatRoom websocketAddress="ws://127.0.0.1:6639" />,
    document.getElementById('chatroom')
);
