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
import Helmet from "react-helmet"
export class AddLesson extends Component {
  componentDidMount() {}

  state = { lessonContent: "", visible: false };
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
      `http://localhost:8000/api/courses/${this.props.match.params.id}/lessons/`,
      {
        method: "POST",
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
          document.getElementById("add-lesson").reset();
          console.log(document.getElementsByTagName("CKEditor").data);
        }
        return res.json();
      });
  };

  render() {
    return (
      <Container>
        <Helmet>
          <title>Admin - Add lesson to course</title>
        </Helmet>
        <Row>
          <Card>
            <CardBody>
              <Alert
                color="success"
                className="shadow"
                isOpen={this.state.visible}
              >
                Course created successfully.
              </Alert>
              <Form id="add-lesson">
                <FormText>
                  <h2>Add a lesson</h2>
                </FormText>
                {/* sample for form group */}
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="lessonTitle" />
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
                    data="<p>Hello from CKEditor 5!</p>"
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
                  <Input type="textarea" name="text" id="lessonDescription" />

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

export default AddLesson;
