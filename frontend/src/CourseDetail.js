import React, { Component } from 'react'
// import Vertical from "./Vertical" 
import LessonNav from './LessonNav';
import LessonDetail from './LessonDetail';
import { Container, Row, Col } from 'reactstrap/lib';

export class CourseDetail extends Component {

    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        this.chooseLesson = this.chooseLesson.bind(this);
        this.state = {
            course: {
                lessons: []
            },
            lessons: {

            },
            selected: "",
        };
    }
    // This method will be sent to the child component
    chooseLesson(id) {
        this.setState({
            selected: id
        });
    }
    componentDidMount() {
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}`)
            .then(res => res.json())
            .then((course) => {
                this.setState({
                    course: course,
                });
                // console.log(this.state.course.lessons)
            });
        // console.log(this.state)
        fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons`)
            .then(res => res.json())
            .then((lessons) => {
                this.setState({
                    lessons: lessons,
                });
            });
    }
    render() {
        if (!this.state.course.lessons) return null //this line
        return (
            <Container>
                {/* {this.state.course.lessons.map} */}
                <Row className="mt-3">
                    <Col md="3">
                        <LessonNav lessons={this.state.lessons} chooseLesson={this.chooseLesson}></LessonNav>
                        {/* {console.log("state", this.state.selected)} */}
                    </Col>
                    <Col md="9">
                        <LessonDetail lesson={this.state.lessons[this.state.selected]}></LessonDetail>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default CourseDetail
