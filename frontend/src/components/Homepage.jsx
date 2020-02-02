import React, { Component } from 'react';
import SimpleFooter from './SimpleFooter';
import TopNavBar from './TopNavBar';

export class Homepage extends Component {
    render() {
        return (
            <div>
                <TopNavBar/>
                <div className="container-fluid" style={cont1}>
                   <div className="col-md-6">
                       <p style={{ color:'#fff',fontSize:'50px', 
                            paddingTop:'50px' }}>Your course to prepare for university.</p>
                       <p style={{ color:'#fff  ',fontSize:'20px' }}>
                           Build the basic skills you need before you enter university from 
                           lecturers in various universities.
                        </p>
                   </div>
                </div>
                <SimpleFooter />
                
            </div>
        )
    }
}

const cont1 = {
    // backgroundImage: "url('../imgs/auth_bg.jpg')",
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../imgs/auth_bg.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height:'400px',
}

export default Homepage;
