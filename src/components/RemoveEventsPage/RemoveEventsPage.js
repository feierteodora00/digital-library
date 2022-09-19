import React from "react";
import RemoveEvents from "../RemoveEvents/RemoveEvents.js";
import SearchBox from "../SearchBox/SearchBox.js";
import SelectLanguage from "../SelectLanguage/SelectLanguage.js";
import  "./RemoveEventsPage.css"

/**
 * Implemantion of functions on the remove event page
 * 
 * The implementation of the search and remove event
 * functions. The search is used to filter through the
 * events and there is buttons to click if the page
 * cannot contain all of the results.
 * 
 * @author Jake Ellerington
 */
class RemoveEventsPage extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           page: 1,
           search: "",
           token: localStorage.getItem('userToken')

        }
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
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
        if (this.state.role === "admin"){  
            return (
                <div className='removeEvents' >
                    <h1>Remove Event</h1>
                    <div className="searchFeatures">
                        <div>
                            <SearchBox 
                                search={this.state.search} 
                                handleSearch={this.handleSearch} 
                            />
                        </div>
                    </div>
                    <RemoveEvents 
                        handleNextClick={this.handleNextClick} 
                        handlePreviousClick={this.handlePreviousClick} 
                        page={this.state.page}
                        search={this.state.search} 
                    />
                </div>
            )
        } else {
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

export default RemoveEventsPage;
