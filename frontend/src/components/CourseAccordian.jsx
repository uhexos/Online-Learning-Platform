import React, { Component } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
// TODO neaten the fetch and handle error 
export class CourseAccordian extends Component {
  jwtkey = localStorage.getItem("token");
  state = { lessons: [{ title: "No lessons yet", id: -1 }] };
  componentDidMount() {
    fetch(`http://localhost:8000/api/courses/${this.props.courseID}/lessons/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${this.jwtkey}`
      }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            lessons: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <Accordion allowZeroExpanded className="my-4  card shadow">
        {this.state.lessons.map(lesson => (
          <AccordionItem className="card" key={lesson.id}>
            <AccordionItemHeading className="card-header">
              <AccordionItemButton> {lesson.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="card-body">
              <p>{lesson.description}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
}

export default CourseAccordian;
