// @flow

import React from 'react';
import './App.css';

import Door from './Door.js';

type Props = {};

type State = {
    bg: string,
    bgUrl: string,
    doors: Array<{ number: number, image: string, open: boolean }>,
    ready: boolean,
    door: number
};

class App extends React.Component<Props, State> {

    onClick: Function;

    constructor() {

        super();

        let _doors = [
            {number: 1, image:"https://source.unsplash.com/NzQknDofRpc", open: false },
            {number: 2, image:"https://source.unsplash.com/z0nZ229ifFw", open: false },
            {number: 3, image:"https://source.unsplash.com/mXvgSOsnPx0", open: false },
            {number: 4, image:"https://source.unsplash.com/xLGtGvH0A8g", open: false },
            {number: 5, image:"https://source.unsplash.com/r53rNKb_7s8", open: false },
            {number: 6, image:"https://source.unsplash.com/WsDF95mSUsI", open: false },
            {number: 7, image:"https://source.unsplash.com/iZTMUjrvX4c", open: false },
            {number: 8, image:"https://source.unsplash.com/u2n4LFarEMI", open: false },
            {number: 9, image:"https://source.unsplash.com/7AzZqUXYCac", open: false },
            {number:10, image:"https://source.unsplash.com/VfWkdMue5Jc", open: false },
            {number:11, image:"https://source.unsplash.com/dABKxsPTAEk", open: false },
            {number:12, image:"https://source.unsplash.com/NizoYtO0yiY", open: false },
            {number:13, image:"https://source.unsplash.com/FQ5N5gb9Cao", open: false },
            {number:14, image:"https://source.unsplash.com/vJz7tkHncFk", open: false },
            {number:15, image:"https://source.unsplash.com/JsjXnWlh8-g", open: false },
            {number:16, image:"https://source.unsplash.com/G8ooPghadAY", open: false },
            {number:17, image:"https://source.unsplash.com/rtMiBkMCOsw", open: false },
            {number:18, image:"https://source.unsplash.com/Gork0BACw2I", open: false },
            {number:19, image:"https://source.unsplash.com/k0SwnevO_wk", open: false },
            {number:20, image:"https://source.unsplash.com/2gSfZ9Baph8", open: false },
            {number:21, image:"https://source.unsplash.com/qQUtvVdurHg", open: false },
            {number:22, image:"https://source.unsplash.com/GAJ4g8f7FBk", open: false },
            {number:23, image:"https://source.unsplash.com/O1gHgEagQ9U", open: false },
            {number:24, image:"https://source.unsplash.com/SSxIGsySh8o", open: false }
        ];

        let doorInt:number = parseInt(localStorage.getItem('door'), 10);

        _doors.forEach((door)=>{ if (parseInt(door.number, 10) <= doorInt) { door.open = true; } });
        
        let l = _doors.pop();
        _doors.sort(function(door) { return 0.5 - Math.random() }).push(l);

        this.state = {
            bg: '',
            bgUrl: 'https://source.unsplash.com/UIlHiyFy0Wk',
            doors: _doors,
            ready: false,
            door: doorInt
        }

        let calImg = new Image();
        calImg.addEventListener('load', this.onLoad.bind(this), false);
        calImg.src = this.state.bgUrl;

        this.onClick = this.onClick.bind(this);

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
            return <Door key={door.number} onClick={this.onClick} number={door.number} image={door.image} ready={ this.state.ready } open={door.open} ></Door>
        })

        return (
            <div className="Advent" style={ style }>
                {doors}
            </div>
        );
    }
}

export default App;
