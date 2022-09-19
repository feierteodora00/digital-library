import React from "react";
import emailjs from '@emailjs/browser';

class PasswordRecovery extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "", 
            newpassword: "",
            message: ""
        }
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    makePassword = () => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < 8; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result
    }
    
    handleSendClick = (e) => {

        e.preventDefault();
        
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/passwordrecovery"

        let formData = new FormData();
        formData.append('email', this.state.email)
        formData.append('password', this.state.newpassword)


        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if ((response.status === 200)) {
                this.setState({message: "Password changed. Check your email"}) 
                emailjs.sendForm('gmail', 'template_2pky5o6', e.target, 'na7yXO_cFX-ajeexr')
                .then ((result) => {
                    console.log(result.text)
                }, (error) => {
                    console.log(error.text)
                }) 
            } else if (response.status === 404) {
                this.setState({message: "User does not exist. Check the email and try again"})
            } else {
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    componentDidMount() {
        let pass = this.makePassword()
        this.setState({newpassword: pass})
    }

    render(){
        
        return(
            <div>
                <br/>
                <h3>Password recovery page</h3>
                <p>Please enter your email. A temporary password will be sent to you by email. Use it to access your account. You can then change it to a memorable one</p>
                <form onSubmit={this.handleSendClick}>
                    <div className="form-group recovery">
                    <label>Email </label>
                    <input
                        className="form-control recovery"
                        type='email'
                        placeholder='email'
                        name="to_email"
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    </div>
                    <input 
                        type='hidden'
                        name='temp_password'
                        value={this.state.newpassword}
                    />
                    <br/>
                    <input type="submit" value="Send"/>
                </form>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default PasswordRecovery;