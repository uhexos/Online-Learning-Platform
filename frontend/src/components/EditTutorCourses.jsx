import React, { Component } from "react";
import Container from "reactstrap/lib/Container";
import Card from "reactstrap/lib/Card";
import { Row, Col, CustomInput, Table, CardHeader } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import Alert from "reactstrap/lib/Alert";
import FormAlert from "./FormAlert";
import auth from "../auth";
import { Link } from "react-router-dom";
import Modals from "./NotificationModal";

export class UpdateCourse extends Component {
  onDismiss = () => this.setState({ visible: false });
  state = {
    categories: null,
    loading: false,
    visible: false,
    errors: null,
    course: {},
    lessons: []
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/categories", {
      method: "get",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => {
        if (!res.ok) {
          return { test: "ok" };
        }
        return res.json();
      })
      .then(data => {
        this.setState({ categories: data });
      });

    //get all courses their name, video url and descriptions etc from the api,
    fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => res.json())
      .then(course => {
        this.setState({
          course: course
        });
      });

    //get all lessons their name, video url and descriptions etc from the api,
    fetch(
      `http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(res => auth.checkLoginstatus(res))
      .then(res => res.json())
      .then(courseLessons => {
        this.setState({
          lessons: courseLessons
        });
      });
  }
  deleteLesson = lesson_id => {
    // delete return no json response
    fetch(
      `http://localhost:8000/api/courses/${this.props.match.params.id}/lessons/${lesson_id}/`,
      {
        method: "DELETE",
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(res => auth.checkLoginstatus(res))
      .then(() => {
        // remove the just deleted category from the state and update state without making another api call.
        this.setState({
          lessons: this.state.lessons.filter(lesson => {
            return lesson["id"] !== lesson_id;
          })
        });
      });
  };
  saveCourse = () => {
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();

    let title = document.getElementById("courseTitle").value;
    let price = document.getElementById("coursePrice").value;
    let category = document.getElementById("courseCategory");
    category = category.options[category.selectedIndex].value;
    let description = document.getElementById("courseDescription").value;
    let isLive = document.getElementById("isLive").checked;

    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("is_live", isLive);
    if (fileField.files[0]) {
      formData.append("thumbnail", fileField.files[0], fileField.files[0].name);
    }

    fetch(`http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => {
        if (res.ok) {
          this.setState({ visible: true });
          document.getElementById("add-course").reset();
          return res.json();
        }
        throw res;
      })
      .catch(err => {
        err.text().then(errorMessage => {
          this.setState({ errors: errorMessage, visible: false });
        });
      });
  };
  render() {
    return (
      <Container>
        <Card className="shadow">
          <CardBody>
            <Alert
              color="success"
              className="shadow"
              isOpen={this.state.visible}
              toggle={this.onDismiss}
            >
              Course updated successfully.
            </Alert>
            {this.state.errors ? (
              <FormAlert visible={true} messageObject={this.state.errors} />
            ) : null}
            <Form id="add-course">
              <FormGroup>
                <Label for="courseTitle">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="courseTitle"
                  placeholder="Enter a descriptive name for the course"
                  defaultValue={this.state.course.title}
                />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="coursePrice">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      id="coursePrice"
                      placeholder="Enter a price for the course"
                      defaultValue={this.state.course.price}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="courseCategory">Category</Label>
                    <Input type="select" name="category" id="courseCategory">
                      {this.state.categories
                        ? this.state.categories.map(category =>
                            category.id == this.state.course.category ? (
                              <option
                                key={category.id}
                                value={category.id}
                                selected
                              >
                                {category.title}
                              </option>
                            ) : (
                              <option key={category.id} value={category.id}>
                                {category.title}
                              </option>
                            )
                          )
                        : null}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label for="courseDescription">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="courseDescription"
                  defaultValue={this.state.course.description}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="courseThumbnail" />
                <FormText color="muted">
                  This is the thumbnail for the course it can be added later
                </FormText>
              </FormGroup>
              <FormGroup className="pl-5">
                <CustomInput
                  type="switch"
                  id="isLive"
                  name="isLive"
                  label="Go live."
                  defaultChecked={this.state.course.is_live}
                />
                <small className="text-muted ml-1">
                  *Note users who already purchased the course will still have
                  access even when its no longer live.
                </small>
              </FormGroup>
              <Button
                className="mt-5"
                color="primary"
                onClick={this.saveCourse}
              >
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
        {/* table for editing lessons belonging to a perticular course */}
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Edit Lessons</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Lesson id</th>
                    <th scope="col">Lesson name</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lessons.map(lesson => (
                    <tr key={lesson.id}>
                      <td>{lesson.id}</td>
                      <th scope="row">{lesson.title}</th>
                      <td>
                        <Link
                          to={`/admin/courses/${this.state.course.id}/lesson/${lesson.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                      </td>
                      <td>
                        <Modals
                          title="Confirm Deletion !"
                          message={`You are about to delete the category "${lesson.title}" permanently are you sure you want to do this? This will delete all courses belonging to it. Did you want to rename ?`}
                          buttonText="Delete"
                          buttonColor="danger"
                          action={() => this.deleteLesson(lesson.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UpdateCourse;
