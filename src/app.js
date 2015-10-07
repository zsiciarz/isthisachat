import React from 'react';
import ReactDom from 'react-dom';
import {ChatRoom} from './components/ChatRoom.js';

ReactDom.render(
    <ChatRoom websocketAddress="ws://127.0.0.1:6639" />,
    document.getElementById('chatroom')
);
