import React, { Component } from 'react';
import './Door.css';

class Door extends Component {

    render() {

        return (
            <div className={'Door'+(this.props.number==="24"?' double':'')}>
                { this.props.number }
            </div>
        );
    }
}

export default Door;