import React from "react";
import AccountingLogs from "./AccountingLogs.js";
import SearchBox from "./SearchBox";

class AccountingLogsPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        search: "",
        page: 1,
        authenticated: false,
        token: localStorage.getItem('userToken'),
        role: "",
        user_id: 0
      }
      this.handleSearch = this.handleSearch.bind(this);
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

    handleSearch = (e) => {
      this.setState({search:e.target.value, page:1})
    }

    handlePreviousClick = () => {
        this.setState({page:this.state.page-1})
    }

    handleNextClick = () => {
        this.setState({page:this.state.page+1})
    }

    sendDueDateReminder() {

    }

    render() {
      if (this.state.authenticated) {
        if (this.state.role === "admin") {
          return (
              <div>
                <h2>Click on a parent and then on a child to view accouting details</h2>
                <SearchBox search={this.state.search} handleSearch={this.handleSearch} />
                <AccountingLogs
                    search={this.state.search}
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick}
                />
              </div>
          )
        }
        else if(this.state.role === "parent") {
          return (
            <div>
              <AccountingLogs
                  page={this.state.page}
                  handleNextClick={this.handleNextClick}
                  handlePreviousClick={this.handlePreviousClick}
                  parent_id={this.state.user_id}
              />
            </div>
          )
        }
      }
      else {
        return (
          <h2>You do not have authorization for this page.</h2>
        )
      }
    }
}

export default AccountingLogsPage;
