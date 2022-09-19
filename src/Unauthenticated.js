import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
//import HomePage from './components/HomePage/HomePage';

import Footer from './components/Footer/Footer';

import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import InformationPage from './components/InformationPage/InformationPage';
import RegisterInterestPage from './components/RegisterInterestPage/RegisterInterestPage';
import PasswordRecovery from './components/PasswordRecovery';

import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css'










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
function Unauthenticated() {
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

                  <li><Link to="/3/tpap/build/profile">Login</Link></li>
                  <li><Link to="/3/tpap/build/register">Register</Link></li>  
                  
                

              </ul>
            </nav>
  
            <Routes>            
              <Route path="/" element={<HomePage />} />
              <Route path="registerinterest" element={<RegisterInterestPage />} />
              <Route path="aboutus" element={<InformationPage />} />
              <Route path="/3/tpap/build/profile" element={<ProfilePage />}/>
              <Route path="/3/tpap/build/register" element={<RegisterPage />}/>
              <Route path="/3/tpap/build/passwordrecovery" element={<PasswordRecovery />}/>
              
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
    );
  }
  
  
  export default Unauthenticated;
