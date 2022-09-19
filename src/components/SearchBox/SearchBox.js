import React from "react";
import './SearchBox.css';

/**
 * Creates a searchbox
 * 
 * Creates a searchbox that allows a search to take place when a
 * change happens
 * 
 * @author Jake Ellerington
 */
class SearchBox extends React.Component {

    render() {
        return (
            <label className="search">
                Search: 
                <input type='text' placeholder='search' value={this.props.search} onChange={this.props.handleSearch} />
            </label>
        )
    }
}

export default SearchBox;
