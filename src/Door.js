import React, { Component } from 'react';
import './Door.css';

class Door extends Component {

    render() {

        return (
            <div className="Door">
                { this.props.number }
            </div>
        );
    }
}

export default Door;