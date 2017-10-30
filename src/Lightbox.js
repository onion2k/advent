import React from 'react';
import YouTube from 'react-youtube';
import './Lightbox.css';

class Lightbox extends React.Component {

    constructor(props: Object){

        super(props);

        this.state = {
            open: false,
            src: '',
            content: null
        }

        this.onClick = this.onClick.bind(this);

    }

    componentWillReceiveProps(nextProps){

        if (nextProps.src===undefined) {
            this.setState({ content: null, open: false });
            return;
        }

        switch(nextProps.src.action) {
            case "img":
                this.setState({ content: <img src={ nextProps.src.src } alt="Merry Christmas" />, open: true });
                break;
            case "youtube":
                let opts = {
                    height: '390',
                    width: '640',
                    playerVars: {
                        autoplay: 1
                    }
                }
                let content = <YouTube videoId={ nextProps.src.src } opts={ opts } />
                this.setState({ content: content, open: true });
                break;
            case "html":
                fetch(nextProps.src.src).then((fragment) => {
                    return fragment.text();
                }).then((html) => {
                    let content = () => { return { __html: html } };
                    this.setState({ content: <div dangerouslySetInnerHTML={ content() } />, open: true });
                })
            break;
            default:
                this.setState({ content: null, open: false });                
                break;
        }

    }

    onClick(){
        this.setState({ open: false, content: null });
        this.props.lightbox(0);
    }

    render() {

        let style = { display: (this.state.open===true) ? 'grid' : 'none' }

        return (
            <div className="Lightbox" style={style} onClick={ this.onClick }>
                { this.state.content }
            </div>
        );
    }
}

export default Lightbox;