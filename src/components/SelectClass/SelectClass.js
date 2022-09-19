import React from "react";
import './SelectClass.css';

/**
 * A dropdown list for the different classes
 * 
 * The classes are hardcoded below matching the results in the database. 
 * They provide a dropdown with an option for all of the selectable classes.
 * Used to select a class in both student events and removestudent events 
 * based on the desired class.
 *  
 * @author Jake Ellerington
 */
class SelectClass extends React.Component {

    render() {
        return (
            <label className="class">
                Group:
                <select value={this.props.class} onChange={this.props.handleClassSelect}>
                    <option value="">select</option>
                    <option value="All">All</option>
                    <option value="Mica">Mica</option>
                    <option value="Mijlocie">Mijlocie</option>
                    <option value="Mare">Mare</option>                
                </select>
            </label>
                
        )
    }
}

export default SelectClass;
