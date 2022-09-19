import React from "react";


//import Papers from "../Papers/Papers.js";

/**
 * A way to get the upcoming event titles in the database
 * 
 * The  upcoming event titles are taken from the data base 
 * and are returned to be used in the information page.
 * 
 * @author Jake Ellerington
 */
class Title3 extends React.Component {

    
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

    filterByInfoLanguage = (user) => {
        return (user.language === this.props.language);
    }

    render(){

        let results = this.state.results;
         
        if (this.props.language !== undefined) {
            results = results.filter(this.filterByInfoLanguage)
        }

        return (
            <div>
                
                {results.map((item) => ( 
                    <div key = { item.title3 } >
                        <div >
                            <h2>{item.title3}</h2>
                        </div>
                    </div>
                ))}
               
            </div> 
        )
    }
}

export default Title3;
