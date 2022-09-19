import React from "react";
import Parent from "./Parent"
import Unauthenticated from "./Unauthenticated";
import Administrator from "./Administrator";
import Teacher from "./Teacher";
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
class Handler extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
            token: localStorage.getItem('userToken')
        }
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
                <Parent />
                
            )
        } else if (this.state.role === "admin") {
            
            return(
                <Administrator/>
            )

            
        }  else if (this.state.role === "teacher") {
            
            return(
                <Teacher/>
            )

            
        }  else {
            return(

            
                <Unauthenticated />
            )
        }
    }
}

export default Handler;