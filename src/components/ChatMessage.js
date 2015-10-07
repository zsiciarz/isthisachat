import React from 'react';

export class ChatMessage extends React.Component {
    static propTypes = {
        message: React.PropTypes.object.isRequired
    }

    componentDidUpdate() {
        React.findDOMNode(this).scrollIntoView(true);
    }

    render() {
        const event = this.props.message.event;
        const isServerMessage = this.props.message.event !== 'message';
        let message = this.props.message.message;
        switch (event) {
            case 'join':
                message = 'joined';
                break;
            case 'leave':
                message = 'left';
                break;
        }
        return (
            <li className={isServerMessage ? "server" : ""}>
                <span className="nick">
                    {this.props.message.nick}
                    {isServerMessage ? " " : ": "}
                </span>
                {message}
            </li>
        );
    }
}
