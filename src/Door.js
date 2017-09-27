import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Door.css';

class Door extends Component {

    constructor(){
        super();
        this.state = { open: false, animating: false,  backgroundPosition: "0px 0px" };
        this.onClick = this.onClick.bind(this);
        this.animating = this.animating.bind(this);
    }

    componentDidMount(){

        var el = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({ backgroundPosition: (-1*el.left)+"px "+(-1*el.top)+"px" });
        this.refs.door.addEventListener('transitionstart', this.animating);
        this.refs.door.addEventListener('transitionend', this.animating);
        
    }

    animating () {
        this.setState({animating: !this.state.animating});
    }

    onClick(){
        this.setState({ open: !this.state.open, animating: !this.state.animating });
    }

    render() {

        return (
            <div className={'Window'+(this.state.open===true?' opened':'')+(this.state.animating===true?' animating':'')+(this.props.number==="24"?' double':'')}>
                <div ref="door" className={'Door'+(this.state.open===true?' open':'')} onClick={ this.onClick } style={{ backgroundPosition: this.state.backgroundPosition }}>
                    <div className="front">
                        { this.props.number }
                    </div>
                    <div className="back">Merry Christmas</div>
                </div>
                <div className="Picture" style={{ backgroundImage: 'url('+this.props.image+')' }}></div>
            </div>
        );
    }
}

export default Door;