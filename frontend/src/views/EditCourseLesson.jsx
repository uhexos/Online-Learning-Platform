import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody,
  Alert
} from "reactstrap";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import auth from "../auth";

export class EditCourseLesson extends Component {
  state = { lessonContent: "", lesson: {}, visible: false };
  componentDidMount() {
    //get all lessons their name, video url and descriptions etc from the api,
    fetch(
      `http://127.0.0.1:8000/api/courses/${this.props.match.params.id}/lessons/${this.props.match.params.lid}`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(res => auth.checkLoginstatus(res))
      .then(res => res.json())
      .then(lesson => {
        this.setState({
          lesson: lesson
        });
      });
  }

  saveLesson = () => {
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();
    let title = document.getElementById("lessonTitle").value;
    let content = this.state.lessonContent;
    let description = document.getElementById("lessonDescription").value;

    formData.append("title", title);
    formData.append("content", content);
    formData.append("description", description);
    if (fileField.files[0]) {
      formData.append("video", fileField.files[0], fileField.files[0].name);
    }
    fetch(
      `http://localhost:8000/api/courses/${this.props.match.params.id}/lessons/${this.props.match.params.lid}/`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(res => auth.checkLoginstatus(res))
      .then(res => {
        if (res.ok) {
          this.setState({ visible: true });
          document.getElementById("edit-lesson").reset();
        }
        return res.json();
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Card>
            <CardBody>
              <Alert
                color="success"
                className="shadow"
                isOpen={this.state.visible}
              >
                Course updated successfully.
              </Alert>
              <Form id="edit-lesson">
                <FormText>
                  <h2>Update lesson</h2>
                </FormText>
                {/* sample for form group */}
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="lessonTitle"
                    defaultValue={this.state.lesson.title}
                  />
                  <FormText>Clear name for the lesson</FormText>
                </FormGroup>
                {/* end sample */}
                <FormGroup>
                  <Input type="file" name="video" id="lessonVideo" />
                  <FormText>Choose course video if any</FormText>
                </FormGroup>
                <FormGroup>
                  <Label>Content</Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={this.state.lesson.content}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    // we probably also dont need all these
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.setState({ lessonContent: data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    id="lessonDescription"
                    defaultValue={this.state.lesson.description}
                  />

                  <FormText>Enter a brief description of the lesson</FormText>
                </FormGroup>
                <Button color="primary" type="button" onClick={this.saveLesson}>
                  Post
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default EditCourseLesson;
