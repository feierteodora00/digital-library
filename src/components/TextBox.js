import React from "react";

class TextBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            claim: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({claim: event.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        let url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/absences"
        console.log("Added absence with child_id: " + this.props.child.child_id + " on date: " + this.props.date + "with claim: " + this.state.claim)

        let formData = new FormData()
        formData.append('childid', this.props.child.child_id)
        formData.append('date', this.props.date)
        formData.append('claim', this.state.claim)

        fetch(url, { method: 'POST',
                    headers : new Headers(),
                    body:formData})
        .then( (response) => {
          if ((response.status === 200) || (response.status === 204)) {
              alert('Your claim has been sucessfully submitted');
          } else {
              throw Error(response.statusText)
          }
        })
        .catch ((err) => {
            alert('Something went wrong! It might be that your claim is too long. Please try again!');
            console.log("something went wrong ", err)
        });

        this.setState({claim: ""});
      }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Write your claim here' value={this.state.claim} onChange={this.handleChange} />
                <input type='submit' value='Submit claim'/>
            </form>
        )
    }
}

export default TextBox;

