import React, { Component } from 'react';
import './Door.css';

class Door extends Component {

    constructor(){
        super();
        this.state = { open: false };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({ open: !this.state.open });
    }

    render() {

        return (
            <div className={'Window'+(this.props.number==="24"?' double':'')}>
                <div className={'Door'+(this.state.open===true?' open':'')} onClick={ this.onClick }>
                    <div className="front">
                        { this.props.number }
                    </div>
                    <div className="back">Merry Christmas</div>
                </div>
                <div className="Picture">Yo</div>
            </div>
        );
    }
}

export default Door;