/**
 * Handles user registration
 * 
 * @author Teodora Feier w19006590
 */
 import React from "react";
 import emailjs from '@emailjs/browser';
class RegisterPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            passwordconfirm: "",
            message: "",
            firstname: "",
            lastname: "",
            role: "teacher", 
            phonenumber: "", 
            statuscode: ""
        }

    }
    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handlePasswordConfirm = (e) => {
        this.setState({passwordconfirm: e.target.value})
    }

    handleFirstName = (e) => {
        this.setState({firstname: e.target.value})
    }

    handleLastName= (e) => {
        this.setState({lastname: e.target.value})
    }

    handleRoleSelect = (e) => {
        this.setState({role: e.target.value})
    }

    handlePhoneNumber = (e) => {
        this.setState({phonenumber: e.target.value})
    }

    handleRegisterClick = (e) => {

        e.preventDefault();

        if (this.state.password === this.state.passwordconfirm && 
            this.state.password.length >5 &&
            this.state.email !== "" && 
            this.state.firstname !== "" &&
            this.state.lastname !== "") {

            let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/register"

            let formData = new FormData();
            formData.append('email', this.state.email)
            formData.append('password', this.state.password)
            formData.append('first_name', this.state.firstname)
            formData.append('last_name', this.state.lastname)
            formData.append('phone_number', this.state.phonenumber)
            formData.append('role', this.state.role)

            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: formData
            })
            .then( (response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState({statuscode: response.status}) 
                    emailjs.sendForm('service_9xlq82z', 'template_4bf7vxc', e.target, 'GHPDFB3x98XdaHhaQ')
                    .then ((result) => {
                        console.log(result.text)
                    }, (error) => {
                        console.log(error.text)
                    }) 
                    window.alert("You have successfully registrated. Check your inbox for confimation email")
                    window.location.reload()
                } else if (response.status === 403) {
                    this.setState({message: "You have already registered with this email. Login to your account if your account is approved, otherwise wait for approval"})
                } else {
                    this.setState({message: "Could not register. Please enter valid details."})
                }
            })
            .catch( (err) => {
                console.log("something went wrong", err)
            })
        } else {
            this.setState({message: "Incorrect information.  Passwords must match and be longer than 6 characters. Email must contain '@' and cannot be empty. First and last name fields cannot be empty. Please try again"})
        } 
    }

    
    render() {
        let msg = this.state.message

        return (
            <div className="register">
                <h3>Register Page</h3>
                <p>If you are a parent or a teacher, you can create an account by completing the following form</p>
                <form onSubmit={this.handleRegisterClick} className="register-form">
                    <div className="form-group">
                        <label>First name* </label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder='first name'
                            name="to_name"
                            value={this.props.firstname}
                            onChange={this.handleFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last name* </label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder='last name'
                            value={this.props.lastname}
                            onChange={this.handleLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label> Role* </label>
                        <select value={this.state.role} onChange={this.handleRoleSelect} name="role" className="form-control">
                            <option value="teacher">Teacher</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone number</label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder="phone number"
                            value={this.props.phonenumber}
                            onChange={this.handlePhoneNumber}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Email* </label>
                        <input
                            className="form-control"
                            type='text'
                            placeholder='email'
                            name="to_email"
                            value={this.props.email}
                            onChange={this.handleEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password* </label>
                        <input
                            className="form-control"
                            type='password'
                            placeholder='password'
                            value={this.props.password}
                            onChange={this.handlePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password* </label>
                        <input
                            className="form-control"
                            type='password'
                            placeholder='confirm password'
                            value={this.props.passwordconfirm}
                            onChange={this.handlePasswordConfirm}
                        />
                    </div>
                    <br/>
                    <input type="submit" value="Register" className="button"/>
                </form>
                <p>Fields marked with * are mandatory</p>
                <p>{msg}</p>
            </div>
        )
    }
}

export default RegisterPage;