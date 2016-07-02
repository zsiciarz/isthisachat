import React from 'react';
import {List, OrderedSet} from 'immutable';
import {ChatMessage} from './ChatMessage.js';
import {ChatUserList} from './ChatUserList.js';
import {ChatForm} from './ChatForm.js';

export class ChatRoom extends React.Component {
    static propTypes = {
        websocketAddress: React.PropTypes.string.isRequired
    }

    state = {messages: List(), nicks: OrderedSet()}

    constructor(props) {
        super(props);
        this.socket = new WebSocket(this.props.websocketAddress);
        this.socket.addEventListener('message', this.handleIncomingMessage);
    }

    handleIncomingMessage = (e) => {
        let message = JSON.parse(e.data);
        switch (message.event) {
        case 'nicks':
            const nicks = new OrderedSet(JSON.parse(message.message));
            this.setState({
                nicks,
                messages: this.state.messages
            });
            break;
        case 'join':
            this.setState({
                messages: this.state.messages.push(message),
                nicks: this.state.nicks.add(message.nick)
            });
            break;
        case 'leave':
            this.setState({
                messages: this.state.messages.push(message),
                nicks: this.state.nicks.remove(message.nick)
            });
            break;
        default:
            this.setState({
                messages: this.state.messages.push(message),
                nicks: this.state.nicks
            });
            break;
        }
    }

    handleSend = (message) => {
        this.socket.send(message);
    }

    render() {
        return (
            <div>
            <div className="row">
                <div className="col-lg-9">
                <ul className="well list-unstyled">
                    {this.state.messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                </ul>
                </div>
                <div className="col-lg-3">
                    <ChatUserList nicks={this.state.nicks} />
                </div>
            </div>
            <ChatForm onSend={this.handleSend} />
            </div>
        );
    }
}
