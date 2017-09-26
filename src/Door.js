import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Door.css';

class Door extends Component {

    constructor(){
        super();
        this.state = { open: false, backgroundPosition: "0px 0px" };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        
        var el = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({ backgroundPosition: (-1*el.left)+"px "+(-1*el.top)+"px" });
    
    }

    onClick(){
        this.setState({ open: !this.state.open });
    }

    render() {

        return (
            <div className={'Window'+(this.props.number==="24"?' double':'')}>
                <div className={'Door'+(this.state.open===true?' open':'')} onClick={ this.onClick } style={{ backgroundPosition: this.state.backgroundPosition }}>
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