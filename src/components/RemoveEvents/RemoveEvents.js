import React from "react";

/**
 *  A table containing all of the events that are displayed
 * in all of the languages on the informationpage.
 * 
 * There is a table containing all of the events stored in
 * the events data base which can be removed from the data
 * base when the button is clicked. There is the option to 
 * search for the event by name, description, date, time 
 * and language.
 *
 * @author Jake Ellerington
 */
class RemoveEvents extends React.Component {
    
    constructor(props){
        super(props)
        this.state = { results:[] }
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

    filterSearch = (s) => {

        return s.event_name.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_description.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_date.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_time.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.language.toLowerCase().includes(this.props.search.toLowerCase()) 

    }

    handleRemoveEvent = (event) => {

        let event_id = event.target.value

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/removeevent"

        let formData = new FormData()
        
        formData.append("event_id", event_id)
        
        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
            
        })
        .then( (response) => {
            if (response.status === 200){
                window.alert("Event has been removed")
                window.location.reload()
            } else {
                window.alert("Could not remove")
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

        
    }

    
    render() {

        let results = this.state.results;

        let buttons = ""

        if ((results.length > 0) && (this.props.search !== undefined)) {
            results = results.filter(this.filterSearch) 
        }

        if (this.props.page !== undefined) {
            
            const pageSize = 10
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
            
            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(results.length / pageSize)}>Next</button>
                </div>
            )
            results = results.slice(pageMin,pageMax)
        }

        return (
            <div className='removeEvents'>
                <table>
                    <tbody>
                        <tr>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Language</th>
                            <th>Remove</th>
                        </tr>
                    
                        {results.map( (event, i) => {

                            return(
                                <tr key={event.event_id}>
                                    <td> {event.event_name}</td>
                                    <td> {event.event_description}</td>
                                    <td id="three"> {event.event_date}</td>
                                    <td id="three"> {event.event_time}</td>
                                    <td id="three"> {event.language}</td>
                                    <td id="five">
                                        <button value={event.event_id} onClick={this.handleRemoveEvent}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {buttons}
            </div>            
        )
    }
}
   
export default RemoveEvents;
