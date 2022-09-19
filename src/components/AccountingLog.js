import React from 'react';

class AccountingLog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayChild: false,
            displayAccounting: false,
            clickedChild: null,
            children: [],
            attendance: [],
            additionalCourses: []
        }
    }

    componentDidMount() {
        /* Retrive the child based on the sent parent through props */
        let url="http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/children"

        if (this.props.parent.parent_id !== undefined) {
            url += "?parentid=" + this.props.parent.parent_id
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
    }

    /* Handle clicks on parents */
    handleParentClick = () => {
        this.setState({displayChild: !this.state.displayChild})
    }

    /* Handle clicks on children */
    handleChildClick (child) {
        this.setState({displayAccounting: !this.state.displayAccounting})
        this.setState({clickedChild: child})

        /* Retrive attendance information for this specific child */
        let url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/attendance"

        let formData = new FormData()
        formData.append('childid', child.child_id)

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
            this.setState({attendance:data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })

        /* Retrive information on courses undertaken by this specific child */
        url = "http://unn-w19021004.newnumyspace.co.uk/year3/tpap/backend/api/additionalcourses"

        if (child.child_id !== undefined) {
            url += "?childid=" + child.child_id
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
            this.setState({additionalCourses:data.results})
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }

    render() {
        let teachingFee = 1200
        let mealsFee = 0
        let additionalCoursesFee = 0
        let totalFee = 0

        if(this.state.attendance.length !== undefined) {
            mealsFee = this.state.attendance.length * 16
        }

        if(this.state.additionalCourses.length !== undefined) {
            additionalCoursesFee = this.state.additionalCourses.length * 16
        }

        totalFee = teachingFee + mealsFee + additionalCoursesFee



        let childDetails = ""
        let accountingDetails = ""
        let additionalCoursesDetails = ""
        let payedFeeDetails = ""

        /* Displayed details when a parent is clicked */
        if (this.state.displayChild) {
            childDetails = <div className="card">
                                <div className="card-body extended">
                                    <h3 className="">Children:</h3>

                                    {this.state.children.map((child) => (
                                        <p onClick={() => this.handleChildClick(child)} key={child.first_name + " " + child.last_name}>{child.first_name} {child.last_name}</p>)
                                    )}
                                </div>
                            </div>
        }

        /* Display additional courses details */
        if(this.state.additionalCourses.length !== undefined) {
            additionalCoursesDetails = this.state.additionalCourses.map((obj) => (
                                            <p className="in-line" key={obj.child_id + obj.course}>{obj.course} (16 RON)</p>
                                        ))
        }
        else {
            additionalCoursesDetails = <p>No enorollment (0 RON)</p>
        }

        /* Displayed details when a child is clicked */
        if (this.state.displayAccounting) {
            accountingDetails = <div className="card">
                                    <div className="card-body extended">
                                        <h3 className="">Accouting Deatils:</h3>

                                        <p className="sticky-p"><b>Accouting details for:</b> {this.state.clickedChild.first_name + " " + this.state.clickedChild.last_name}</p>
                                        <p className="sticky-p"><b>Teaching Fee (fixed):</b> {teachingFee} RON</p>
                                        <p className="sticky-p"><b>Meals Fee (attendance):</b> {mealsFee} RON</p>
                                        <p className="sticky-p"><b>Additional Courses Names and Fees:</b></p>
                                        {additionalCoursesDetails}

                                        <p className="sticky-p"><b>Total Fee:</b> {totalFee} RON</p>
                                    </div>
                                </div>
        }

        return(
            <div>
                <p onClick={this.handleParentClick}>{this.props.parent.first_name} {this.props.parent.last_name}</p>
                {childDetails}
                {accountingDetails}
            </div>
        )
    }
}

export default AccountingLog;
