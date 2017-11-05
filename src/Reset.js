// @flow

import React from 'react';

class Reset extends React.Component {

    render() {

        if (this.props.date.getMonth()===11) { return null; }

        return (

            <div className="reset" onClick={this.props.reset}>Reset</div>
            
        );
    }
}

export default Reset;