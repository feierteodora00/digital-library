import React from "react";
import logo from '../images/logo.png';
import teachers from '../images/teachers.jpg'

class HomePage extends React.Component {

    render(){
        return(
            <div>
                <div className="flex-home">
                    <img src={logo} alt="kindergarten logo" className="logo"/>
                    <h1 className="welcome">Welcome to the Hansel und Gretel Kindergarten web page </h1>
                </div>
                <div className="flex-home">
                    <div className="home-page-desc">
                        <h2 className="subtitle-home">Exciting activities</h2>
                        <p>
                            Our curriculum comprises activities according to the educational
                            norms, complemented by optional ones such arts and crafts or sports
                        </p>
                    </div>
                    <div className="home-page-desc">
                        <h2 className="subtitle-home">Learning German</h2>
                        <p>
                            Learning German contributes to the cognitive development, increases
                            children's creativity and broadens the intercultural perspective
                        </p>
                    </div>
                    <div className="home-page-desc">
                        <h2 className="subtitle-home">Specialised staff</h2>
                        <p>
                            The education of children is provided by experienced teachers, speakers
                            and graduates of German schools.
                        </p>
                    </div>
                </div>
                <div className="home-aboutus">
                    <h2 className="subtitle-home">About us</h2>
                    <p>
                        Hansel und Gretel Kindergarten aims to meet the educational requirements of your 
                        children and to offer an attractive educational program. The program of our kindergarten 
                        is based on learning the German language as well as gethering essential knowledge in 
                        accordance with the methodological norms.
                    </p>
                    <p>
                        The kindergarten uses a child-centered teaching-learning-assessment 
                        approach, an individualized education method that respects the abilities and also 
                        the needs of the children. The pace and learning style allow them to discover 
                        their own identity and develop a positive self-image.
                    </p>
                    <p>
                        We are proud of a 100% success rate at the German language schools in Romania.
                    </p>
                    <h2 className="subtitle-home">Staff</h2>
                    <p>
                        The kindergarten team, consisting of 4 teachers and 2 educators, creates a friendly 
                        educational environment for your child to learn and develop through professionalism, 
                        seriousness and enthusiasm.
                    </p>
                    <img src={teachers} alt="teachers" className="teachers" />
                </div>
                <div className="contact">
                    <p>Contact</p>
                    <p>Phone number: 07526 699 852</p>
                    <p>Email: tpap@hgkindergarten.com</p>
                    <p>Address: Brasov, Romania</p>
                </div>
            </div> 
        )
    }
}

export default HomePage;
