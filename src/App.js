import React, { Component } from 'react';
import './App.css';

import Door from './Door.js';

class App extends Component {

    constructor() {
        super();

        let _doors = [
            {number:"01", image:"https://source.unsplash.com/NzQknDofRpc"},
            {number:"02", image:"https://source.unsplash.com/z0nZ229ifFw"},
            {number:"03", image:"https://source.unsplash.com/mXvgSOsnPx0"},
            {number:"04", image:"https://source.unsplash.com/xLGtGvH0A8g"},
            {number:"05", image:"https://source.unsplash.com/r53rNKb_7s8"},
            {number:"06", image:"https://source.unsplash.com/WsDF95mSUsI"},
            {number:"07", image:"https://source.unsplash.com/iZTMUjrvX4c"},
            {number:"08", image:"https://source.unsplash.com/u2n4LFarEMI"},
            {number:"09", image:"https://source.unsplash.com/7AzZqUXYCac"},
            {number:"10", image:"https://source.unsplash.com/VfWkdMue5Jc"},
            {number:"11", image:"https://source.unsplash.com/dABKxsPTAEk"},
            {number:"12", image:"https://source.unsplash.com/NizoYtO0yiY"},
            {number:"13", image:"https://source.unsplash.com/FQ5N5gb9Cao"},
            {number:"14", image:"https://source.unsplash.com/vJz7tkHncFk"},
            {number:"15", image:"https://source.unsplash.com/JsjXnWlh8-g"},
            {number:"16", image:"https://source.unsplash.com/G8ooPghadAY"},
            {number:"17", image:"https://source.unsplash.com/rtMiBkMCOsw"},
            {number:"18", image:"https://source.unsplash.com/Gork0BACw2I"},
            {number:"19", image:"https://source.unsplash.com/k0SwnevO_wk"},
            {number:"20", image:"https://source.unsplash.com/2gSfZ9Baph8"},
            {number:"21", image:"https://source.unsplash.com/UIlHiyFy0Wk"},
            {number:"22", image:"https://source.unsplash.com/GAJ4g8f7FBk"},
            {number:"23", image:"https://source.unsplash.com/O1gHgEagQ9U"},
            {number:"24", image:"https://source.unsplash.com/SSxIGsySh8o"}
        ];

        let l = _doors.pop();

        _doors.sort(function(door) { return 0.5 - Math.random() }).push(l);
        
        this.state = {
            bg: '',
            bgUrl: 'https://source.unsplash.com/qQUtvVdurHg',
            doors: _doors,
            ready: false
        }

        let calImg = new Image();
        calImg.addEventListener('load', this.onLoad.bind(this), false);
        calImg.src = this.state.bgUrl;

    }

    onLoad(){
        this.setState({ ready: true });
    }

    render() {
        let style = {};

        if (this.state.ready) {
            style = { backgroundImage: 'url('+this.state.bgUrl+')' };
        }

        let doors = this.state.doors.map((door)=>{
            return <Door key={door.number} number={door.number} image={door.image} ready={ this.state.ready }></Door>
        })

        return (
            <div className="Advent" style={ style }>
                {doors}
            </div>
        );
    }
}

export default App;
