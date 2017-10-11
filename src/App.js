// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Door from './Door.js';

declare var Raven: any;

type Props = {};

type State = {
    bg: string,
    bgUrl: string,
    doors: Array<{ number: number, image: string, open: boolean }>,
    ready: boolean,
    door: number,
    error: boolean,
    calendarOffsetX: number,
    calendarOffsetY: number
};

class App extends React.Component<Props, State> {

    onClick: Function;
    componentWillMount: Function;
    componentDidMount: Function;
    bgPos: Function;
    
    constructor() {

        super();

        this.state = {
            bg: '',
            bgUrl: '',
            ready: false,
            doors: [],
            door: 0,
            error: false,
            calendarOffsetX: 0,
            calendarOffsetY: 0
        }

        this.onClick = this.onClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.bgPos = this.bgPos.bind(this);
        
    }

    componentWillMount(){

        let calendar:string = window.location.hash.substring(1);

        if (!calendar) {
            this.setState({
                error: true
            });
        }

        let doorInt:number = parseInt(localStorage.getItem('door'), 10);
        if (!doorInt) { doorInt = 0; }
        
        let calImg = new Image();

        fetch(calendar+'.json').then((calendar:Object)=>{

            return calendar.json();

        }).then((result)=>{

            result.calendar.forEach((door)=>{ if (door.number <= doorInt) { door.open = true; } });

            if (result.randomise===true) {
                let l = result.calendar.pop();
                result.calendar.sort(function(door) { return 0.5 - Math.random() }).push(l);
            }
    
            this.setState({
                bg: '',
                bgUrl: result.bgUrl,
                doors: result.calendar,
                ready: false,
                door: doorInt
            });

            calImg.addEventListener('load', this.onLoad.bind(this), false);
            calImg.src = this.state.bgUrl;
    
        }).catch((error:Error)=>{

            Raven.captureException(error);

            this.setState({
                error: true
            });
        });

    }

    onLoad(){
        this.setState({ ready: true });
    }

    componentDidMount(){

        window.addEventListener('resize', this.bgPos);

        this.bgPos();
        
    }

    bgPos(){
        let el = ReactDOM.findDOMNode(this);
        if (el instanceof HTMLElement) {
            let bounds = el.getBoundingClientRect();
            this.setState({ calendarOffsetX: bounds.left+5, calendarOffsetY: bounds.top+5 });
        } else {
            return;            
        }
    }
        
    onClick(door:number):boolean{

        if (door===(this.state.door+1)){
            this.setState({ door: door });
            localStorage.setItem('door', String(door));
            return true;
        } else {
            return false;
        }

    }

    render() {

        let style = {};
        let doors;

        if (this.state.error===true) {

            doors = <div className="Error">Something went wrong. Sorry!<p>An elf is already looking in to it.</p></div>;

        } else {

            if (this.state.ready===true) {
                style = { backgroundImage: 'url('+this.state.bgUrl+')' };
            } else {
                style = { backgroundColor: '#fff' };                
            }
    
            doors = this.state.doors.map((door)=>{
                return <Door key={door.number} onClick={this.onClick} ready={ this.state.ready } bg={ this.state.bgUrl } offsetX={this.state.calendarOffsetX} offsetY={this.state.calendarOffsetY} {...door}></Door>
            })
    
        }

        return (
            <div className="Advent" style={ style }>
                { doors }
            </div>
        );
    }
}

export default App;
