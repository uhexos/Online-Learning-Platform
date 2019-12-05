import React, { Component } from 'react'
// import Vertical from "./Vertical" 
import LessonNav from './LessonNav';
import LessonDetail from './LessonDetail';
import { Container, Row, Col } from 'reactstrap/lib';

// TODO stop hardcoding jwt
let jwtkey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTc1NTcwNzIzLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTc1NTY3MTIzfQ.rlrCjWuq_3GO0vXjUR7NVU9oSgGUmMqq2E6bOPneSzM";
export class CourseDetail extends Component {

    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        //selected refers to the index of the lesson in the return array and not the lesson id
        this.chooseLesson = this.chooseLesson.bind(this);
        this.state = {
            course: {
                lessons: []
            },
            lessons: [],
            selected: "",
        };
    }
    // This method will be sent to the child component ie prop drilling 
    chooseLesson(id) {
        this.setState({
            selected: id
        });
        //update the url after course changes
        this.props.history.push(`/courses/${this.props.match.params.id}/lessons/${id}/`);
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
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons`, {
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
        // open the appropriate lesson as entered from the url enetered.if user goes to course/2/lesson/2 open immediately
        if(this.props.match.params.lid){
            this.setState({selected:this.props.match.params.lid})
        }

    }
    render() {
        if (!this.state.course.lessons) return null //this line
        return (
            <Container>
                <Row className="mt-3">
                    <Col md="3">
                        <LessonNav lessons={this.state.lessons} chooseLesson={this.chooseLesson}></LessonNav>
                    </Col>
                    <Col md="9">
                        {/*select the first item from the array to display before first click happens */}
                        <LessonDetail lesson={this.state.lessons[this.state.selected?this.state.selected:0]}></LessonDetail>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CourseDetail
