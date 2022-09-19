import React from "react";
import './SelectLanguageInformation.css';
import england from "../../img/England.png";
import germany from "../../img/Germany.png";
import romania from "../../img/Romania.png";

/**
 * A dropdown list for selecting the language of the page.
 * 
 * The languages are hardcoded below matching the languages in
 * the database and they are displayed with images. They are 
 * used to select the language on the information page when the
 * button is clicked.
 * 
 * @author Jake Ellerington
 */
class SelectLanguageInformation extends React.Component {

    render() {
        return (
            <div className="holder">
                <div className="flags" value={this.props.language} onClick={this.props.handleLanguageInfoSelect}>
                    <input  type="image" src={england} alt="flagOfEngland" value="english" />
                    <input  type="image" src={germany} alt="flagOfGermany" value="german" />
                    <input  type="image" src={romania} alt="flagOfRomania" value="romanian" />
                </div>
            </div>       
        )
    }
}

export default SelectLanguageInformation;


