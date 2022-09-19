import React from "react";
import './Events.css';
//import Papers from "../Papers/Papers.js";

/**
 * The event component to the information page to display upcoming events.
 * 
 * The events which are added through the addeventpage are called from the 
 * database and are displayed with the event name, event desctiption, the
 * event date and the time at which it takes place. There is a filter by
 * language option which is in place to to select the information dependin
 * on which it is entered in.
 * 
 * 
 * 
 * @author Jake Ellerington
 */

class Events extends React.Component {

    constructor(props){
        super(props)
        this.state = { results:[],   
        } 
    }

    componentDidMount() {

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/events"
        
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

    filterByInfoLanguage = (event) => {
        return (event.language === this.props.language);
    }
   
    render(){
        
        let results = this.state.results;
         
        if (this.props.language !== undefined) {
            results = results.filter(this.filterByInfoLanguage)
        }

        return (

            <div className='upcomingEvents'>
                <table>
                    <tbody>
                        <tr>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        
                        {results.map( (event, i) => {
                            return(   
                                <tr key={event.event_id}>
                                    <td id="one" > {event.event_name}</td>
                                    <td> {event.event_description}</td>
                                    <td id="three"> {event.event_date}</td>
                                    <td id="four"> {event.event_time}</td>    
                                </tr>
                            )   
                        })}    
                    </tbody>
                </table>
            </div>
        )   
    }  
}

export default Events;
