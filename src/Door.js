// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './Door.css';

type Props = {
    onClick: Function,
    image: string,
    number: string
};

type State = {
    clickCallback: Function,
    ready: boolean,
    open: boolean,
    animating: boolean,
    bg: string,
    bgUrl: string,
    backgroundPosition: string
};

class Door extends React.Component<Props, State> {

    onLoad: Function;
    componentWillReceiveProps: Function;
    componentDidMount: Function;
    bgPos: Function;
    animating: Function;
    onClick: Function;
    render: Function;
    
    constructor(props: Object){

        super(props);
        
        this.state = {
            clickCallback: props.onClick,
            ready: true,
            open: props.open,
            animating: false,
            bg: '',
            bgUrl: props.image,
            backgroundPosition: "0px 0px"
        };

        let pl = new Image();
        pl.addEventListener('load', this.onLoad.bind(this), false);
        pl.src = this.props.image;

        this.onClick = this.onClick.bind(this);
        this.animating = this.animating.bind(this);
        this.bgPos = this.bgPos.bind(this);

    }

    onLoad(){
        this.setState({ bg: this.state.bgUrl });
    }

    componentWillReceiveProps(nextProps:Object){
        this.setState({ ready: nextProps.ready });
    }

    componentDidMount(){

        window.addEventListener('resize', this.bgPos);
        
        this.refs.door.addEventListener('transitionstart', this.animating);
        this.refs.door.addEventListener('transitionend', this.animating);

        this.bgPos();
        
    }

    bgPos(){
        let el = ReactDOM.findDOMNode(this);
        if (el instanceof HTMLElement) {
            let bounds = el.getBoundingClientRect();
            this.setState({ backgroundPosition: (-1*bounds.left)+"px "+(-1*bounds.top)+"px" });
        } else {
            return;            
        }
    }

    animating () {
        this.setState({animating: !this.state.animating});
    }

    onClick(){
        if (this.state.clickCallback(this.props.number)){
            this.setState({ open: !this.state.open, animating: !this.state.animating });
        } else {
            throw new Error('InvalidDoorNo')
        }
    }

    render() {

        let style = {};

        if (this.state.ready) {
            style = { backgroundImage: 'url('+this.state.bg+')' };
        }

        return (
            <div className={'Window'+(this.state.open===true?' opened':'')+(this.state.animating===true?' animating':'')+(this.props.number==="24"?' double':'')}>
                <div ref="door" className={'Door'+(this.state.open===true?' open':'')} onClick={ this.onClick } style={{ backgroundPosition: this.state.backgroundPosition }}>
                    <div className="front">
                        { this.props.number }
                    </div>
                    <div className="back">Merry Christmas</div>
                </div>
                <div className="Picture" style={ style }></div>
            </div>
        );
    }
}

export default Door;