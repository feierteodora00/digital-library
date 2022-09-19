import React from "react";

class CheckBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    componentDidMount() {
        if (this.props.attendants.length !== undefined) {
            let filteredList = this.props.attendants.filter( (item) => (this.isOnList(item)));

            if (filteredList.length > 0) {
                this.setState({checked: true})
            }
        }
    }

    isOnList = (item) => {
        return (item.child_id === this.props.child_id)
    }

    handleOnChange = () => {
        if (this.state.checked) {
            this.removeFromAttendants()
        } else {
            this.addToAttendants()
        }
    }

    addToAttendants = () => {
        let url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/attendance"
        console.log("Added attendant with child_id: " + this.props.child_id + " on date: " + this.props.date)

        let formData = new FormData()
        formData.append('add', this.props.child_id)
        formData.append('date', this.props.date)

        fetch(url, { method: 'POST',
                    headers : new Headers(),
                    body:formData})
        .then( (response) => {
          if ((response.status === 200) || (response.status === 204)) {
              this.setState({checked:!this.state.checked})
          } else {
              throw Error(response.statusText)
          }
        })
        .catch ((err) => {
          console.log("something went wrong ", err)
        });
    }

    removeFromAttendants = () => {
        let url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/attendance"
        console.log("Deleted attendant with child_id: " + this.props.child_id + " on date: " + this.props.date)

        let formData = new FormData()
        formData.append('remove', this.props.child_id)
        formData.append('date', this.props.date)

        fetch(url, {  method: 'POST',
                      headers : new Headers(),
                      body:formData})
        .then( (response) => {
            if ((response.status === 200) || (response.status === 204)) {
                this.setState({checked:!this.state.checked})
            } else {
                throw Error(response.statusText)
            }
        })
        .catch ((err) => {
            console.log("something went wrong ", err)
        });
    }

    render() {
        return (
            <input
                type="checkbox"
                name="attendants"
                value="child"
                checked={this.state.checked}
                onChange={this.handleOnChange}
            />
        )
    }
}

export default CheckBox;

