import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import { NavLink as RRNavlink } from "react-router-dom";
import NavLink from 'reactstrap/lib/NavLink';
class LessonNav extends React.Component {
  // produces a list of all lessons to be rendered in sidebar 
  render() {
    // use index so the user isnt bothered about course id when entering url, a saner method
    //user can visit course/1/lesson/1 even though lesson id might be 23
    const printLesson = () => (
      this.props.lessons.map((lesson, index) => (
        <NavItem key={lesson.id} >
          <NavLink tag={RRNavlink} to={`/courses/${lesson.course}/lessons/${index}`} activeClassName="active">
            <i className="ni ni-button-play" /><b>Lesson {index}</b>: {lesson.title}
          </NavLink>
        </NavItem>
      ))
    )
    return (
      <div>
        <Card className="shadow">
          <CardBody>
            <CardTitle className="text-center">
              Course Outline
            </CardTitle>
            <Nav vertical id="lesson-nav" >
              {/* check if lessons is not empty and print lessons */}
              {this.props.lessons[0] ? printLesson() : null}
            </Nav>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default LessonNav;
