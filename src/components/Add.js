import React from "react";
import emailjs from '@emailjs/browser';
import Logout from "./Logout.js";
import {Link} from 'react-router-dom';

class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            class: "1",
            dob: "",
            phonenumber: "",
            email: "",
            password: "", 
            passwordconfirm: "",
            parentid: "", 
            message: "", 
            role: "",
            authenticated: false,
            token: localStorage.getItem('userToken')
        }
    }

    handleFirstName = (e) => {
        this.setState({firstname: e.target.value})
    }

    handleLastName = (e) => {
        this.setState({lastname: e.target.value})
    }

    handleClassSelect = (e) => {
        this.setState({class: e.target.value})
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handlePhoneNumber = (e) => {
        this.setState({phonenumber: e.target.value})
    }

    handleDOB = (e) => {
        this.setState({dob: e.target.value})
    }

    handleParentId = (e) => {
        this.setState({parentid: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handlePasswordConfirm = (e) => {
        this.setState({passwordconfirm: e.target.value})
    }

    handleAddClick = (e) => {
        e.preventDefault();

        //check entity type and display messages if missing/incorrect info
        let ok = true;
        if (this.props.type === "admin") {
            if (this.state.firstname === "" || this.state.lastname === "") {
                ok = false
                this.setState({message: "Name fields must not be empty"})
            } else if (this.state.password !== this.state.passwordconfirm || this.state.password.length < 6){
                ok = false
                this.setState({message:"Password must match and have at least 6 characters"})
            }
        } else if (this.props.type === "teachers"){
            if (this.state.firstname === "" || this.state.lastname === "") {
                ok = false
                this.setState({message: "Name fields must not be empty"})
            }
        } else if (this.props.type === "parents") {
            if (this.state.firstname === "" || this.state.lastname === "") {
                ok = false
                this.setState({message: "Name fields must not be empty"})
            } else if (this.state.email === "" && this.state.phonenumber === "") {
                ok = false
                this.setState({message: "You must provide at least one contact method"})
            } else if (this.state.phonenumber !== "" && (this.state.phonenumber.length < 10 || this.state.phonenumber.length > 13)) {
                ok = false
                this.setState({message: "The phone number must have between 10 and 13 characters"})
            }
        } else if (this.props.type === "children") {
            if (this.state.firstname === "" || this.state.lastname === "") {
                ok = false
                this.setState({message: "Name fields must not be empty"})
            } else if (this.state.dob === "") {
                ok = false
                this.setState({message: "Date of birth must not be empty"})
            } else if (this.state.parentid === "" ) {
                ok = false
                this.setState({message: "Parent ID is must not be empty"})
            }
        }

        if (ok) {
            let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/add"

            let formData = new FormData()
            formData.append("type", this.props.type)
            formData.append("first_name", this.state.firstname)
            formData.append("last_name", this.state.lastname)
            formData.append("class", this.state.class)
            formData.append("email", this.state.email)
            formData.append("password", this.state.password)
            formData.append("phone_number", this.state.phonenumber)
            formData.append("dob", this.state.dob)
            formData.append("parent_id", this.state.parentid)

            fetch(url, {
                method:"POST", 
                headers: new Headers(),
                body: formData
            })
            .then( (response) => {
                if (response.status === 200) {
                    if (this.props.type === "admin") {
                        emailjs.sendForm('service_9xlq82z', 'template_c2ewj0f', e.target, 'GHPDFB3x98XdaHhaQ')
                        .then ((result) => {
                            console.log(result.text)
                        }, (error) => {
                            console.log(error.text)
                        }) 
                    }
                    window.alert("Successfully added")
                    window.location.reload()
                } else {
                    window.alert("Could not add")
                    throw Error (response.statusText)
                }
            })
            .catch( (err) => {
                console.log("something went wrong", err)
            })
        } 
    }

    handleLogoutClick = () => {
        this.setState({authenticated: false, token: null})
        localStorage.removeItem('userToken')
        window.location.replace('year3/tpap/backend/profile')
    }

    componentDidMount = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/profile"

        let formData = new FormData();
        formData.append('token', localStorage.getItem('userToken'))

        if (localStorage.getItem('userToken')) {
            this.setState({authenticated: true})
        }

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
        if (this.state.role === "admin"){
            if (this.props.type === "teachers"){
                return (
                    <div>
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>Add a new teacher</h3>
                        <p>Enter the details of a new teacher, then click the "Add teacher" button</p>
                        <form onSubmit={this.handleAddClick} className="update-details">
                            <div className="form-group">
                                <label>First name </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="first name"
                                    value={this.state.firstname}
                                    onChange={this.handleFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="last name"
                                    value={this.state.lastname}
                                    onChange={this.handleLastName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Class </label>
                                <select value={this.state.class} onChange={this.handleClassSelect} name="class" className="form-control">
                                    <option value="1">Small</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Big</option>
                                </select>
                            </div>
                            <br/>
                            <input type="submit" value="Add teacher" className="button"></input>
                        </form>
                        <br/>
                        <p>All fields are mandatory</p>
                        <p>{this.state.message}</p>
                    </div>
                )
            } else if (this.props.type === "parents") {
                return(
                    <div>
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>Add a new parent</h3>
                        <p>Enter the details of a new parent, then click the "Add parent" button</p>
                        <form onSubmit={this.handleAddClick} className="update-details">
                            <div className="form-group">
                                <label>First name* </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="first name"
                                    value={this.state.firstname}
                                    onChange={this.handleFirstName}
                                />
                            </div>
                            <div className="form-group">
                            <label>Last name* </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="last name"
                                value={this.state.lastname}
                                onChange={this.handleLastName}
                            />
                            </div>
                            <div className="form-group">
                                <label>Email </label>
                                <input 
                                    className="form-control"
                                    type="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone number </label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="phone number"
                                    value={this.state.phonenumber}
                                    onChange={this.handlePhoneNumber}
                                />
                            </div>
                            <br/>
                            <input type="submit" value="Add parent" className="button"></input>
                        </form>
                        <br/>
                        <p>Fields marked with * are mandatory</p>
                        <p>{this.state.message}</p>
                    </div>
                )
            } else if (this.props.type === "children") {
                return(
                    <div>
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>Add a new child</h3>
                        <p>Enter the details of a child, then press the "Add child" button</p>
                        <form onSubmit={this.handleAddClick} className="update-details">
                            <div className="form-group">
                                <label>First name </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="first name"
                                    value={this.state.firstname}
                                    onChange={this.handleFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="last name"
                                    value={this.state.lastname}
                                    onChange={this.handleLastName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of birth </label>
                                <input 
                                    className="form-control"
                                    type="date"
                                    placeholder="date of birth"
                                    value={this.state.dob}
                                    onChange={this.handleDOB}
                                />
                            </div>
                            <div className="form-group">
                                <label>Class </label>
                                <select value={this.state.class} onChange={this.handleClassSelect} name="class" className="form-control">
                                    <option value="1">Small</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Big</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Parent identifier (view the list of parents to get this information): </label>
                                <input 
                                    className="form-control"
                                    type="number"
                                    placeholder="parent id"
                                    value={this.state.parentid}
                                    onChange={this.handleParentId}
                                />
                            </div>
                            <br/>
                            <input type="submit" value="Add child" className="button"></input>
                        </form>
                        <br/>
                        <p>All fields are mandatory</p>
                        <p>{this.state.message}</p>
                    </div>
                )
            } else if (this.props.type === "admin") {
                return(
                    <div>
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>Add a new administrator</h3>
                        <p>Complete the following form to add a new administrator</p>
                        <p>Beware: once added, the new admin will have the same privileges you have access to!</p>
                        <p>The new admin will receive an email informing them about their role, and containing the temporary password you set for them</p>
                        <form onSubmit={this.handleAddClick} className="update-details">
                            <div className="form-group">
                                <label>First name* </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="first name"
                                    value={this.state.firstname}
                                    onChange={this.handleFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name* </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="last name"
                                    value={this.state.lastname}
                                    onChange={this.handleLastName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone number </label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="phone number"
                                    value={this.state.phonenumber}
                                    onChange={this.handlePhoneNumber}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email* </label>
                                <input 
                                    className="form-control"
                                    type="email"
                                    placeholder="email"
                                    name="to_email"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password* </label>
                                <input 
                                    className="form-control"
                                    type="password"
                                    placeholder="password"
                                    name="temp_pass"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm password* </label>
                                <input 
                                    className="form-control"
                                    type="password"
                                    placeholder="password"
                                    value={this.state.passwordconfirm}
                                    onChange={this.handlePasswordConfirm}
                                />
                            </div>
                            <br/>
                            <input type="submit" value="Add admin" className="button"></input>
                        </form>
                        <br/>
                        <p>Fields marked with * are mandatory</p>
                        <p>{this.state.message}</p>
                    </div>
                )
            } else {
                return(
                    <div>
                        <h1>Cannot add this type to database</h1>
                    </div>
                )
            }
        }else {
            return(
                <h1>You do not have permission to do this action</h1>
            )
        }
    }
}

export default Add;
