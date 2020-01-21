import React, { Component } from 'react'
import Container from 'reactstrap/lib/Container'
import Row from 'reactstrap/lib/Row'
import { Col, Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import CardTitle from 'reactstrap/lib/CardTitle'
import FormAlert from "./FormAlert";
import auth from '../auth'

export class AddCategory extends Component {
    state = { errors: null }

    saveCategory = () => {
        let formData = new FormData();
        let title = document.getElementById('categoryTitle').value;
        let description = document.getElementById('categoryDescription').value;

        formData.append('title', title);
        formData.append('description', description);

        fetch("http://localhost:8000/api/categories/", {
            method: 'post',
            body: formData,
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => {
                if (!res.ok) {
                    throw res
                }
                document.getElementById("create-category-form").reset();
                this.onDismiss()//remove previous error message if succesful
                return res.json();
            })
            .catch(err => {
                err.text().then(errorMessage => {
                    this.setState({ errors: errorMessage })
                })
            });
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Card className="shadow">
                                <CardHeader>
                                    <CardTitle className="text-center">
                                        <h2 className="text-muted mb-4">
                                            Make a new Category
                                        </h2>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form id="create-category-form">
                                        {this.state.errors ? <FormAlert visible={true} messageObject={this.state.errors} /> : null}
                                        <FormGroup>
                                            <Label for="categoryTitle">Title</Label>
                                            <Input type="text" id="categoryTitle" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="categortDescription">Description</Label>
                                            <Input type="textarea" id="categoryDescription" />
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
        )
    }
}

export default AddCategory
