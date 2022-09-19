import React from "react";

/**
 * A table containing all of the student events at the
 * kindergarten
 *
 * There is a table containing all of the student events
 * stored in the student events data base which can be removed 
 * from the data base when the adjacent button is clicked. 
 * There is the option to search for the event by name, description, date
 * and time as well as the select the event by class at the school.
 * 
 * @author Jake Ellerington
 */
class RemoveStudentEvents extends React.Component {
    
    constructor(props){
        super(props)
        this.state = { results:[] }
    }

    componentDidMount() {

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/studentevents"
        
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

    handleRemoveEvent = (event) => {

        let student_event_id = event.target.value

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/removestudentevent"

        let formData = new FormData()
        
        formData.append("student_event_id", student_event_id)
        
        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
            
        })
        .then( (response) => {
            console.log(response)
            if (response.status === 200){
                window.alert("Student event has been removed")
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

    filterByClass = (event) => {
        return ((event.class === this.props.class) || (event.class !== null && this.props.class===""));
    }

    filterSearch = (s) => {
       
        return s.event_name.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_description.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_date.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.event_time.toLowerCase().includes(this.props.search.toLowerCase()) 
    }

    render() {

        let results = this.state.results;

        if (this.props.class !== undefined) {
            results = results.filter(this.filterByClass)
        }

        if ((results.length > 0) && (this.props.search !== undefined)) {
            results = results.filter(this.filterSearch) 
        }

    
        let buttons = ""

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
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Class</th>
                            <th>Remove</th>
                        </tr>
                    
                        {results.map( (event, i) => {

                            return(
                                <tr key={event.student_event_id}>
                                    <td>{event.event_name}</td>
                                    <td> {event.event_description}</td>
                                    <td id="three"> {event.event_date}</td>
                                    <td id="three"> {event.event_time}</td>
                                    <td id="three"> {event.class}</td>
                                    <td id="five">
                                        <button value={event.student_event_id} onClick={this.handleRemoveEvent}>Remove</button>
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
   
export default RemoveStudentEvents;
