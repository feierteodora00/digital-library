import React from "react";
import './SelectLanguage.css';

/**
 * A dropdown list for selecting a langauge
 * 
 * The languages are hardcoded below matching the results in the database. 
 * They provide a dropdown with an option for all of the selectable languages.
 * Used to select a language on the rigister interest page and as a dropdown
 * to select by language on the interestedusers page.
 * 
 * 
 * @author Jake Ellerington
 */
class SelectLanguage extends React.Component {

    render() {
        return (
            <label className="language">
                Language: 
                <select value={this.props.language} onChange={this.props.handleLanguageSelect}>
                    <option value="all">Select</option>
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="Romanian">Romanian</option>                
                </select>
            </label>
                
        )
    }
}

export default SelectLanguage;
