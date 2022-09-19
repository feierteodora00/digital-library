import React from 'react';
import CheckBox from "./CheckBox.js";
import Attendant from './Attendant.js';

class Attendants extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            children: [],
            attendants: []
        }
    }

    componentDidMount() {
        /* Retrive all children */
        let url="http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/children"


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

        /* Retrive children who have been marked as present for the date set */
        url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/attendance"

        let formData = new FormData()
        formData.append('date', this.props.date)

        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({attendants:data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    filterByCourse = (child) => {
        return ((child.course === this.props.course) || (this.props.course === ""))
    }

    render() {
        /* Notify if nothing was returned */
        let noData = ""
        if (this.state.children.length === 0) {
            noData = <p>No children data</p>
        }

        let filteredChildren = this.state.children

        /* Enable filtering by course */
        if (this.props.course !== undefined) {
            filteredChildren = filteredChildren.filter(this.filterByCourse)
        }

        /* Enable pagination */
        let buttons = ""

        if (this.props.page !== undefined) {
            const pageSize = 10;
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize

            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <p>Page {this.props.page} of {Math.ceil(filteredChildren.length / pageSize)}</p>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredChildren.length / pageSize)}>Next</button>
                </div>
            )

            filteredChildren = filteredChildren.slice(pageMin,pageMax)
        }

        return(
            <div>
                {noData}
                {filteredChildren.map( (child) => (
                    <div key={child.child_id}>
                        <CheckBox attendants={this.state.attendants} child_id={child.child_id} date={this.props.date} />
                        <Attendant child={child}/>
                    </div>
                ))}
                {buttons}
            </div>
        )
    };
}

export default Attendants;