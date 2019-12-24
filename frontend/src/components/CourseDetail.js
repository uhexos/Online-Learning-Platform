import React, { Component } from 'react'
// import Vertical from "./Vertical" 
import LessonNav from './LessonNav';
import LessonDetail from './LessonDetail';

import { Container, Row, Col } from 'reactstrap/lib';

let jwtkey = localStorage.getItem('token');
export class CourseDetail extends Component {

    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        //selected refers to the index of the lesson in the return array and not the lesson id
        this.state = {
            course: {
                lessons: []
            },
            lessons: [],
        };
    }
    
    componentDidMount() {
        //get all lesson id's from the selected course
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${jwtkey}`
            }
        })
            .then(res => res.json())
            .then((course) => {
                this.setState({
                    course: course,
                });
            });
        //get all lessons their name, video url and descriptions etc from the api, 
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons/`, {
            method: 'GET',
            headers: {
                Authorization: `JWT ${jwtkey}`
            }
        })
            .then(res => res.json())
            .then((lessons) => {
                this.setState({
                    lessons: lessons,
                });
            });
    }
    render() {
        return (
            <Container fluid>
                <Row className="mt-3">
                    <Col md="3">
                        <LessonNav className="pt-3" lessons={this.state.lessons}></LessonNav>
                    </Col>
                    <Col md="9">
                        {/*select the first item from the array to display before first click happens */}
                        <LessonDetail lesson={this.state.lessons[this.props.match.params.lid]}></LessonDetail>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CourseDetail