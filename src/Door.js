// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './Door.css';

type Props = {
    onClick: Function,
    lightbox: Function,
    image: string,
    number: number,
    bg: string,
    offsetX: number,
    offsetY: number
};

type State = {
    clickCallback: Function,
    ready: boolean,
    open: boolean,
    animating: boolean,
    bg: string,
    action: string,
    src: string,
    bgUrl: string,
    backgroundPosition: string,
    offsetX: number,
    offsetY: number,
    rattle: boolean
};

class Door extends React.Component<Props, State> {

    onLoad: Function;
    activate: Function;
    componentWillReceiveProps: Function;
    componentDidMount: Function;
    bgPos: Function;
    rattling: Function;
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
            action: props.action,
            src: props.src,
            bgUrl: props.image,
            backgroundPosition: "0px 0px",
            offsetX: 0,
            offsetY: 0,
            rattle: false
        };

        let pl = new Image();
        pl.addEventListener('load', this.onLoad.bind(this), false);
        pl.src = this.props.image;

        this.onClick = this.onClick.bind(this);
        this.activate = this.activate.bind(this);
        this.rattling = this.rattling.bind(this);
        this.animating = this.animating.bind(this);
        this.bgPos = this.bgPos.bind(this);

    }

    onLoad(){
        this.setState({ bg: this.state.bgUrl });
    }

    componentWillReceiveProps(nextProps:Object){
        let offsetX = nextProps.offsetX + 3;
        let offsetY = nextProps.offsetY + 4;
        this.setState({ ready: nextProps.ready, offsetX: offsetX, offsetY: offsetY }, ()=>{
            if (nextProps.offsetX > 0){
                this.bgPos();
            }
        });
    }

    componentDidMount(){
        
        this.refs.door.addEventListener('transitionstart', this.animating);
        this.refs.door.addEventListener('transitionend', this.animating);
        this.refs.door.addEventListener('animationend', this.rattling);
        
        this.bgPos();
        
    }

    bgPos(){
        let el = ReactDOM.findDOMNode(this);
        if (el instanceof HTMLElement) {
            let bounds = el.getBoundingClientRect();
            this.setState({ 
                backgroundPosition: ((-1*bounds.left)+this.state.offsetX)+"px "+((-1*bounds.top)+this.state.offsetY)+"px" 
            });
        } else {
            return;            
        }
    }

    animating () {
        this.setState({animating: !this.state.animating});
    }

    rattling () {
        this.setState({animating: false, rattle: false});
    }

    onClick(){

        if (this.state.open===true) { return; }

        if (this.state.clickCallback(this.props.number)){
            this.setState({ open: !this.state.open, animating: !this.state.animating });
            this.props.lightbox(this.props.number);
        } else {
            this.setState({ open: false, animating: true, rattle: true });
        }

    }

    activate() {
        this.props.lightbox(this.props.number);
    }

    render() {

        let style = {};

        if (this.state.ready) {
            style = { cursor: 'pointer', backgroundImage: 'url('+this.state.bg+')' };
        }

        return (
            <div className={'Window'+(this.state.open===true?' opened':'')+(this.state.animating===true?' animating':'')+(this.props.number===24?' double':'')}>
                <div ref="door" className={'Door'+(this.state.open===true?' open':'')+(this.state.rattle===true?' rattle':'')} onClick={ this.onClick } style={{ backgroundPosition: this.state.backgroundPosition, backgroundImage: 'url('+this.props.bg+')' }}>
                    <div className="front">
                        { this.props.number }
                    </div>
                    <div className="back">Merry Christmas</div>
                </div>
                <div className="Picture" onClick={ this.activate } style={ style }></div>
            </div>
        );
    }
}

export default Door;