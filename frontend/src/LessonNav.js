import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class LessonNav extends React.Component {

  render() {
    const printLesson = () => (
      this.props.lessons.map((lesson,index) => (
       <NavItem key={lesson.id} onClick={()=>this.props.chooseLesson(index)}>
         <NavLink href="#">{lesson.title}</NavLink>
       </NavItem>
     ))
   )
    return (
      <div>
        <p>Lessons</p>
        <Nav vertical>
          {/* check if lessons is not empty and print lessons */}
          {this.props.lessons[0] ?  printLesson() : null}
        </Nav>
        <hr />
        <p>Link based</p>
        <Nav vertical>
          <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
        </Nav>
      </div>
    );
  }
}

export default LessonNav;
