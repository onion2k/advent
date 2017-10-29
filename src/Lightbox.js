import React from 'react';
import './Lightbox.css';

class Lightbox extends React.Component {

    constructor(props: Object){

        super(props);

        this.state = {
            open: false,
            src: ''
        }

        this.onClick = this.onClick.bind(this);

    }

    componentWillReceiveProps(nextProps){
        let open = true;
        if (nextProps.src==='') { open = false }
        this.setState({ src: nextProps.src, open: open });
    }

    onClick(){
        this.setState({ open: !this.state.open });
    }

    render() {

        const style = { display: (this.state.open===true) ? 'grid' : 'none' }

        return (
            <div className="Lightbox" style={style} onClick={ this.onClick }>
                <h1>Lightbox</h1>
            </div>
        );
    }
}

export default Lightbox;