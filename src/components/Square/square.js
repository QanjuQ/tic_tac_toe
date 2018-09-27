import React, {Component} from 'react';
import './square.css';

class Square extends Component{
    render() {
        return (
            <div className = "square" id = {this.props.id}
            onClick={this.props.onClick}>
            {this.props.value}
            </div>
        );
    }
}

export default Square;