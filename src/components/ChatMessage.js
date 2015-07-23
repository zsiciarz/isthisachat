import React from 'react/addons';

export class ChatMessage extends React.Component {
    static propTypes = {
        message: React.PropTypes.object.isRequired
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
