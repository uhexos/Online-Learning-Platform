import React, { Component } from "react";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  Button
} from "reactstrap";
import Row from "reactstrap/lib/Row";
import auth from "../auth";
import Helmet from "react-helmet";
export class CategoryDetail extends Component {
  state = { category: {} };
  saveCategory = () => {
    let formData = new FormData();
    let title = document.getElementById("categoryTitle").value;
    let description = document.getElementById("categoryDescription").value;

    formData.append("title", title);
    formData.append("description", description);
    fetch(
      `http://localhost:8000/api/categories/${this.props.match.params.id}/`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(res => auth.checkLoginstatus(res))

      .then(
        res => {
          if (res.ok) {
            document.getElementById("create-category-form").reset();
            return res.json();
          }
        },
        error => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    fetch(
      `http://localhost:8000/api/categories/${this.props.match.params.id}`,
      {
        method: "get",
        headers: {
          authorization: `JWT ${localStorage.getItem("token")}`
        }
      }
    )
      .then(
        res => {
          if (res.ok) {
            return res.json();
          }
        },
        error => {
          console.log(error);
        }
      )
      .then(data => this.setState({ category: data }));
  }

  render() {
    return (
      <div>
        <Container>
            <Helmet>
                <title>Admin - Edit Category</title>
            </Helmet>
          <Row>
            <Col>
              <Card className="shadow">
                <CardHeader>
                  <CardTitle className="text-center">
                    <h2 className="text-muted mb-4">Edit Category</h2>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form id="create-category-form">
                    <FormGroup>
                      <Label for="categoryTitle">Title</Label>
                      <Input
                        type="text"
                        id="categoryTitle"
                        defaultValue={this.state.category.title}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="categortDescription">Description</Label>
                      <Input
                        type="textarea"
                        id="categoryDescription"
                        defaultValue={this.state.category.description}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={this.saveCategory}
                      >
                        Save
                      </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CategoryDetail;
