import React from "react";
import StudentEvent from "../StudentEvent/StudentEvent.js";
import SearchBox from "../SearchBox/SearchBox.js";
import SelectClass from "../SelectClass/SelectClass.js";
import PDF from "../../pdf/participantForm.pdf";
import './StudentEventPage.css';

/**
 * Implemantion of functions on the student events page
 * as well as download a pdf
 * 
 * The implementation of the studentevents select group and 
 * search funtions have all been implemented in order to 
 * display the page. There is also the option to click on
 * a button to download a consent form if it is required
 * 
 * @author Jake Ellerington
 */
class StudentEventPage extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
            class: "",
            search: "",
            page: 1,
            authenticated: false,
            token: localStorage.getItem('userToken')
         
        }
        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    handleClassSelect = (e) => {
        this.setState({class:e.target.value, page:1})
     }

    handleSearch = (e) => {
        this.setState({search:e.target.value, page:1})
    }
   
    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }

    handlePreviousClick = () => {
        this.setState({page:this.state.page-1})
    }

    componentDidMount = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/profile"
    
        let formData = new FormData();
        formData.append('token', localStorage.getItem('userToken'))
    
        
    
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then ( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({
                role: data.results[0].role
            })
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    render() {
        if (this.state.role === "parent"){ 

            return (
                <div className="registeredInterests">
                    <h1>Student Events</h1>
                    <div className="searchFeatures">
                    <div className="pdf">
                        <label>Click for a:</label>
                        <a href={PDF}>Consent Form</a>
                    </div>
                    <div>
                        <SearchBox 
                            search={this.state.search} 
                            handleSearch={this.handleSearch} 
                        />
                    </div>
                    <div>
                        <SelectClass
                            class={this.state.class} 
                            handleClassSelect={this.handleClassSelect} 
                        />
                    </div>
                    </div>
                    <StudentEvent 
                        class={this.state.class}
                        search={this.state.search} 
                        handleNextClick={this.handleNextClick} 
                        handlePreviousClick={this.handlePreviousClick} 
                        page={this.state.page}
                    />
                </div>
            )
        } else{
            
            return(
                <div>
                    <h1>
                        'You dont have permissions'
                    </h1>
                </div>
            )

            
        }    
    }
}

export default StudentEventPage;



