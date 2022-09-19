import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import '../App.css';

class AddFolder extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            folderName: "",
            classId: props.classId,
            moduleId: props.moduleId,
            result: '',
            folders: [],
            authenticated: false,
            errors: ''
        }
        this.handleFolderName = this.handleFolderName.bind(this)
        this.handleModule = this.handleModule.bind(this)
    }
    handleFolderName = (e) => {
        this.setState({folderName: e.target.value})
    }
    handleModule = (e) => {
        this.setState({module: e.target.value})
    }
    validateForm () {
        let folderName = this.state.folderName;
        let error = '';
        if (!folderName.match(/^[a-zA-Z ]*$/)) {
            error = "Please enter valid characters only."
        } else if (folderName.length < 4 ) {
            error = "Please enter at least 4 characters."
        }    

        this.setState({errors: error});
        return error.length > 0 ? false : true;
    }
    handleSaveClick = (e) => {

        e.preventDefault();
        let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/folders"

        let formData = new FormData();
        formData.append('action', 'add')
        formData.append('folder_name', this.state.folderName)
        formData.append('module_id', this.state.moduleId)

        if (this.validateForm()) {

            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: formData
            })
            .then( (response) => {
                if ((response.status === 200) || (response.status === 204)) {
                // this.setState({message: "Folder has been inserted"}) 
                    return response.json()
                }
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    folders: data.results ? data.results : [],
                    folderName: ""
                })
            })
            .catch((err) => {
                this.setState({
                    isLoaded: true,
                    result: err
                })
            })
            // e.target.reset();

            // }  else {
            //     this.setState({error: "The folder name must be at least 4 characters"})
            // }
            e.target.reset();
        } else {
            console.log('we have errors mofo')
        }
    }

    handleDeleteOnClick = (e) => {
        const confirmed = window.confirm("Are you sure you want to delete this folder?");

        if (confirmed) {
            const id = e.currentTarget.getAttribute("data-id")

            let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/folders"

            let formData = new FormData();
            formData.append('action', 'delete')
            formData.append('folder_id', id)
            formData.append('module_id', this.state.moduleId)

            fetch(url, {
                method: 'POST',
                headers: new Headers(),
                body: formData
            })
            .then( (response) => {
                if ((response.status === 200) || (response.status === 204)) {
                    return response.json()
                } 
            })
            .then((data) => {
                this.setState({
                    isLoaded: true,
                    folders: data.results ? data.results : [],
                });
            })
            .catch( (err) => {
                this.setState({
                    isLoaded: true,
                    folders: [],
                    result: err
                })
            })
        }
    }

    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            this.setState({
                authenticated: true,
                token: localStorage.getItem('userToken')
            })
        }

        let formData = new FormData();
        formData.append('module_id', this.state.moduleId)
        formData.append('action', 'retrieveByModules')

        fetch("http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/folders", {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
        .then ((response) => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then((data) => {
            this.setState({
                isLoaded: true,
                folders: data.results ?? "",
            });
        })
        .catch( (err) => {

            this.setState({
                isLoaded: true,
                error: err,
                folders: ''
                });
        })

        formData = new FormData()
        formData.append("type", this.props.type)
        fetch("http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/view", {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then( (response) => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then( (data) => {
            this.setState({results: data.results})
        })
        .catch( (err) => {
            console.log("Something went wrong", err)
        })

        let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/profile"

        formData = new FormData();
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
    const { folders, classId, moduleId } = this.state;
      if (this.state.authenticated) {
         if (this.state.role === "admin" || this.state.role === "teacher"  ) {
            return(
               <div className="file-card">
                  <div className="file-inputs d-inline-flex p-2">
                        <Card className="ex">
                           <Card.Body>
                           <Card.Title className="p-2">Add a Folder</Card.Title>
                              <form onSubmit={this.handleSaveClick}>
                                    <label className="mx-2">Folder Name: </label>
                                    <input
                                       type='text'
                                       placeholder='Folder name'
                                       name="folder-name"
                                       value={this.props.folderName}
                                       onChange={this.handleFolderName}
                                    />
                                    <input type="submit" value="Add" className="mx-2" disabled={ !this.state.folderName }/>

                              </form>
                              <div className="text-danger">{this.state.errors}</div>

                        </Card.Body>
                        </Card>
                  </div>

                  <Table striped className="my-4 w-50">
                        <thead>
                           <tr>
                              <th>Folder Name</th>
                              <th>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              folders.length > 0 ? (
                                    folders.map((folder) => (
                                       <tr className="align-middle" key={folder.id}>
                                          <td>
                                                {folder.folder_name}
                                          </td>
                                          <td>
                                                <Link to={`/3/tpap/build/classes/${this.props.classId}/files/${this.props.moduleId}/${folder.id}`}
                                                    // state={{ folderId: folder.id }}
                                                >
                                                   <button
                                                      className="btn btn-sm btn-primary m-3"
                                                   >
                                                      View Files
                                                   </button>
                                                </Link>

                                                <button
                                                   className="btn btn-sm btn-danger"
                                                   data-id={folder.id}
                                                   onClick={this.handleDeleteOnClick}
                                                >
                                                   <i>
                                                      <FontAwesomeIcon className="mx-1" icon={faTrashCan} />
                                                   </i>
                                                   Delete
                                                </button>
                                          </td>
                                       </tr>
                                    ))
                              
                              ) : (
                                    <tr>
                                       <td colSpan="2">There are no available folders</td>
                                    </tr>
                              )
                           }
                        </tbody>
                  </Table>
               </div>
               )
         } else if (this.state.role === "parent") {
            return (
               <div className="file-card">
                  <Table striped className="my-4 w-50">
                        <thead>
                           <tr>
                              <th>Folder Name</th>
                              <th>Actions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              folders.length > 0 ? (
                                    folders.map((folder) => (
                                       <tr className="align-middle" key={folder.id}>
                                          <td>
                                                {folder.folder_name}
                                          </td>
                                          <td>
                                                <Link to={`/3/tpap/build/classes/${this.props.classId}/files/${this.props.moduleId}/${folder.id}`}
                                                    // state={{ folderId: folder.id }}
                                                >
                                                   <button
                                                      className="btn btn-sm btn-primary m-3"
                                                   >
                                                      View Files
                                                   </button>
                                                </Link>
                                          </td>
                                       </tr>
                                    ))
                              
                              ) : (
                                    <tr>
                                       <td colSpan="2">There are no available folders</td>
                                    </tr>
                              )
                           }
                        </tbody>
                  </Table>
               </div>
            )
         } 
      } else {
         return (
            <p>You do not have access to this page</p>
         )
      }
   }
}   

export default AddFolder;
