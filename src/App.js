// @flow
import React from 'react';
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
    error: boolean
};

class App extends React.Component<Props, State> {

    onClick: Function;
    componentWillMount: Function;

    constructor() {

        super();

        this.state = {
            bg: '',
            bgUrl: '',
            ready: false,
            doors: [],
            door: 0,
            error: false
        }

        this.onClick = this.onClick.bind(this);

    }

    componentWillMount(){

        let doorInt:number = parseInt(localStorage.getItem('door'), 10);
        let calImg = new Image();

        fetch('calendar.json').then((calendar:Object)=>{

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

    onClick(door:string):boolean{

        let doorInt:number = parseInt(door, 10);

        if (doorInt===(this.state.door+1)){
            this.setState({ door: doorInt });
            localStorage.setItem('door', String(doorInt));
            return true;
        } else {
            return false;
        }

    }

    render() {

        let style = {};

        if (this.state.ready) {
            style = { backgroundImage: 'url('+this.state.bgUrl+')' };
        }

        let doors = this.state.doors.map((door)=>{
            return <Door key={door.number} onClick={this.onClick} ready={ this.state.ready } {...door}></Door>
        })

        return (
            <div className="Advent" style={ style }>
                { doors }
            </div>
        );
    }
}

export default App;
