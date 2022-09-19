import React from 'react';

/**
 *  A complete list of all activities is presented
 * 
 * All activities that are displayed on the information page are stored locally
 * in their various languages icluding an id, title, link to image which is also
 * stored locally and a description .
 * 
 * The results are presented in a div alongside buttons used to go from the
 * first activitiy until the last.
 * 
 *
 * @author Jake Ellerington
 */
class Activity extends React.Component {

    constructor(props){
        super(props)
        this.state = { activity:[     
                {
                    activity_id: "1",
                    language: "english",
                    title: 'German',
                    img: <img src={require('./img/german.png')} />,
                    description: 'German class is one of the main activities and primary focus at the Kindergarten.'

                },
                {
                    activity_id: "2",
                    language: "german",
                    title: "Deutsch",
                    img: <img src={require('./img/german.png')} />,
                    description: "Deutschunterricht ist einer der Hauptaktivitäten und Schwerpunkt im Kindergarten."
                   
                },
                {
                    activity_id: "3",
                    language: "romanian",
                    title: "Germana",
                    img: <img src={require('./img/german.png')} />,
                    description: "Una dintre activitatile de baza ale garadinitei este cursul de limba germana."
                    
                },
                {
                    activity_id: "4",
                    language: "english",
                    title: "Maths",
                    img: <img src={require('./img/maths.png')} />,
                    description: "Maths class is one of the main activities at the Kindergarten."
                    
                },
                {
                    activity_id: "5",
                    language: "german",
                    title: 'Mathe ',
                    img: <img src={require('./img/maths.png')} />,
                    description: 'Matheunterricht ist einer der Hauptaktivitäten im Kindergarten.'
                    
                },
                {
                    activity_id: "6",
                    language: "romanian",
                    title: "Matematica",
                    img: <img src={require('./img/maths.png')} />,
                    description: "Una dintre activitatile de baza ale gradinitei este ora de matematica."
                    
                },
                {
                    activity_id: "7",
                    language: "english",
                    title: 'Environment and Nature',
                    img: <img src={require('./img/environment.png')} />,
                    description: 'Class surrounding the environment and nature are a main activity at the Kindergarten.'

                },
                {
                    activity_id: "8",
                    language: "german",
                    title: "Naturkunde",
                    img: <img src={require('./img/environment.png')} />,
                    description: "Naturkundenunterricht ist einer der Hauptaktivitäten im Kindergarten."
                   
                },
                {
                    activity_id: "9",
                    language: "romanian",
                    title: "Natura si mediul inconjurator",
                    img: <img src={require('./img/environment.png')} />,
                    description: "Cursul despre natura si mediu este un element de baza al invatarii la gradinita. "
                    
                },
                {
                    activity_id: "10",
                    language: "english",
                    title: 'Arts and Crafts',
                    img: <img src={require('./img/art.png')} />,
                    description: 'Arts and crafts is one of the main activities at the Kindergarten.'

                },
                {
                    activity_id: "11",
                    language: "german",
                    title: "Kunst",
                    img: <img src={require('./img/art.png')} />,
                    description: "Kunsthandwerk ist einer der Hauptaktivitäten im Kindergarten. "
                   
                },
                {
                    activity_id: "12",
                    language: "romanian",
                    title: "Arte si abilitati practice ",
                    img: <img src={require('./img/art.png')} />,
                    description: "Una dintre activitatile de baza ale gradinitei este cursul de arte si abilitati practice"
                    
                },
                {
                    activity_id: "13",
                    language: "english",
                    title: 'Physical Education',
                    img: <img src={require('./img/physical.png')} />,
                    description: 'Physical Education - Sports is one of the main activities at the Kindergarten'

                },
                {
                    activity_id: "14",
                    language: "german",
                    title: "Sport",
                    img: <img src={require('./img/physical.png')} />,
                    description: "Sportunterricht ist einer der Hauptaktivitäten im Kindergarten."
                   
                },
                {
                    activity_id: "15",
                    language: "romanian",
                    title: "Educatie fizica si sport ",
                    img: <img src={require('./img/physical.png')} />,
                    description: "Una dintre activitatile de baza ale gradinitei este cursul de sport."
                    
                },{
                    activity_id: "16",
                    language: "english",
                    title: 'Music',
                    img: <img src={require('./img/music.png')} />,
                    description: 'Music class is one of the main activities at the Kindergarten.'

                },
                {
                    activity_id: "17",
                    language: "german",
                    title: "Musik",
                    img: <img src={require('./img/music.png')} />,
                    description: "Musikunterricht ist einer der Hauptaktivitäten im Kindergarten."
                   
                },
                {
                    activity_id: "18",
                    language: "romanian",
                    title: "Muzica",
                    img: <img src={require('./img/music.png')} />,
                    description: "Una dintre activitatile de baza ale gradinitei este cursul de muzica."
                    
                },{
                    activity_id: "19",
                    language: "english",
                    title: 'Dancing',
                    img: <img src={require('./img/dancing.png')} />,
                    description: 'Dance is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "20",
                    language: "german",
                    title: "Tanzen",
                    img: <img src={require('./img/dancing.png')} />,
                    description: "Tanzunterricht ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "21",
                    language: "romanian",
                    title: "Dans",
                    img: <img src={require('./img/dancing.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de dans."
                    
                },{
                    activity_id: "22",
                    language: "english",
                    title: 'Drama',
                    img: <img src={require('./img/drama.png')} />,
                    description: 'Drama and theatre is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "23",
                    language: "german",
                    title: "Drama ",
                    img: <img src={require('./img/drama.png')} />,
                    description: "Schauspielkunst ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "24",
                    language: "romanian",
                    title: "Teatru",
                    img: <img src={require('./img/drama.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de teatru."
                    
                },{
                    activity_id: "25",
                    language: "english",
                    title: 'Swimming',
                    img: <img src={require('./img/swimming.png')} />,
                    description: 'Swimming is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "26",
                    language: "german",
                    title: "Schwimmen",
                    img: <img src={require('./img/swimming.png')} />,
                    description: "Schwimmunterricht ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "27",
                    language: "romanian",
                    title: "Inot",
                    img: <img src={require('./img/swimming.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de inot."
                    
                },{
                    activity_id: "28",
                    language: "english",
                    title: 'Tennis',
                    img: <img src={require('./img/tennis.png')} />,
                    description: 'Playing tennis is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "29",
                    language: "german",
                    title: "Tennis",
                    img: <img src={require('./img/tennis.png')} />,
                    description: "Tennis spielen ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "30",
                    language: "romanian",
                    title: "Tenis",
                    img: <img src={require('./img/tennis.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de jucat tenis."
                    
                },{
                    activity_id: "31",
                    language: "english",
                    title: 'Chess',
                    img: <img src={require('./img/chess.png')} />,
                    description: 'Learning and playing chess is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "32",
                    language: "german",
                    title: "Schach",
                    img: <img src={require('./img/chess.png')} />,
                    description: "Schach lernen und spielen ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "33",
                    language: "romanian",
                    title: "Sah",
                    img: <img src={require('./img/chess.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de sah."
                    
                },{
                    activity_id: "34",
                    language: "english",
                    title: 'Skiing',
                    img: <img src={require('./img/skiing.png')} />,
                    description: 'Going skiing is one of the optional activities at the Kindergarten.'

                },
                {
                    activity_id: "35",
                    language: "german",
                    title: "Ski ",
                    img: <img src={require('./img/skiing.png')} />,
                    description: "Ein Ski Ausflug ist einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "36",
                    language: "romanian",
                    title: "Ski",
                    img: <img src={require('./img/skiing.png')} />,
                    description: "Una dintre activitatile optionale ale gradinitei este cursul de ski."
                    
                },{
                    activity_id: "37",
                    language: "english",
                    title: 'Museum Trips',
                    img: <img src={require('./img/museum.png')} />,
                    description: 'Trips to museums is one of the extra-curricular activities at the Kindergarten.'

                },
                {
                    activity_id: "38",
                    language: "german",
                    title: "Museum Ausflüge ",
                    img: <img src={require('./img/museum.png')} />,
                    description: "Ausflüge zu Museen sind einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "39",
                    language: "romanian",
                    title: "Excursii la muzeu",
                    img: <img src={require('./img/museum.png')} />,
                    description: "Activitatile extra-curiculare ale gradinitei includ excursii la muzee."
                    
                },
                {
                    activity_id: "40",
                    language: "english",
                    title: 'Farm Trips',
                    img: <img src={require('./img/farm.png')} />,
                    description: 'Trips to farms is one of the extra-curricular activities at the Kindergarten.'

                },
                {
                    activity_id: "41",
                    language: "german",
                    title: "Bauernhof Ausflüge ",
                    img: <img src={require('./img/farm.png')} />,
                    description: "Ausflüge zu Bauernhöfen sind einer der optionalen Aktivitäten."
                   
                },
                {
                    activity_id: "42",
                    language: "romanian",
                    title: "Excursii la ferma",
                    img: <img src={require('./img/farm.png')} />,
                    description: "Activitatile extra-curiculare ale gradinitei includ excursii la ferma de animale."
                    
                },{
                    activity_id: "43",
                    language: "english",
                    title: 'German Events',
                    img: <img src={require('./img/event.png')} />,
                    description: 'Taking part in German themed events are extra-curricular activities at the Kindergarten.'

                },
                {
                    activity_id: "44",
                    language: "german",
                    title: "Deutsch Events",
                    img: <img src={require('./img/event.png')} />,
                    description: "Teilnahme an deutschen Events sind außerschulische Aktivitäten."
                   
                },
                {
                    activity_id: "45",
                    language: "romanian",
                    title: "Evenimente cu tematica germana",
                    img: <img src={require('./img/event.png')} />,
                    description: "Activitatile extra-curiculare ale gradinitei includ evenimente cu tematica germana."   
                } 
            ]       
        }
    }

    filterByInfoLanguage = (lang) => {
        return (lang.language === this.props.language);
    }
    
    render(){
        
        let results = this.state.activity;
        let buttons = ""

        if (this.props.page !== undefined) {
            
            const pageSize = 3
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
            
            buttons = (
                <div className='buttons'>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(results.length / pageSize)}>Next</button>
                </div>
            )
            results = results.slice(pageMin,pageMax)
        }
         
        if (this.props.language !== undefined) {
            results = results.filter(this.filterByInfoLanguage)
        }

        return (
        <div className="activityDiv">
                
            {results.map((item) => ( 
                <div  key = { item.activity_id } >
                    <div className="">
                        <h3>{item.title}</h3>
                        <div>{item.img}</div>
                        <p>{item.description}</p> 
                    </div>
                </div>
                ))}
            {buttons} 
            </div> 
        )
    }  
}

export default Activity
