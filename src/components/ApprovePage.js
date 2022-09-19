import React from "react";
import emailjs from 'emailjs-com';

class ApprovePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "", 
            id: "", 
            message: ""
        }
    }

    handleEmail = (e) => {
        this.setState({email: e.target.value})
    }

    handleID = (e) => {
        this.setState({id: e.target.value})
    }

    handleApproveClick = (e) => {
        e.preventDefault();

        if (this.state.email !== "" && 
            this.state.id !== "" ) {

            let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/approveregistration"

            let formData = new FormData();
            formData.append('id', this.state.id)

            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: formData
            })
            .then( (response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    this.setState({message: "Approved. The user will soon receive confirmation email"}) 
                    emailjs.sendForm('service_9xlq82z', 'template_c2ewj0f', e.target, 'GHPDFB3x98XdaHhaQ')
                    .then ((result) => {
                        console.log(result.text)
                    }, (error) => {
                        console.log(error.text)
                    }) 
                } else {
                    this.setState({message: "User does not exist. Cannot approve request"})
                } 
            })
            .catch( (err) => {
                console.log("something went wrong", err)
            })
        } else {
            this.setState({message: "Incorrect information"})
        } 
    } 

    render() {
        let msg = this.state.message

        return(
            <div>
                <form onSubmit={this.handleApproveClick}>
                    <label>ID:</label>
                    <input
                        type='number'
                        placeholder="id"
                        value={this.props.id}
                        onChange={this.handleID}>
                    </input>
                    <br/>
                    <label>Email: </label>
                    <input
                        type='text'
                        placeholder='email'
                        name="to_email"
                        value={this.props.email}
                        onChange={this.handleEmail}
                    />
                    <br/>
                    <input type="submit" value="Approve"/>
                </form>
                <p>{msg}</p>
            </div>
        )
    }
}

export default ApprovePage;
