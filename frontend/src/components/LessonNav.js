import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import { Link } from "react-router-dom";
class LessonNav extends React.Component {
  // produces a list of all lessons to be rendered in sidebar 
  render() {
    // use index so the user isnt bothered about course id when entering url, a saner method
    //user can visit course/1/lesson/1 even though lesson id might be 23
    const printLesson = () => (
      this.props.lessons.map((lesson, index) => (
        <NavItem key={lesson.id} onClick={() => this.props.chooseLesson(index)}>
          <Link>
            <NavLink href=""><i className="tim-icons icon-email-85" />{lesson.title}</NavLink>
          </Link>
        </NavItem>
      ))
    )
    return (
      <div>
        <Card className="shadow">
          <CardBody>
            <CardTitle>
              Lessons
            </CardTitle>
            <Nav vertical>
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
