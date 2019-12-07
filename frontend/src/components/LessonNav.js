import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class LessonNav extends React.Component {

  render() {
    // use index so the user isnt bothered about course id when entering url, a saner method
    const printLesson = () => (
      this.props.lessons.map((lesson, index) => (
        <NavItem key={lesson.id} onClick={() => this.props.chooseLesson(index)}>
          <NavLink href="">{lesson.title}</NavLink>
        </NavItem>
      ))
    )
    return (
      <div>
        <p>Lessons</p>
        <Nav vertical>
          {/* check if lessons is not empty and print lessons */}
          {this.props.lessons[0] ? printLesson() : null}
        </Nav>
        <hr />
      
      </div>
    );
  }
}

export default LessonNav;
