import React from "react";


/**
 * A from that can be used in order to fill in events in the Romanian language.
 * 
 * The form has the option to enter and event name, event description,
 * event date and an event time. These values are sent to the data base and stored
 * when the submit button is clicked.  There is some validation to ensure that the
 * values that are entered into the database are correct ones.
 * 
 * @author Jake Ellerington
 */
class AddEventRomaninan extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            language: 'romanian',
            event_name: '',
            event_description: '',
            event_date: '',
            event_time: '',
            message:''

        };

        this.handleLanguage = this.handleLanguage.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleDate = this.handleDate.bind(this)
        this.handleTime = this.handleTime.bind(this)
        
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleLanguage = (event) => {
        this.setState({language: event.target.value})
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
       

    handleSubmit = (event) => {

        event.preventDefault();

        if(this.state.language !=='' && this.state.event_name !=='' && this.state.event_description !=='' && this.state.event_date !=='' && this.state.event_time !==''
        && this.state.event_description.length > 5 && this.state.event_date.length > 9 && this.state.event_date.length < 11){

            let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/event"

            let info = new FormData;

            info.append('language', this.state.language)
            info.append('event_name', this.state.event_name)
            info.append('event_description', this.state.event_description.trim())
            info.append('event_date', this.state.event_date)
            info.append('event_time', this.state.event_time)
            
            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: info
            })
            
            .then( (response) => {
            
                if (response.status === 204) {
                    return response.json() 
                } else {
                    throw new Error(response.statusText)
                }
            })

            .catch ((err) => {
                this.setState({errorText:err.props})

                }
            );

            alert('The Romanian form has sumbmitted.')

            this.setState({
                event_name: '',
                event_description: '',
                event_date: '',
                event_time: '',
                message:''


            });

        } else if(this.state.event_date.length < 10 || this.state.event_date.length > 10 ) {
            this.setState({message: 'Please fill in the date in the correct format.'})
        
        } else if (this.state.event_description.length < 6) {
            this.setState({message: 'Please fill in the full description.'})
            
        }else this.setState({message: 'Please fill in all the details.'})
    }


    handleTextarea(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            
        }   
    }

    render() {    

        let message = this.state.message

        return (
            <div>
                <form className="addEvents" id="form3" onSubmit={this.handleSubmit} >
                    <input
                        type='text'
                        value={this.state.language}
                        onChange={this.handleLanguage}
                        hidden
                        required
                    />
                    <br/>
                    <label>Event Name </label>
                    <input
                        type='text'
                        placeholder='Event name...'
                        value={this.state.event_name}
                        onChange={this.handleName}
                        required
                    />
                    <label>Event Description: </label>
                    <textarea
                        type='text'
                        placeholder='Event description...'
                        value={this.state.event_description}
                        onChange={this.handleDescription}
                        onKeyDown={(e) => {this.handleTextarea(e)}}
                    />
                    <br/>
                    <label>Event Date: </label>
                    <input
                        type='text'
                        placeholder='e.g. 01/01/2022'
                        value={this.state.event_date}
                        onChange={this.handleDate}
                        required
                    />
                    <label>Event Time: </label>
                    <input
                        type='time'
                        placeholder='Event time:'
                        value={this.state.event_time}
                        onChange={this.handleTime}
                        required
                    />
                    {message}
                </form>
                
            </div>
        )
    }
}

export default AddEventRomaninan;
