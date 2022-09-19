
import React from 'react';

class Attendant extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <p>{this.props.child.first_name} {this.props.child.last_name}</p>
            </div>
        )
    }
}

export default Attendant;
