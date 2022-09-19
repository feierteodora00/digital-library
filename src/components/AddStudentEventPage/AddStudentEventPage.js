import React from "react";

import './AddStudentEventPage.css';
/**
 * A from that can be used in order to fill in student events that take
 * place at the kindergarten
 * 
 * The form has the option to enter and event name, event description,
 * event dat, an event time, a dropown to select a specific class and a dropdown 
 * to select whethere a consent form is required. These values are sent to the data 
 * base and stored when the submit button is clicked.
 * 
 * @author Jake Ellerington
 */
class AddStudentEventPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            event_name: '',
            event_description: '',
            event_date: '',
            event_time: '',
            class:'',
            consent:'',
            token: localStorage.getItem('userToken')

        };

        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDate = this.handleDate.bind(this)
        this.handleTime = this.handleTime.bind(this)
        this.handleClass = this.handleClass.bind(this)
        this.handleConsent = this.handleConsent.bind(this)
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleName = (event) => {
        this.setState({event_name: event.target.value})
    }

    handleDescription = (event) => {
        this.setState({event_description: event.target.value})
    }

    handleDate = (event) => {
        this.setState({event_date: event.target.value})
    }

    handleTime = (event) => {
        this.setState({event_time: event.target.value})
    }

    handleClass = (event) => {
        this.setState({class: event.target.value})
    }

    handleConsent = (event) => {
        this.setState({consent: event.target.value})
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

    handleSubmit = (event) => {
       
        event.preventDefault();
  
        if(this.state.event_name !=='' && this.state.event_description !=='' && this.state.event_date !=='' && this.state.event_time !==''
        && this.state.event_description.length > 5 && this.state.event_date.length > 9 && this.state.event_date.length < 11){
            
            let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/studentevent"

            let info = new FormData;
           
            info.append('event_name', this.state.event_name)
            info.append('event_description', this.state.event_description.trim())
            info.append('event_date', this.state.event_date)
            info.append('event_time', this.state.event_time)
            info.append('class', this.state.class)
            info.append('consent', this.state.consent)
            
            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: info
            })
            
            .then( (response) => {
                    if (response.status === 204) {
                } else {
                    throw new Error(response.statusText)
                }
            })

            .catch ((err) => {
                this.setState({errorText:err.props})
                }
            );

            alert('The form has been submitted.')

            this.setState({
                event_name: '',
                event_description: '',
                event_date: '',
                event_time: '',
                class: '',
                consent: 'select'
            });
            
        } else if(this.state.event_date.length < 10 || this.state.event_date.length > 10) {
            this.setState({message: 'Please fill in the date in the correct format.'})
        
        } else if (this.state.event_description.length < 6) {
            this.setState({message: 'Please fill in the full description.'})
            
        } else this.setState({message: 'Please fill in all the details.'})
    }

    handleTextarea(e) {
        if (e.keyCode == 13) {
            e.preventDefault();

        }   
    }

    render() {  
        if (this.state.role === "admin"){    

            let message = this.state.message

            return (
                <div className="addStudentEvents" >
                    <h1>Add Student Events</h1>
                    <p id="notification">{message}</p>
                    <form onSubmit={this.handleSubmit} >
                        <label>Event Name </label>
                        <input
                            type='text'
                            placeholder='Event name...'
                            value={this.state.event_name}
                            onChange={this.handleName}
                            required
                        />
                        <label id="desc">Event Description: </label>
                        <textarea
                            type='text'
                            placeholder='Event description...'
                            value={this.state.event_description}
                            onChange={this.handleDescription}
                            onKeyDown={(e) => {this.handleTextarea(e)}}
                            required
                        />
                
                        <label>Event Date: </label>
                        <input
                            type='text'
                            placeholder='e.g. 01/01/2022'
                            value={this.state.event_date}
                            onChange={this.handleDate}
                            required
                        />
                        <br/>
                        <label>Event Time: </label>
                        <input
                            type='time'
                            placeholder='Event time:'
                            value={this.state.event_time}
                            onChange={this.handleTime}
                            required                        
                        />
                        <br/>
                        <label>Group</label>
                        <select value={this.state.class} onChange={this.handleClass} required>
                                <option value ="" disabled >Select</option>
                                <option value="All">All</option>
                                <option value="Mica">Mica</option>
                                <option value="Mijlocie">Mijlocie</option>
                                <option value="Mare">Mare</option>
                            </select>
                        <br/>
                        <label>Consent Required?</label>
                        <select value={this.state.consent} onChange={this.handleConsent} required>
                            <option value ="" disabled >Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <br/>
                        <input type="submit" value="Submit"/>
                        <br/>
                    </form>
                </div>
            )
        } else{
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

export default AddStudentEventPage;
