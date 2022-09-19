import React from "react";
import './SelectAge.css';

/**
 * A dropdown list for a childs age
 * 
 * The ages are hardcoded below matching the results in the database. 
 * They provide a dropdown with an option for all of the selectable ages.
 * Used to select a person in the registeredinterests based on their age.
 * 
 * @author Jake Ellerington
 */
class SelectAge extends React.Component {

    render() {
        return (
            <label className="age">
                Age: 
                <select value={this.props.child_age} onChange={this.props.handleAgeSelect}>
                    <option value="all">Select</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>                
                </select>
            </label>      
        )
    }
}

export default SelectAge;
