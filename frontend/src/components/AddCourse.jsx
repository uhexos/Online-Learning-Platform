// this page allows user to make a new course
import React, { Component } from "react";
import Container from "reactstrap/lib/Container";
import Card from "reactstrap/lib/Card";
import { Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";
import Alert from "reactstrap/lib/Alert";
import FormAlert from "./FormAlert";
import auth from "../auth";
import {Helmet} from 'react-helmet'

export class AddCourse extends Component {
  onDismiss = () => this.setState({ visible: false });
  state = { categories: null, loading: false, visible: false, errors: null };

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
  }
  saveCourse = () => {
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();

    let title = document.getElementById("courseTitle").value;
    let price = document.getElementById("coursePrice").value;
    let category = document.getElementById("courseCategory");
    category = category.options[category.selectedIndex].value;
    let description = document.getElementById("courseDescription").value;
    let isLive = false;

    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("is_live", isLive);
    if (fileField.files[0]) {
      formData.append("thumbnail", fileField.files[0], fileField.files[0].name);
    }

    fetch("http://localhost:8000/api/courses/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      }
    })
    .then(res => auth.checkLoginstatus(res))
    .then(res => {
      if (res.ok) {
        this.setState({ visible: true });
        document.getElementById('add-course').reset()
        return res.json();
      }
      throw res

    }).catch(err => {
      err.text().then(errorMessage => {
        this.setState({ errors: errorMessage, visible: false })
      })
    });
  };
  render() {
    return (
      <Container>
        <Helmet>
          <title>Admin - New Course</title>
        </Helmet>
        <Card className="shadow">
          <CardBody>
            <Alert
              color="success"
              className="shadow"
              isOpen={this.state.visible}
              toggle={this.onDismiss}
            >
              Course created successfully.
            </Alert>
            {this.state.errors ? <FormAlert visible={true} messageObject={this.state.errors} /> : null}
            <Form id="add-course">
              <FormGroup>
                <Label for="courseTitle">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="courseTitle"
                  placeholder="Enter a descriptive name for the course"
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
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="courseCategory">Category</Label>
                    <Input type="select" name="category" id="courseCategory">
                      {this.state.categories
                        ? this.state.categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="courseThumbnail" />
                <FormText color="muted">
                  This is the thumbnail for the course it can be added later
                </FormText>
              </FormGroup>
              {/* TODO add to this to edit maybe ? */}
              {/* <FormGroup>
                <Label for="courseDescription">Activate course</Label>
                <span className="clearfix" />
                <Label className="custom-toggle">
                  <Input defaultChecked type="checkbox" />
                  <span className="custom-toggle-slider rounded-circle" />
                </Label>
              </FormGroup> */}
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
      </Container>
    );
  }
}

export default AddCourse;
