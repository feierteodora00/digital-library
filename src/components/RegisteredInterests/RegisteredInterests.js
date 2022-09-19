import React from "react";

/**
 * A Table which lists all of the the people who have 
 * registered an interest in the kindergarten
 * 
 * This table displays, the name, age of child, phone number,
 * email, language and an option to remove  each person from 
 * the database. There is also buttons to go from page to page
 * incase the list becomes too long with a maximum length of 10.
 * There are also funtions to filter by language, age, search and
 * remove.
 * 
 *
 * @author Jake Ellerington
 */
class RegisteredInterests extends React.Component {
    
    constructor(props){
        super(props)
        this.state = { results:[] }
        console.log("constructor")
    }

    componentDidMount() {

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/registeredinterests" 
    
        fetch(url)
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    filterByLanguage = (lang) => {
        return ((lang.language === this.props.language) || (lang.language !== null && this.props.language==="all"));
    }

    filterByAge = (age) => {
        return ((age.child_age === this.props.child_age) || (age.child_age !== null && this.props.child_age==="all"));
    }

    filterSearch = (s) => {

        const name = s.first_name + " " + s.last_name
        
        return name.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.phone_number.toLowerCase().includes(this.props.search.toLowerCase()) 
        || s.email.toLowerCase().includes(this.props.search.toLowerCase())

    }

    handleRemoveUser = (remove) => {
        let user_id = remove.target.value

        let url = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/removeuser"

        let formData = new FormData()
        formData.append("user_id", user_id)
        

        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200){
                window.alert("User has been removed")
                window.location.reload()

            } else {
                window.alert("Could not remove")
                throw Error (response.statusText)
            }
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
    }    

    render() {

        let filteredResults = this.state.results

        if (this.props.language !== undefined) {
            filteredResults = filteredResults.filter(this.filterByLanguage)
        }

        if (this.props.child_age !== undefined) {
            filteredResults = filteredResults.filter(this.filterByAge)
        }
   
        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch) 
        }

        let buttons = ""

        if (this.props.page !== undefined) {
            
            const pageSize = 10
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
            
            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
                </div>
            )
            filteredResults = filteredResults.slice(pageMin,pageMax)
        }
   
        return (
            <div className='registeredInterestsList'>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Child's Age</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Language</th>
                            <th>Remove</th>
                        </tr>
                        {filteredResults.map( (registeredUser, i) => {
                            return(
                                <tr key={registeredUser.user_id}>
                                    <td>{registeredUser.first_name} {registeredUser.last_name}</td>
                                    <td>{registeredUser.child_age}</td>
                                    <td>{registeredUser.phone_number}</td>
                                    <td>{registeredUser.email}</td>
                                    <td>{registeredUser.language}</td>
                                    <td id="six">
                                        <button value={registeredUser.user_id} onClick={this.handleRemoveUser}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {buttons}
            </div>    
        )
    }
}
   
export default RegisteredInterests;
