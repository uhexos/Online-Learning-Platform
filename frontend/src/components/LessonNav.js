import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';

class LessonNav extends React.Component {
  // produces a list of all lessons to be rendered in sidebar 
  render() {
    // use index so the user isnt bothered about course id when entering url, a saner method
    //user can visit course/1/lesson/1 even though lesson id might be 23
    const printLesson = () => (
      this.props.lessons.map((lesson, index) => (
        <NavItem key={lesson.id} onClick={() => this.props.chooseLesson(index)}>
          <NavLink href=""><i className="tim-icons icon-email-85" /> {lesson.title}</NavLink>
        </NavItem>
      ))
    )
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              Lessons
            </CardTitle>


          </CardHeader>
          <CardBody>
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
