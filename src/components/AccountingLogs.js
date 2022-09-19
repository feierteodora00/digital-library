import React from 'react';
import AccountingLog from './AccountingLog.js';

class AccountingLogs extends React.Component {

    constructor(props) {
        super(props)
        this.state = { parents: [] }
    }

    componentDidMount() {
        /* Retrive all parents or just one */
        let url="http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/parents"

        if(this.props.parent_id !== undefined) {
            url += "?id=" + this.props.parent_id
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
            this.setState({parents:data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    filterSearch = (search) => {
        return (
            search.first_name.toLowerCase().includes(this.props.search.toLowerCase()) ||
            search.last_name.toLowerCase().includes(this.props.search.toLowerCase())
        )
    }

    render() {
        let displayedTitle = ""

        /* Notify if nothing was returned */
        let noData = ""
        if (this.state.parents.length === 0) {
            noData = <p>No data</p>
        }

        let filteredResults = this.state.parents

        /* Enable filtering by search term */
        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch)
        }

        /* Enable pagination only if there are multiple parents returned */
        let buttons = ""

        if (this.props.page !== undefined && this.state.parents.length > 1) {
            const pageSize = 10;
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize

            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <p>Page {this.props.page} of {Math.ceil(filteredResults.length / pageSize)}</p>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
                </div>
            )

            filteredResults = filteredResults.slice(pageMin,pageMax)
        }

        /* Display title based on the type of user (based on how many parents the api returned) */
        if(this.state.parents.length > 1) {
            displayedTitle = <h3>Parents:</h3>
        }
        else {
            displayedTitle = <h3>Click in your name to see accouting details:</h3>
        }

        /* Remind parents on due dates */
        if(this.state.parents.length === 1 && new Date().getDate() > 25 && new Date().getDate() <= 29) { // the days when parents used to be reminede
            //window.alert("The due date for this month is approaching. Please pay the fee if you have not done so already. Thank you!");
        }

        return(
            <div>
                {noData}
                {displayedTitle}
                {filteredResults.map( (parent) => (<AccountingLog key={parent.first_name + " " + parent.last_name} parent={parent}/>))}
                {buttons}
            </div>
        )
    };
}

export default AccountingLogs;
