import React from 'react';

export class ChatForm extends React.Component {
    static propTypes = {
        onSend: React.PropTypes.func.isRequired
    }

    state = {text: ''}

    handleSubmit = (e) => {
        this.props.onSend(this.state.text);
        this.setState({text: ''});
        let input = this.refs.message;
        input.focus();
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({text: e.target.value});
    }

    render() {
        return <div className="row">
        <div className="col-lg-4">
        <form onSubmit={this.handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    ref="message"
                    onChange={this.handleChange}
                    value={this.state.text}
                    autoFocus />
                <span className="input-group-btn">
                    <button className="btn btn-primary" disabled={this.state.text.length === 0}>Send!</button>
                </span>
            </div>
        </form>
        </div>
        </div>;
    }
}
