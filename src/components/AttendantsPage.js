import React from "react";
import Attendants from "./Attendants.js";
import SelectCourse from "./SelectCourse.js";
import AbsenceClaims from "./AbsenceClaims.js";

class AttendantsPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        course: "",
        date: new Date().getFullYear()+'-'+('0' + (new Date().getMonth()+1)).slice(-2)+'-'+new Date().getDate(),
        page: 1,
        authenticated: false,
        token: localStorage.getItem('userToken'),
        role: "",
        user_id: 0
      }
      this.handleCourseSelect = this.handleCourseSelect.bind(this);
      this.handlePreviousClick = this.handlePreviousClick.bind(this);
      this.handleNextClick = this.handleNextClick.bind(this);
    }

    componentDidMount () {
      if (localStorage.getItem('userToken')) {
        this.setState({
            authenticated: true,
            token: localStorage.getItem('userToken')
        })
      }

      let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/profile"

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
            role: data.results[0].role,
            user_id: data.results[0].id
        })
      })
      .catch( (err) => {
          console.log("something went wrong", err)
      })
    }

    handleCourseSelect = (e) => {
      this.setState({course:e.target.value, page:1})
    }

    handlePreviousClick = () => {
        this.setState({page:this.state.page-1})
    }

    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }

    render() {
      if (this.state.authenticated) {
        if (this.state.role === "teacher") { // should be able to merk children as present
          return (
              <div>
                <h2>Check a box to mark a child as attending</h2>
                <SelectCourse course={this.state.course} handleCourseSelect={this.handleCourseSelect}/>
                <label><b>Date:</b> {this.state.date}</label>
                <Attendants
                    course={this.state.course}
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick}
                    date={this.state.date}
                />
              </div>
          )
        } else if (this.state.role === "parent") { // should be able to submit a claim for absence
            return (
              <div>
                <h2>Submit an absence claim for today's date</h2>
                <AbsenceClaims parent_id={this.state.user_id} date={this.state.date}/>
              </div>
            )
        }
      }else {
          return (
            <h2>You do not have authorization for this page.</h2>
          )
      }
    }
}

export default AttendantsPage;
