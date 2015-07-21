class ChatMessage extends React.Component {
    render() {
        return <li>{this.props.message}</li>;
    }
}

class ChatForm extends React.Component {
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
    constructor(props) {
        super(props);
        this.socket = new WebSocket(this.props.websocketAddress);
        this.socket.addEventListener('message', this.handleIncomingMessage);
        this.state = {messages: []};
    }

    handleIncomingMessage = (e) => {
        let messages = this.state.messages;
        messages.push(JSON.parse(e.data));
        this.setState({messages: messages});
    }

    handleSend = (message) => {
        this.socket.send(message);
    }

    render() {
        return <div>
            <div className="well" id="chat-wrap">
                <ul className="list-unstyled">
                    {this.state.messages.map(msg => <ChatMessage key={msg.id} message={msg.message} />)}
                </ul>
            </div>
            <ChatForm onSend={this.handleSend} />
            </div>;
    }
}

React.render(
    <ChatRoom websocketAddress="ws://127.0.0.1:6639" />,
    document.getElementById('chatroom')
);
