// this gives a menu containing all the lessons in the course and renders each lesson when
// when the menu is clicked
import React, { Component } from 'react'
// import Vertical from "./Vertical" 
import LessonNav from './LessonNav';
import LessonDetail from './LessonDetail';
import AdminNavbar from './TopNavBar';
import SimpleFooter from "./SimpleFooter.jsx";

import { Container, Row, Col } from 'reactstrap/lib';
import auth from '../auth';
import Helmet from 'react-helmet'

export class CourseDetail extends Component {
    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        //selected refers to the index of the lesson in the return array and not the lesson id
        this.state = {
            lesson: null,
            lessons: [],
        };
        this.jwtkey = localStorage.getItem('token');

    }

    componentDidMount() {
        //get all lessons their name, video url and descriptions etc from the api, 
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons/`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${this.jwtkey}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => res.json())
            .then((lessons) => {
                this.setState({
                    lessons: lessons,
                });
                //click the appropriate lesson item on first load.
                let nav = document.getElementById(`nav-item-${this.props.match.params.lid}`);
                if (nav !== null){
                    nav.click()
                }
                // document.getElementById(`nav-item-${this.props.match.params.lid}`).click()
            });


    }
    getLesson = (lid) => {
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons/${lid}`,
            {
                method: "GET",
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`
                }
            }
        )
            .then(res => auth.checkLoginstatus(res))
            .then(res => res.json())
            .then(lesson => {
                this.setState({
                    lesson: lesson
                });
            });
    }
    render() {
        return (
            <div>
                <AdminNavbar></AdminNavbar>
                <Container fluid>

                    <Row className="mt-3">
                        <Col md="3">
                            <LessonNav className="pt-3" lessons={this.state.lessons} activelink={this.props.match.params.lid} getLesson={this.getLesson}></LessonNav>
                        </Col>
                        <Col md="9">
                            <LessonDetail lesson={this.state.lesson}></LessonDetail>

                        </Col>
                    </Row>
                </Container>
                <SimpleFooter />
            </div>
        )
    }
}

export default CourseDetail;
