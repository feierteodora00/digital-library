import React from "react";
import './InformationPage.css';
import Information from "../Information/Information";
import Events from "../Events/Events";
import SelectLanguageInformation from "../SelectLanguageInformation/SelectLanguageInformation";
import ActivityPage from "../ActivityPage/ActivityPage";
import MainTitle from "../Titles/MainTitle";
import Title1 from "../Titles/Title1";
import Title2 from "../Titles/Title2";
import Title3 from "../Titles/Title3";


//import Papers from "../Papers/Papers.js";

/**
 * The implementation of the functions on the information page
 * 
 * The the information page inplements the functions including the main
 * title of the page, the language select buttons, the activitly title,
 * the different activities, the contact information title, the contact
 * information, the upcoming events title and the upcoming events. These
 * are all inplace to successfully create the information page and are all
 * controlled by language selection. This changes the whole page depending
 * on which language is selected.
 * 
 * 
 * 
 * @author Jake Ellerington
 */
class InformationPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results:[],
            language: "english",
            page: 1
        }

        this.handleLanguageInfoSelect = this.handleLanguageInfoSelect.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);

    }

    handleLanguageInfoSelect = (e) => {
        this.setState({language:e.target.value})
    }

    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }
    
    handlePreviousClick = () => {
        this.setState({page:this.state.page-1})
    }

    render(){
        
        return(

            <div>
                
                <MainTitle 
                    language={this.state.language} 
                />
                <SelectLanguageInformation 
                    language={this.state.language} 
                    handleLanguageInfoSelect={this.handleLanguageInfoSelect}
                />
                <div className="infoContainer">
                    <div className="information">
                        <Title1 
                            language={this.state.language}
                        />
                        <ActivityPage 
                            language={this.state.language}
                            handleNextClick={this.handleNextClick} 
                            handlePreviousClick={this.handlePreviousClick} 
                            page={this.state.page}
                        />
                    </div>
                    <div className="information1">
                        <Title2 
                            language={this.state.language}
                        />
                        <Information 
                            language={this.state.language}
                        />
                    </div>
                </div>
                <div className="events">
                   <div>
                        <Title3 
                            language={this.state.language}
                        />
                        <Events 
                            language={this.state.language}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default InformationPage;
