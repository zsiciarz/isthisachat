import React from 'react/addons';

export class ChatForm extends React.Component {
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
