import React from "react";

//import Papers from "../Papers/Papers.js";

/**
 * A way to get the main title in the database
 * 
 * The main titles are taken from the data base 
 * and are returned to be used in the information page.
 * 
 * @author Jake Ellerington
 */
class MainTitle extends React.Component {

    constructor(props){
        super(props)
        this.state = { results:[] }
    }

    componentDidMount() {

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/title" 
        
        fetch(url)
        .then( (response) => { 
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });

    }

    filterByInfoLanguage = (lang) => {
        return (lang.language === this.props.language);
    }

    render(){
        
        let results = this.state.results;
         
        if (this.props.language !== undefined) {
            results = results.filter(this.filterByInfoLanguage)
        }

        return (
            <div> 
                {results.map((item) => ( 
                    <div id="mainTitle" key = { item.mainTitle }>
                        <h1 >{item.mainTitle}</h1>
                    </div>
                ))}
            </div>
        )   
    }
}
export default MainTitle;
