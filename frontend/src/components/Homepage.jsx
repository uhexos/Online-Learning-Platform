import React, { Component } from 'react';
import HomeNavbar from './HomeNavbar';
import SimpleFooter from './SimpleFooter';

export class Homepage extends Component {
    render() {
        return (
            <div>
                <HomeNavbar />
                <div className="container">
                    <h1>Home page</h1>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br></br>
                    Consequatur totam quos doloremque numquam fugiat officiis placeat <br></br>
                    consectetur tempore dolores illo deserunt ab exercitationem quisquam, 
                    recusandae sequi necessitatibus, eius quaerat quibusdam.
                </div>
                <SimpleFooter />
                
            </div>
        )
    }
}

export default Homepage;
