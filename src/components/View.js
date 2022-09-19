import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout.js";

class View extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results: [], 
            role: "", 
            search: "", 
            page: 1, 
            authenticated: false, 
            token: localStorage.getItem('userToken'),
        }
    }

    handleRemove = (e) => {
        let id = e.target.value

        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/remove"

        let formData = new FormData()
        formData.append("id", id)
        formData.append("type", this.props.type)

        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                window.alert("Successfully removed")
                window.location.reload()
            } else {
                window.alert("Could not remove")
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    handleSearch = (e) => {
        this.setState({search: e.target.value, page:1})
    }

    filterSearch = (s) => {
        let fullName = s.first_name.concat(" ").concat(s.last_name)
        let fullNameRev = s.last_name.concat(" ").concat(s.first_name)
        return (s.first_name.toLowerCase().includes(this.state.search.toLowerCase())
             || s.last_name.toLowerCase().includes(this.state.search.toLowerCase())
             || fullName.toLowerCase().includes(this.state.search.toLowerCase()) 
             || fullNameRev.toLowerCase().includes(this.state.search.toLowerCase()))
    }

    handleNextClick = () => {
        this.setState({page: this.state.page+1})
    }

    handlePreviousClick = () => {
        this.setState({page: this.state.page-1})
    }

    handleLogoutClick = () => {
        this.setState({authenticated: false, token: null})
        localStorage.removeItem('userToken')
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

        url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/view"

        formData = new FormData()
        formData.append("type", this.props.type)

        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error (response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results: data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    render() {
        console.log(this.props.type)
        let filteredResults = this.state.results
        if ((filteredResults.length > 0) && (this.state.search !== "")) {
            filteredResults = this.state.results.filter(this.filterSearch)
        }
        //console.log(filteredResults)

        let buttons = ""
        const pagesize = 20
        let pagemax = this.state.page * pagesize
        let pagemin = pagemax - pagesize

        buttons = (
            <div>
                <button onClick={this.handlePreviousClick} disabled={this.state.page <=1}>Previous</button>
                Page {this.state.page} of {Math.ceil(filteredResults.length/pagesize)}
                <button onClick={this.handleNextClick} disabled={this.state.page >= Math.ceil(filteredResults.length/pagesize)}>Next</button>
            </div>
        )

        filteredResults = filteredResults.slice(pagemin, pagemax)
        
        if (this.state.role === "admin") {
            if (this.props.type === "users"){ 
                return(
                    <div className="admin-lists">
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>Registered users</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Identifier</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.results.map( (element, i) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.first_name} {element.last_name}</td>
                                    <td>{element.role}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            } else {
                //let link = "/profile/update/".concat(this.props.type)
                let link = "/3/tpap/build/profile/add/".concat(this.props.type)
                return(
                    <div className="admin-lists">
                        <button><Link to="/3/tpap/build/profile" className="link">Go back</Link></button>
                        <Logout 
                            handleLogoutClick={this.handleLogoutClick}
                        />
                        <br/>
                        <h3>List of {this.props.type}</h3>
                        <label>Search by name: </label>
                        <input type="text" placeholder="search" value={this.state.search} onChange={this.handleSearch} />
                        <br/><br/>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Identifier</th>
                                    <th>Name</th> 
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredResults.map( (element, i) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.first_name} {element.last_name}</td>
                                    <td>
                                        <button value={element.id} readOnly onClick={this.handleRemove}>Remove</button>
                                    </td>
                                </tr>
                        ))}
                            </tbody>
                        </table>
                        {buttons}
                        <br/>
                        <button><Link to={link}>Add new {this.props.type}</Link></button>
                    </div>
                )
            }
        } else {
            return(
                <h1>You do not have the permission to do this action</h1>
            )
        }
    }
}

export default View;

