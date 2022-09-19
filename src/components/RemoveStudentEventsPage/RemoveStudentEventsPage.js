import React from "react";
import RemoveStudentEvents from "../RemoveStudentEvents/RemoveStudentEvents";
import SearchBox from "../SearchBox/SearchBox";
import SelectClass from "../SelectClass/SelectClass";
import  "./RemoveStudentEventsPage.css"

/**
 * Implemantion of functions on the remove student event 
 * page
 * 
 * The implementation of the search, select class and 
 * remove event functions. The search is used to filter
 * through the events, the dropdown is used to sort the
 * table by class and there are buttons to click if the page
 * cannot contain all of the results.
 * 
 * @author Jake Ellerington
 */
class RemoveStudentEventsPage extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           page: 1,
           class: '',
           search: '',
           token: localStorage.getItem('userToken')

       }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
        if (this.state.role === "admin"){ 
            return (
                <div className='removeEvents'>
                    <h1>Remove Student Event</h1>
                    <div className="searchFeatures">
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
                    <div>
                    <RemoveStudentEvents
                            handleNextClick={this.handleNextClick} 
                            handlePreviousClick={this.handlePreviousClick} 
                            page={this.state.page}
                            class={this.state.class}
                            search={this.state.search}
                        />
                    </div>
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

export default RemoveStudentEventsPage;
