import React from "react";
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../App.css';

class Classes extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            authenticated: false,
            classes: [],
            role: "",
            children: [],
            firstname: "",
            lastname: "",
            token: localStorage.getItem('userToken')
        }
        this.handleClasses = this.handleClasses.bind(this)
    }
    handleClasses = (e) => {
        this.setState({classes: e.target.value})
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
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('userToken')
            })
        }

        let formData = new FormData();
        formData.append('action', 'retrieve')

        fetch("http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/classes", {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then ((response) => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then((data) => {
            this.setState({
                isLoaded: true,
                classes: data.results
            });
        })
        .catch( (err) => {
            this.setState({
                isLoaded: true,
                error: err
                });
        })

        let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/profile"

        formData = new FormData();
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
                id: data.results[0].id,
                role: data.results[0].role, 
                firstname: data.results[0].first_name,
                lastname: data.results[0].last_name,         
            })
        })
        .catch( (err) => {
            console.log("Something went wrong", err)
        })
    }
   
    render() {
        let tablehead = (
            <thead>

            </thead>
        )
        let children = this.state.children;
        console.log(children)
           
        const { classes } = this.state;
        if (this.state.authenticated) {
            if (this.state.role === "admin" || this.state.role === "teacher") {
                return(
                    <div className="file-inputs d-inline-flex p-2">
                        <Card className="ex" style={{ width: '500px' }}>
                        <Card.Title className="p-2">Choose your class to upload content </Card.Title>
                            <Card.Body>
                            {
                                classes.map((value) => 
                                    (

                                    <li key={value.id}>
                                        <Link to={`/3/tpap/build/classes/${value.id}`}
                                        state = {{classId: value.id}}> 
                                            {value.name}
                                        </Link>
                                    </li>

                                    ))
                            }
                        </Card.Body>
                        </Card>
                    </div>
                )
            } else if (this.state.role === "parent") {
                if (children.length > 0) {
                        tablehead = (
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                </tr>
                            </thead>
                        )
                }
                return (
                    <div className="file-inputs d-inline-flex p-2">
                    <Card className="ex" style={{ width: '500px' }}>
                    <Card.Body>
                        <div className="">
                            <h5>{this.state.firstname} {this.state.lastname}</h5>
                        </div>

                        <button 
                            onClick={this.handleParentChildren}
                            className="btn btn-sm btn-primary m-3"                  
                        >
                            See your enrolled children
                        </button>
                        <br/><br/>
                        <table> 
                            {tablehead} 
                            <tbody>
                            {
                                children.map( (child)=> (
                                    <tr key={child.id}>
                                        <td>{child.first_name} {child.last_name} </td> 
                                        <Link to={`/3/tpap/build/classes/${child.cls_id}`}
                                            state={{classId: child.cls_id}}
                                        > <td>
                                            <button className="btn btn-sm btn-primary">
                                                {child.name}
                                            </button>
                                        </td>
                                        </Link>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </Card.Body>
                        </Card>
                </div>
              
                )
               
        }

        } else {
            return (
                <div className="mt-3">
                    You do not have access to this page. Please log in before accessing this content
                </div>
            )
        }
    }       
}
export default Classes;
