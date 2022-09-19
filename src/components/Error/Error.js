import React from "react";

/**
 * Used to handle errors by returning error message.
 * 
 * If there is an error, a message will be returned and
 * displayed on the screen.
 * 
 * @author Jake Ellerington
 */
class Error extends React.Component {
    render() {
        if(this.props.errorText !== null) {
            return (  
                <div>
                    <p>{this.props.errorText}</p>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Error;