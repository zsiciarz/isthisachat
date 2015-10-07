import React from 'react/addons';

export class ChatUserList extends React.Component {
    render () {
        return (
            <ul>
                {this.props.nicks.map(nick => <li key={nick}>{nick}</li>)}
            </ul>
        );
    }
}
