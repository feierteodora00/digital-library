import React from 'react';
import TextBox from "./TextBox.js";
import Attendant from './Attendant.js';

class AbsenceClaims extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            children: [],
            absences: []
        }
    }

    componentDidMount() {
        /* Retrive the child based on the sent parent through props */
        let url="http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/children"

        if (this.props.parent_id !== undefined) {
            url += "?parentid=" + this.props.parent_id
        }

        fetch(url)
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({children:data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

        if(this.props.role !== undefined) {
            /* Retrive absences for todays's date */
            url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/absences"

            let formData = new FormData()
            formData.append('date', this.props.date)

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
                this.setState({absences:data.results})
            })
            .catch( (err) => {
                console.log("something went wrong", err)
            })
        }
    }


    render() {
        let displayedData = ""

        /* Notify if nothing was returned */
        let noData = ""
        if (this.state.children.length === 0) {
            noData = <p>No data</p>
        }

        return(
            <div>
                {noData}
                {this.state.children.map( (child) => (
                    <div key={child.child_id}>
                        <div><b>Absence claim for:</b> {<Attendant child={child}/>}</div>
                        <TextBox claim={this.state.claim} child={child} date={this.props.date}/>
                    </div>
                ))}
            </div>
        )
    };
}

export default AbsenceClaims;
