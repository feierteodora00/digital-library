import React from "react";

/**
 * A Table which lists all of the student events which can
 * take place at the kindergarten.
 * 
 * This table displays the event name, description, date, 
 * time, class and if a consent form is required. There are
 * also buttons to go to a different page if the results become
 * too full.
 *
 * @author Jake Ellerington
 */
class StudentEvent extends React.Component {
    
    constructor(props){
        super(props)
        this.state = { results:[] }
        console.log("constructor")
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

        let filteredResults = this.state.results

        if (this.props.class !== undefined) {
            filteredResults = filteredResults.filter(this.filterByClass)
        }

        
        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch) 
        }

        let buttons = ""

        if (this.props.page !== undefined) {
            
            const pageSize = 10
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
            
            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
                </div>
            )
            filteredResults = filteredResults.slice(pageMin,pageMax)
        }
   
        return (
            <div className='studentEvents'>
                <table>
                    <tbody>
                        <tr>
                            <th>Event</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Class</th>
                            <th id='sixTitle'>Consent Form Required?</th>
                        </tr>
                        {filteredResults.map( (studentEvent, i) => {
                            return(
                                <tr key={studentEvent.student_event_id}>
                                    <td>{studentEvent.event_name}</td>
                                    <td>{studentEvent.event_description}</td>
                                    <td>{studentEvent.event_date}</td>
                                    <td>{studentEvent.event_time}</td>
                                    <td>{studentEvent.class}</td>
                                    <td id="sixStudent">{studentEvent.consent}</td>                                  
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
   
export default StudentEvent;
