import React from "react";
import {Link} from 'react-router-dom';

class Logout extends React.Component {

    render() {
        return(
            <div>
                <button onClick={this.props.handleLogoutClick} >Log out<Link to="/3/tpap/build/profile"></Link></button>
            </div>
        )
    }
}

export default Logout;
