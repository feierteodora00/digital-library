import React from "react";
import Login from "./Login.js";
import Logout from  "./Logout.js";
import { Link } from "react-router-dom";
import User from "./User.js";

class ProfilePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            authenticated: false,
            email: "", 
            password: "",
            token: "", 
            message: ""
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handlePassword = (e) => {
        this.setState({password: e.target.value})
    }

    handleLoginClick = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/authenticate"

        let formData = new FormData()
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401){
                this.setState({message: "The information you entered is not correct or your account was not approved yet"})
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            if ("token" in data.results) {
                this.setState({
                    authenticated: true, 
                    token: data.results.token
                })
                localStorage.setItem('userToken', data.results.token)
                window.location.reload()
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

    }

    handleLogoutClick = () => {
        this.setState({authenticated: false, token: null})
        localStorage.removeItem('userToken')
        window.location.reload()
    }

    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('userToken')
            })
        }
    }

    render() {
        let page = (
            <div className="login">
                <Login 
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    handleLoginClick={this.handleLoginClick}
                />
                <p>{this.state.message}</p>
                <p>Forgot your password? <Link to="/3/tpap/build/passwordrecovery">Recover it now</Link></p>
                <p>Don't have an account? <Link to="/3/tpap/build/register">Register now</Link></p>
            </div>
        )

        if (this.state.authenticated) {
            page = (
                <div>
                    <br/>
                    <Logout 
                        handleLogoutClick={this.handleLogoutClick}
                    />
                    <br/>
                    <User token={this.state.token} />
                </div>
            )
        }

        return (
            <div>
                {page}
            </div>
        )
    }
}

export default ProfilePage;