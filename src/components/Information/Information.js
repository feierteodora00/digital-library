import React from "react";

import './Information.css';
//import Papers from "../Papers/Papers.js";

/**
 * A component to the activities page displaying contact details.
 * 
 * The details are called from a data base in their various different
 * languages in order to display a contact email, telephone number 
 * and address.
 * 
 * 
 * 
 * @author Jake Ellerington
 */
class Information extends React.Component {

    
    constructor(props){
        super(props)
        this.state = { results:[] }
    }

    componentDidMount() {

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/language" 
        
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
                    <div key = {item.language}>
                        <div className="contactDetails">
                            <div className="constantInfo">
                                <p>{item.email} </p>
                                <p>kindergarten@example.ro</p>
                            </div>
                            <div className="constantInfo">
                                <p>{item.phone_number}</p>
                                <p>+00 1122 334455</p>
                            </div>
                            <div className="constantInfo">
                                <p>{item.address}</p>
                                <p>Romania, Brasov, The Example Street, No.3</p>
                            </div>
                        </div>
                    </div>
                ))} 
            </div>   
        )  
    }
}

export default Information;
