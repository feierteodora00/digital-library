import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import '../App.css';

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        let location = useLocation()

        return <Component {...props} params={params} state={location.state} />
    }
    return ComponentWithRouter
}
class FileUpload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            selectedFile: '',
            filename: '',
            checkbox: '',
            moduleId: props.params.moduleId,
            folderId: props.params.folderId,
            token: localStorage.getItem('userToken'),
            files: [],
            isLoaded: false
        };
     
        this.onFileChange = this.onFileChange.bind(this);
    }

    handleDownloadOnClick = (e) => {
        e.preventDefault();
      
        const fileId = e.currentTarget.getAttribute("data-file")
        const filename = e.currentTarget.getAttribute("data-filename")
        const formData = new FormData();

        formData.append('id', fileId)
        formData.append('action', 'download')

        let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/files"
        fetch(url, {
            method: "POST",
            headers: new Headers(),
            body: formData
        })
        .then((res) => {
            return res.blob();
        })
        .then((blob) => {
            const href = window.URL.createObjectURL(blob);
            //creates link to download
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((err) => {
            return Promise.reject({ Error: 'Something went wrong', err})
        })
    };
    onFileChange = (e) => {
        // Update the state 
        this.setState({ selectedFile: e.target.files[0] }); 
    };

      // On file upload (click the upload button)
    onFileUpload = (e) => {
        e.preventDefault();

        // Create an object of formData
        const formData = new FormData();
        formData.append('file', this.state.selectedFile)
        formData.append('filename', this.state.selectedFile.name)
        formData.append('module_id', this.state.moduleId)
        formData.append('folder_id', this.state.folderId)
        formData.append('action', 'add')

        let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/upload"
        fetch(url, {
            method:"POST",
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
                files: data.results ? data.results : []
            });
        })
        .catch( (err) => {
            this.setState({
                isLoaded: true,
                error: err
                });
        })
        e.target.reset();
    }

    handleDeleteOnClick = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to delete this file?");

        if (confirmed) {
            const id = e.currentTarget.getAttribute("data-id")
            
            let url = "http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/upload"

            let formData = new FormData();
            formData.append('action', 'delete')
            formData.append('id', id)

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
                    files: data.results ?? [],
                  });
            })
            .catch( (err) => {
                this.setState({
                    isLoaded: true,
                    files: [],
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
        formData.append('folder_id', this.state.folderId)
        formData.append('action', 'retrieveFiles')

        fetch("http://unn-w18002348.newnumyspace.co.uk/3/tpap/backend/upload", {
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
                files: data.results ?? "",
            });
        })
        .catch( (err) => {
            this.setState({
                isLoaded: true,
                error: err
                });
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
      const { files } = this.state;

      if (this.state.authenticated) {
         if (this.state.role === "admin" || this.state.role === "teacher"  ) {
            return(
               <form onSubmit={this.onFileUpload}>
                <div className="file-card">
                    <div className="file-inputs d-inline-flex p-2">
                        <Card className="custom-card" style={{ width: '700px' }}>
                            <Card.Body>
                            <Card.Title className="mt-2">Upload your content</Card.Title>
                                    <div className="mt-4">
                                    <input
                                       type="file"
                                       name="file" 
                                       onChange={this.onFileChange} 
                                       className="mx-3" 
                                       accept=".txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                     />
                                       <button
                                          className="btn btn-sm btn-primary"
                                          disabled={!this.state.selectedFile}
                                       >
                                          <i>
                                             <FontAwesomeIcon icon={faPlus} />
                                          </i>
                                        </button>
                                        <Col>
                                        <label>
                                          <input
                                             disabled={!this.state.selectedFile}
                                             required="required"
                                             type="checkbox"
                                             className="mx-2 mt-3"
                                             name="checkbox" 
                                          /> 
                                          I agree to the terms
                                        </label>
                                          
                                        </Col>
                                        { 
                                        files.map((file) => (
                                            <li key={file.id}>
                                            <Col className="d-flex-inline mx-1 mt-4">
                                            {file.filename}
                                               <button
                                                   onClick={this.handleDownloadOnClick}
                                                   data-file={file.id}
                                                   data-filename={file.filename}
                                                   className="btn btn-sm btn-primary mx-2"
                                                >
                                                    <i>
                                                        <FontAwesomeIcon className="mx-1"icon={faDownload} />
                                                    </i>
                                                    Download
                                                </button>
                                                <button
                                                   className="btn btn-sm btn-danger"
                                                   data-id={file.id}
                                                   onClick={this.handleDeleteOnClick}
                                                >
                                                    <i>
                                                        <FontAwesomeIcon className="mx-1" icon={faTrashCan} />
                                                    </i>
                                                   Delete
                                                </button>
                                                </Col>

                                            </li>
                                        ))
                                        }
                                    </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                </form>
               )
         } else if (this.state.role === "parent") {
            return (
               <div className="file-card">
               <div className="file-inputs d-inline-flex p-2">
                   <Card className="ex" style={{ width: '700px' }}>
                       <Card.Body>
                       <Card.Title className="mt-2">Content</Card.Title>
                               <div className="mt-4">
                                   { 
                                   files.length > 0 ? (
                                    files.map((file) => (
                                        <li key={file.id}>
                                        {file.filename}
                                            <button
                                                onClick={this.handleDownloadOnClick}
                                                data-file={file.id}
                                                data-filename={file.filename}
                                                className="btn btn-sm btn-primary mx-2"
                                            >
                                                <i>
                                                    <FontAwesomeIcon className="mx-1" icon={faDownload} />
                                                </i>
                                                Download
                                            </button>
                                        </li>
                                    ))
                                   ) : (
                                       <div className="">'No available files'</div>
                                   )
                                    }
                               </div>
                               
                       {/* {this.fileData()} */}
                       </Card.Body>
                   </Card>
               </div>
           </div> 
            )
         } 
      } 
      else {
         return (
            'You do not have access to this page'
         )
      }
   }
}
export default withRouter(FileUpload);
