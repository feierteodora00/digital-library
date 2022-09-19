import React from 'react';
import {Link } from 'react-router-dom';

/**
 * A page that is displayed when an incorrect link is entered.
 * 
 * This page will be displayed when a webpage is not found as it
 * is not a url of the api. A link to the hompage will be displayed
 * and can be clicked.
 * 
 * @author Jake Ellerington
 */
class NotFoundPage extends React.Component {

    render() {
        return (
            <div>
                <h1>404: Page not found</h1>
                <Link to="/">Return to Home</Link>
            </div>
        );
    }
}

export default NotFoundPage;
