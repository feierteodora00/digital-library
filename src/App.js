import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import InformationPage from './components/InformationPage/InformationPage';
import Footer from './components/Footer/Footer';
import RegisterInterestPage from './components/RegisterInterestPage/RegisterInterestPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import RegisteredInterestsPage from './components/RegisteredInterestsPage/RegisteredInterestsPage';
import AddEventPage from './components/AddEventPage/AddEventPage';
import RemoveEventsPage from './components/RemoveEventsPage/RemoveEventsPage';
import AddStudentEventPage from './components/AddStudentEventPage/AddStudentEventPage';
import RemoveStudentEventsPage from './components/RemoveStudentEventsPage/RemoveStudentEventsPage';
import StudentEventPage from './components/StudentEventPage/StudentEventPage';





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
function App() {
    return (
        <BrowserRouter >
          <div className="App">
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                  <li className='dropdown'><Link to="aboutus" onClick={ (event) => event.preventDefault() }>Information</Link>
                    <ul className="dropdownContent">
                      <li><Link to="aboutus">About us</Link></li>
                      <li><Link to="registerinterest">Register Interest</Link></li>
                    </ul>
                  </li> 
                  <li><Link to="studenteventpage">Student Events</Link></li>   
                  <li className='dropdown'><Link to="addevents" onClick={ (event) => event.preventDefault() }>Events</Link>
                    <ul className="dropdownContent">
                      <li><Link to="addevents">Add Events</Link></li>
                      <li><Link to="removeevents">Remove Events</Link></li>
                    </ul>
                  </li>
                  <li className='dropdown'><Link to="addstudentevent" onClick={ (event) => event.preventDefault() }>Student Events</Link>
                    <ul className="dropdownContent">
                      <li><Link to="addstudentevent">Add Student Events</Link></li>
                      <li><Link to="removestudentevent">Remove Student Events</Link></li>
                    </ul>
                  </li>
                <li><Link to="registeredinterests">Registered Interests</Link></li>
                

              </ul>
            </nav>
  
            <Routes>            
              <Route path="/" element={<HomePage />} />
              <Route path="aboutus" element={<InformationPage />} />
              <Route path="registerinterest" element={<RegisterInterestPage />} />
              <Route path="registeredinterests" element={<RegisteredInterestsPage />} />
              <Route path="addevents" element={<AddEventPage />} />
              <Route path="removeevents" element={<RemoveEventsPage />} />
              <Route path="addstudentevent" element={<AddStudentEventPage />} />
              <Route path="removestudentevent" element={<RemoveStudentEventsPage />} />
              <Route path="studenteventpage" element={<StudentEventPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
  
  
  export default App;
