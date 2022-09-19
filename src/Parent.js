import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
//import HomePage from './components/HomePage/HomePage';

import Footer from './components/Footer/Footer';

import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import InformationPage from './components/InformationPage/InformationPage';

import StudentEventPage from './components/StudentEventPage/StudentEventPage';
import HomePage from './components/HomePage';


import FileUpload from './components/FileUpload.js';
import AddFolder from './components/AddFolder.js';
import Modules from './components/Modules.js';
import Classes from './components/Classes.js';
import RegisterPage from './components/RegisterPage.js';
import ProfilePage from './components/ProfilePage.js';
import View from './components/View.js';
import Add from './components/Add.js';
import PasswordRecovery from './components/PasswordRecovery.js';

import AttendantsPage from './components/AttendantsPage';
import AccountingLogsPage from './components/AccountingLogsPage';


/**
 * A function to implement the nav and footer for webpages while
 * relevant routes are called.
 * 
 * A nav is implemented alongside a footer on each page with the 
 * paths which allows functionality to be implemented for each
 * page on the web API.
 * 
 * @author Jake Ellerington
 */
function Parent() {
  
    return (
        <BrowserRouter >
          <div className="App">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="aboutus">About us</Link></li> 
                  <li><Link to="studenteventpage">Student Events</Link></li>
                  <li><Link to="/3/tpap/build/profile">Profile</Link></li>
                  <li><Link to="/3/tpap/build/classes">Resources</Link></li>
                  <li className="nav-item active"><Link className="nav-link" to="/attendance">Attendance</Link></li>
                  <li className="nav-item active"><Link className="nav-link" to="/accounting">Accounting</Link></li>
                  
                

              </ul>
            </nav>
  
            <Routes>            
              <Route path="/" element={<HomePage />} />
              <Route path="aboutus" element={<InformationPage />} />
              <Route path="studenteventpage" element={<StudentEventPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/3/tpap/build/profile" element={<ProfilePage />}/>
            <Route path="/3/tpap/build/register" element={<RegisterPage />}/>
            <Route path="/3/tpap/build/classes" element={<Classes />}/>
                <Route path="/3/tpap/build/classes/grupa-mica" element={<Modules classId="1" className="grupa-mica" />} />
                  <Route path="/3/tpap/build/classes/grupa-mica" element={<AddFolder />} />
                    <Route path="/3/tpap/build/classes/:className/files/:moduleId/:folderId" element={<FileUpload   />} />
                <Route path="/3/tpap/build/classes/grupa-mijlocie" element={<Modules classId="2" />} />
                  <Route path="/3/tpap/build/classes/:classId" element={<AddFolder moduleId="2"/>} />
                    <Route path="/3/tpap/build/classes/:classId/files/:moduleId" element={<FileUpload className="grupa-mijlocie" />} />
                <Route path="/3/tpap/build/classes/grupa-mare" element={<Modules classId="3"/>} />
                  <Route path="/3/tpap/build/classes/:classId" element={<AddFolder moduleId="3" />} />
                    <Route path="/3/tpap/build/classes/:classId/files/:moduleId" element={<FileUpload className="grupa-mare"  />} />
            <Route path="/3/tpap/build/passwordrecovery" element={<PasswordRecovery />}/>
            <Route path="/3/tpap/build/profile/view/users" element={<View type={"users"} />}/>
            <Route path="/3/tpap/build/profile/view/teachers" element={<View type={"teachers"} />}/>
            <Route path="/3/tpap/build/profile/view/parents" element={<View type={"parents"} />}/>
            <Route path="/3/tpap/build/profile/view/children" element={<View type={"children"} />}/>
            <Route path="/3/tpap/build/profile/add/teachers" element={<Add type={"teachers"}  />}/>
            <Route path="/3/tpap/build/profile/add/parents" element={<Add type={"parents"} />}/>
            <Route path="/3/tpap/build/profile/add/children" element={<Add type={"children"} />}/>
            <Route path="/3/tpap/build/profile/add/admin" element={<Add type={"admin"} />}/>
            <Route path="/3/tpap/build/add-folder" element={<AddFolder />}/>
            <Route path="/attendance" element={<AttendantsPage />} />
            <Route path="/accounting" element={<AccountingLogsPage />} />

            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
        
    );
    
  }
  
  
  export default Parent;
