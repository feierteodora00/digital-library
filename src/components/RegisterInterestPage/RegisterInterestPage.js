import React from "react";
import './RegisterInterestPage.css';

/**
 * A from that can be used to fill in details to register an interest.
 * 
 * The form has the option to enter a first name, last name, age, phone number
 * email and a prefered language. These values are sent to the data base and stored
 * when the submit button is clicked. There is some validation to ensure that the
 * values that are entered into the database are correct ones.
 * 
 * @author Jake Ellerington
 */
class RegisterInterestPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            child_age: '',
            phone_number: '',
            email: '',
            language: '',
            message: 'If you would like to be contacted about the kindergarten, please fill in your information below.'
        };

        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleChildAge = this.handleChildAge.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstName = (event) => {
        this.setState({first_name: event.target.value})
    }

    handleLastName = (event) => {
        this.setState({last_name: event.target.value})
    }

    handleChildAge = (event) => {
        this.setState({child_age: event.target.value})
    }

    handlePhoneNumber = (event) => {
        this.setState({phone_number: event.target.value})
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value})
    }

    handleLanguage = (event) => {
        this.setState({language: event.target.value})
    }

    handleSubmit = (event) => {

        event.preventDefault();

        if(this.state.first_name !=='' && this.state.last_name !=='' && this.state.child_age !=='' && this.state.child_age > 4 && this.state.child_age < 8 && (this.state.phone_number !=='' || this.state.email !=='') && this.state.language !== ''){

            this.setState({message: 'The form submitted successfully.'})

            let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/registerinterest"

            let info = new FormData;

            info.append("first_name", this.state.first_name)
            info.append('last_name', this.state.last_name)
            info.append('child_age', this.state.child_age)
            info.append('phone_number', this.state.phone_number)
            info.append('email', this.state.email)
            info.append('language', this.state.language)

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
                console.log(err);
                this.setState({errorText:err.props})
                console.log("something went wrong ", err)
                }
            );

            this.setState({
                first_name: '',
                last_name: '',
                child_age: '',
                phone_number: '',
                email: '',
                language: '',
                message: 'If you would like to be contacted about the kindergarten, please fill in your information below.'

              });

              alert("The form submitted successfully.")

        } else if(this.state.child_age > 7 || this.state.child_age < 5 ) {
            this.setState({message: 'Please select an age between 5 and 7.'})

        } else if(this.state.first_name !=='' && this.state.last_name !=='' && this.state.child_age !=='' && (this.state.phone_number =='' && this.state.email =='')) {
            this.setState({message: 'Please enter either an email address or a phone number.'})

        } else if(this.state.first_name !=='' && this.state.last_name !=='' && this.state.child_age !=='' && (this.state.phone_number !=='' || this.state.email !=='') && this.state.language == '' ) {
            this.setState({message: 'Please select a language.'})

        } else this.setState({message: 'Please enter the required credentials.'})

    }

    render() {
    let message = this.state.message

        return (
            <div>
                <div className="registerForm">
                    <h1>Register Interest</h1>
                    <p>{message}</p>
                    <form  onSubmit={this.handleSubmit}>
                        <label>First name*: </label>
                        <input
                            type='text'
                            placeholder='first name'
                            value={this.state.first_name}
                            onChange={this.handleFirstName}
                        />
                        <br/>
                        <label>Last name*: </label>
                        <input
                            type='text'
                            placeholder='last name'
                            value={this.state.last_name}
                            onChange={this.handleLastName}
                        />
                        <br/>
                        <label>Age of child*: </label>
                        <input
                            type='number'
                            placeholder='age (5-7)'
                            value={this.state.child_age}
                            onChange={this.handleChildAge}
                        />
                        <br/>                
                        <label>Phone number: </label>
                        <input
                            type='text'
                            placeholder="phone number"
                            value={this.state.phone_number}
                            onChange={this.handlePhoneNumber}>
                        </input>
                        <br/>
                        <label>Email: </label>
                        <input
                            type='email'
                            placeholder='email'
                            value={this.state.email}
                            onChange={this.handleEmail}
                        />
                        <br/>
                        <label>Prefered Language*:</label>
                        <select value={this.state.language} onChange={this.handleLanguage}>
                            <option value="" disabled >Select</option>
                            <option value="English">English</option>
                            <option value="Romanian">Romanian</option>
                            <option value="German">German</option>
                        </select>
                        <br/>
                        <br/>
                        <button type="submit" value="Register">Submit</button>
                    </form>
                    <p id="mandatory">Fields marked with * are mandatory</p>
                </div>
            </div>
        )
    }
}

export default RegisterInterestPage;
