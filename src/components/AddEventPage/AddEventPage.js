import React from "react";
import AddEventEnglish from "../AddEventEnglish/AddEventEnglish";
import AddEventGerman from "../AddEventGerman/AddEventGerman";
import AddEventRomanian from "../AddEventRomanian/AddEventRomanian";
import './AddEventPage.css';


/**
 * A page which combines all of the add event forms into one.
 * 
 * The page displays all three language forms so that the user
 * can equally add in the translation of events that take place at
 * the kindergarten so they do not have to remeber what do add 
 * when appropriately translating it to another language.
 * 
 * @author Jake Ellerington
 */
class AddEventPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            token: localStorage.getItem('userToken')
        };

    }

    componentDidMount = () => {
        let url = "http://unn-w19006590.newnumyspace.co.uk/year3/tpap/backend/profile"
    
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
                role: data.results[0].role
            })
        })
        .catch( (err) => {
            console.log("something went wrong", err)
        })
     }

    render() {
        if (this.state.role === "admin"){  

            return (
                <div>
                    <div className="eventPage">
                        <div className="information">
                            <h2>English</h2>
                            <AddEventEnglish/>
                            <button className="submit" type="submit" form="form1">Submit</button>
                        </div>
                        <div className="information1">
                            <h2>German</h2>
                            <AddEventGerman/>
                            <button className="submit" type="submit" form="form2">Submit</button>
                        </div>
                        <div className="information2">
                            <h2>Romanian</h2>
                            <AddEventRomanian/>
                            <button className="submit" type="submit" form="form3" >Submit</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                   <h1>
                      'You dont have permissions'
                   </h1>
                </div>
            )
        }
    }
}

export default AddEventPage;
