import React from "react";
import RegisteredInterests from "../RegisteredInterests/RegisteredInterests.js";
import SelectLanguage from "../SelectLanguage/SelectLanguage.js";
import SelectAge from "../SelectAge/SelectAge.js";
import SearchBox from "../SearchBox/SearchBox.js";
import './RegisteredInterestsPage.css';

/**
 * Implemantion of functions on the registered interest page
 * 
 * The implementation of the registeredinterests, select
 * language,select age and search funtions have all been 
 * implemented in order to display the page.
 * 
 * @author Jake Ellerington
 */
class RegisteredInterestsPage extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
            language: "all",
            child_age: "all",
            search: "",
            page: 1,
            token: localStorage.getItem('userToken')
         
        }
        this.handleLanguageSelect = this.handleLanguageSelect.bind(this);
        this.handleAgeSelect = this.handleAgeSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
      }

   handleSearch = (e) => {
      this.setState({search:e.target.value, page:1})
   }

   handleLanguageSelect = (e) => {
      this.setState({language:e.target.value, page:1})
   }

   handleAgeSelect = (e) => {
      this.setState({child_age:e.target.value, page:1})
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
            <div className="registeredInterests">
               <h1>Interested Users</h1>
               <div className="searchFeatures">
                  <div className="information">
                     <SelectAge 
                        child_age={this.state.child_age} 
                        handleAgeSelect={this.handleAgeSelect} 
                     />
                  </div>
                  <div className="information1">
                     <SearchBox 
                        search={this.state.search} 
                        handleSearch={this.handleSearch} />
                  </div>
                  <div className="information2">
                     <SelectLanguage 
                        language={this.state.language} 
                        handleLanguageSelect={this.handleLanguageSelect} 
                     />
                  </div>
               </div>
                  <RegisteredInterests 
                     language={this.state.language}
                     child_age={this.state.child_age}
                     search={this.state.search} 
                     handleNextClick={this.handleNextClick} 
                     handlePreviousClick={this.handlePreviousClick} 
                     page={this.state.page}
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

export default RegisteredInterestsPage;
