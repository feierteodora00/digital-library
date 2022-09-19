import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AddFolder from './AddFolder.js';
import '../App.css';
import { useParams, useLocation } from 'react-router-dom';

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        let location = useLocation()

        return <Component {...props} params={params} state={location.state} />
    }
    return ComponentWithRouter
}
class Modules extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            modules: [],
            classId: props.params.classId,
            isLoaded: false,
            error: ''
        }
    }

    componentDidMount() {
        let formData = new FormData();
        formData.append('class_id', this.state.classId)
        formData.append('action', 'retrieveByClassId')

        fetch("http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/modules", {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then ((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .then((data) => {
            this.setState({
                isLoaded: true,
                modules: data.results
            });
        })
        .catch( (err) => {
            this.setState({
                isLoaded: true,
                error: err
                });
            })
    }

    render() {
        const { modules } = this.state;
        return (
            <div className="container">
                <div className="row d-flex-inline justify-content-center mt-4">
                    { modules.map((module) => (
                        <Accordion defaultActiveKey="0">
                            <div className="col scroll-section">
                                <Accordion.Item>
                                    <Accordion.Header key={module.id}>
                                        {module.name}              
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <AddFolder 
                                            moduleId={module.id} 
                                            classId={this.state.classId} 
                                            className={this.props.className} 
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </div>
                        </Accordion>
                        ))
                    }
                </div>
              </div>
            )
        }
    }

export default withRouter(Modules);

