import React from "react";
import Admin from "./Admin.js";

class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "", 
            email: "",
            firstname: "",
            lastname: "", 
            role: "", 
            passwordhash: "", 
            phonenumber: "", 
            password: "",
            passwordconfirm: "",
            message: "",
            children: [],
            deleteconfirmvisibility: false,
            nodata: ""
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
                    }  else {
                        this.setState({message: "Could not update details. Please try again"})
                    }
                })
            }
                
    }

    handleTeacherChildren = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/classchildren"

        let formData = new FormData();
        formData.append('first_name', this.state.firstname)
        formData.append('last_name', this.state.lastname)

        fetch(url,  {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                return response.json()
            } else if (response.status === 204) {
                this.setState({nodata: "No children to display"})
            } else{
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({children: data.results})
            //console.log(data.results)
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    handleParentChildren = (e) => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/parentchildren"

        let formData = new FormData();
        formData.append('first_name', this.state.firstname)
        formData.append('last_name', this.state.lastname)

        fetch(url,  {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({children: data.results})
            //console.log(data.results)
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    

    handleDeleteClick = () => {
        this.setState({
            deleteconfirmvisibility: true
        })
    }

    handleGoBackClick = () => {
        this.setState({
            deleteconfirmvisibility: false
        })
    }

    deleteAccount = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/deleteaccount"

        let formData = new FormData();
        formData.append('id', this.state.id)

        
        fetch(url, {
            method: "POST",
            headers: new Headers(), 
            body: formData
        })
        .then ( (response) => {
            if (response.status === 200) {
                localStorage.removeItem('userToken')
                window.alert("Account deleted successfully")
                window.location.href = "/register"
            } else {
                window.alert("Could not delete account")
            }
        })
    }

    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('userToken')
            })
        }

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

    }

    render() {
        
        let page = ""
        let children = this.state.children
        let deleteConfirm = ""
        let deleteconfirmvisibility = this.state.deleteconfirmvisibility
        
        if (deleteconfirmvisibility) {
            deleteConfirm = (
                <div>
                    <p>You are about to permanently delete your account</p>
                    <p>If you want to proceed, please click "PERMANENTLY DELETE"</p>
                    <p>If you accidentally clicked this button, please click "GO BACK"</p>
                    <button className="goback" onClick={this.handleGoBackClick}>GO BACK</button>
                    <br/>
                    <button className='delete' onClick={this.deleteAccount}>PERMANENTLY DELETE YOUR ACCOUNT</button>
                </div>
            )
        } else {
            deleteConfirm = ""
        }

        let nodata = this.state.nodata
        let tablehead = (
            <thead>

            </thead>
        )
        
        if (children.length > 0) {
            nodata = ""
            if (this.state.role === "parent"){
                tablehead = (
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                        </tr>
                    </thead>
                )
            }
            if (this.state.role === "teacher") {
                tablehead = (
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                )
            }
        }

        if (this.state.role === "teacher") {
            page = (
                <div>
                    <h3>Profile page</h3>
                    <p>Current details. You can update your password and phone number</p>
                    <form onSubmit={this.handleDetailsUpdate} className="update-details">
                        <div className="form-group">
                            <label>First name</label>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder={this.state.firstname}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Last name </label>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder={this.state.lastname}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={this.state.role}
                                readOnly
                        />
                        </div>
                        <div className="form-group">
                            <label>Email </label>
                            <input
                                className="form-control" 
                                type="text"
                                placeholder={this.state.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>New password </label>
                            <input 
                                className="form-control"
                                type="password"
                                value = {this.state.password}
                                placeholder="new password"
                                onChange={this.handlePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm new password </label>
                            <input 
                                className="form-control"
                                type="password"
                                value = {this.state.passwordconfirm}
                                placeholder="confirm new password"
                                onChange={this.handlePasswordConfirm}
                            />
                        </div>
                        <div className="form-group">
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
                    </form>
                    <p>{this.state.message}</p>
                    <br/>
                    <button onClick={this.handleTeacherChildren}>See children in your class</button>
                    <br/><br/>
                    <div className="user-lists">
                        {nodata}
                        <table className="table">
                        {tablehead}
                            <tbody>
                                {children.map( (child)=> (
                                    <tr key={child.id}>
                                        <td>{child.first_name} {child.last_name} </td> 
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <button className='delete' onClick={this.handleDeleteClick}>DELETE ACCOUNT</button>
                    {deleteConfirm}
                </div>
            )
        }

        if (this.state.role === "parent") {
                page = (
                    <div>
                        <h3>Profile page</h3>
                        <p>Current details. You can update your password and phone number</p>
                        <form onSubmit={this.handleDetailsUpdate} className="update-details">
                            <div className="form-group">
                                <label>First name</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder={this.state.firstname}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Last name </label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder={this.state.lastname}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder={this.state.role}
                                    readOnly
                            />
                            </div>
                            <div className="form-group">
                                <label>Email </label>
                                <input
                                    className="form-control" 
                                    type="text"
                                    placeholder={this.state.email}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>New password </label>
                                <input 
                                    className="form-control"
                                    type="password"
                                    value = {this.state.password}
                                    placeholder="new password"
                                    onChange={this.handlePassword}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm new password </label>
                                <input 
                                    className="form-control"
                                    type="password"
                                    value = {this.state.passwordconfirm}
                                    placeholder="confirm new password"
                                    onChange={this.handlePasswordConfirm}
                                />
                            </div>
                            <div className="form-group">
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
                        </form>
                        <p>{this.state.message}</p>
                        <br/>
                        <button onClick={this.handleParentChildren}>See your enrolled children</button>
                        <br/><br/>
                        <div className="user-lists">
                        {nodata}
                            <table className="table">
                            {tablehead}
                                <tbody>
                                    {children.map( (child)=> (
                                        <tr key={child.id}>
                                            <td>{child.first_name} {child.last_name} </td> 
                                            <td>{child.name}</td>
                                        </tr>
                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button className='delete' onClick={this.handleDeleteClick}>DELETE ACCOUNT</button>
                        {deleteConfirm}
                    </div>
            )
        }

        if (this.state.role === "admin") {
            page = (
                <div>
                    <h3>Profile page</h3>
                    <p>Current details. You can update your password and phone number</p>
                    <Admin token={this.props.token}/>
                </div>
            )
        }
        return(
            <div>
                {page}
            </div>
        )
    }
}

export default User;

