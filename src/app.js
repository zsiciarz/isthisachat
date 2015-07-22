import React from 'react/addons';
import {List} from 'immutable';

class ChatMessage extends React.Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired
    }

    componentDidUpdate() {
        React.findDOMNode(this).scrollIntoView(true);
    }

    render() {
        return (
            <li>
                <span className="nick">{this.props.message.nick}: </span>
                {this.props.message.message}
            </li>
        );
    }
}

class ChatUserList extends React.Component {
    render () {
        return (
            <ul>
            </ul>
        );
    }
}

class ChatForm extends React.Component {
    static propTypes = {
        onSend: React.PropTypes.func.isRequired
    }

    handleSubmit = (e) => {
        let input = React.findDOMNode(this.refs.message);
        this.props.onSend(input.value);
        input.value = '';
        e.preventDefault();
    }

    render() {
        return <div className="row">
        <div className="col-lg-4">
        <form onSubmit={this.handleSubmit}>
            <div className="input-group">
                <input type="text" className="form-control" ref="message" autoFocus />
                <span className="input-group-btn">
                    <button className="btn btn-primary">Send!</button>
                </span>
            </div>
        </form>
        </div>
        </div>;
    }
}

class ChatRoom extends React.Component {
    static propTypes = {
        websocketAddress: React.PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.socket = new WebSocket(this.props.websocketAddress);
        this.socket.addEventListener('message', this.handleIncomingMessage);
        this.state = {messages: List()};
    }

    handleIncomingMessage = (e) => {
        let message = JSON.parse(e.data);
        this.setState({messages: this.state.messages.push(message)});
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
                    <ChatUserList />
                </div>
            </div>
            <ChatForm onSend={this.handleSend} />
            </div>
        );
    }
}

React.render(
    <ChatRoom websocketAddress="ws://127.0.0.1:6639" />,
    document.getElementById('chatroom')
);
