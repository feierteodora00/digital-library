import React from "react";
import { Link } from "react-router-dom";

class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "", 
            firstname: "",
            lastname: "",
            email: "",
            phonenumber: "",
            passwordhash: "", 
            role: "", 
            unapprovedusers: [],
            password: "",
            passwordconfirm: "",
            nousers: "No registration requests pending", 
            message: ""
        }
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handlePasswordConfirm = (e) => {
        this.setState({passwordconfirm: e.target.value})
    }

    handlePhoneNumber = (e) => {
        this.setState({phonenumber: e.target.value})
    }

    handleAccept = (e) => {
                
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/approveregistration"

        let formData = new FormData()
        formData.append("email", e.target.value)

        fetch(url, {
            method: "POST", 
            headers: new Headers(), 
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                window.alert("User approved successfully")
                window.location.reload()
            } else {
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    handleReject = (e) => {
        
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/rejectregistration"

        let formData = new FormData()
        formData.append("id", e.target.value)

        fetch(url, {
            method: "POST", 
            headers: new Headers(), 
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                window.alert("User rejected")
                window.location.reload()
            } else {
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    handleDetailsUpdate = (e) => {
        e.preventDefault();

        let ok = true
        if (this.state.password !== this.state.passwordconfirm ||
            (this.state.password.length < 6 && this.state.password !== "")) {
                ok = false
                this.setState({message: "Passwords must match and have at least 6 characters"})
        } else if (this.state.phonenumber !== "" && (this.state.phonenumber.length < 10 || this.state.phonenumber.length > 13)) {
            ok = false
            this.setState({message: "Phone number must have between 10 and 13 characters"})
        }
        
        if (ok){

                let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/updateuser"

                let formData = new FormData()
                formData.append('password', this.state.password)
                formData.append('phone_number', this.state.phonenumber)
                formData.append('id', this.state.id)

                fetch(url, {
                    method: "POST",
                    header: new Headers(),
                    body: formData
                })
                .then( (response) => {
                    if (response.status === 200) {
                        window.alert("Details successfully updated")
                        window.location.reload()
                    }  
                })
        } 
    }

    componentDidMount() {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/profile"

        let formData = new FormData();
        formData.append('token', this.props.token)

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
                id: data.results[0].id,
                role: data.results[0].role, 
                firstname: data.results[0].first_name,
                lastname: data.results[0].last_name,
                email: data.results[0].email,
                phonenumber: data.results[0].phone_number,
                passwordhash: data.results[0].hashed_password
            })
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

        url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/unapprovedusers"

        fetch(url, {
            method: "POST", 
            headers: new Headers()
        })
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({
                unapprovedusers: data.results
            })
            
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

    }

    render(){
        let nousers = this.state.nousers
        let tablehead = (
            <thead>

            </thead>
        )
        
        if (this.state.unapprovedusers.length > 0) {
            nousers = ""
            tablehead = (
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
            )
        } 
        
        return(
                <div>
                    <form onSubmit={this.handleDetailsUpdate} className="update-details">
                        <div class="form-group">
                            <label className="form-label">First name</label>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder={this.state.firstname}
                                readOnly
                            />
                        </div>
                        <div class="form-group">
                            <label>Last name </label>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder={this.state.lastname}
                                readOnly
                            />
                        </div>
                        <div class="form-group">
                            <label>Role</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={this.state.role}
                                readOnly
                            />
                        </div>
                        <div class="form-group">
                            <label>Email </label>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder={this.state.email}
                                readOnly
                            />
                        </div>
                        <div class="form-group">
                            <label>New password </label>
                            <input 
                                className="form-control"
                                type="password"
                                value = {this.state.password}
                                placeholder="new password"
                                onChange={this.handlePassword}
                            />
                        </div>
                        <div class="form-group">
                            <label>Confirm new password </label>
                            <input 
                                className="form-control"
                                type="password"
                                value = {this.state.passwordconfirm}
                                placeholder="confirm new password"
                                onChange={this.handlePasswordConfirm}
                            />
                        </div>
                        <div class="form-group">
                            <label>Phone number </label>
                            <input 
                                className="form-control"
                                type="text"
                                value = {this.state.phonenumber}
                                placeholder={this.state.phonenumber}
                                onChange={this.handlePhoneNumber}
                            />
                        </div>
                        <br/>
                        <input type="submit" value="Update details" className="button"/>
                        <p>{this.state.message}</p>
                    </form>

                    <div className="admin-lists">
                        <br/>
                        <p>Users that have requested approval:</p>
                        {nousers}
                        <table className="table">
                            {tablehead}
                            <tbody>
                            {this.state.unapprovedusers.map( (user, i)=> (
                                <tr key={user.id}>
                                    <td>{user.first_name} {user.last_name} </td> 
                                    <td>{user.email}</td> 
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={this.handleAccept} value={user.email}>Approve</button>
                                        <button onClick={this.handleReject} value={user.id}>Reject</button>
                                    </td>
                                </tr>
                            )
                            )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <p>Actions to do: </p>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/view/users" className="link">View users</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/view/teachers" className="link">View teachers</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/view/parents" className="link">View parents</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/view/children" className="link">View children</Link></button>
                        <br/>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/add/teachers" className="link">Add teachers</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/add/parents" className="link">Add parents</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/add/children" className="link">Add children</Link></button>
                        <button className="adminbutton"><Link to="/3/tpap/build/profile/add/admin" className="link">Add admin</Link></button>
                        <br/>
                    </div>
                </div>
        )
    }
}

export default Admin;
