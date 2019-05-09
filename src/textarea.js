import React from "react";

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }

        this.setText = this.setText.bind(this);
        this.stopBubbling = this.stopBubbling.bind(this);
    }

    setText(e) {
        this.setState({text: e.target.value});
        this.props.setText(e.target.value);
    }

    stopBubbling(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <textarea 
                onChange={this.setText}
                value={this.state.text ? this.state.text : this.props.text}
                style={{display: this.props.view ? "none" : "inline-block"}}
                onMouseDown={this.stopBubbling}
                onMouseUp={this.stopBubbling}
            >
            </textarea>
        )
    }
}