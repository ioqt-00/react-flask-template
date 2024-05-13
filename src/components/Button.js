import React, {Component} from "react";

class Button extends Component {
    handleClick = () => {
        this.props.clickHandler(this.props);
    };

    render() {
        return (
            <button className={this.props.className} onClick={this.handleClick}>{this.props.name}</button>
        );
    }
}

export default Button;
