import React, { Component } from 'react'
import { Card, CardBody, Button, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col';
import Modals from './NotificationModal';
import auth from '../auth';

export class CategoryList extends Component {
    state = { categories: [] }
    componentDidMount() {
        fetch('http://localhost:8000/api/categories', {
            method: "get",
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
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
    deleteCategory = (category_id) => {
        // delete return no json response
        fetch(`http://localhost:8000/api/categories/${category_id}`, {
            method: "DELETE",
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(() => {
                // remove the just deleted category from the state and update state without making another api call.
                this.setState({
                    categories: this.state.categories.filter((category) => {
                        return category['id'] !== category_id
                    })
                });
            })

    }
    render() {
        let { categories } = this.state
        return (
            <div>
                <Container>
                    <Row>
                        {categories.length > 0 ? categories.map(category => (
                            <Col lg="3" md="6" key={category.id}>
                                <Card className="shadow my-2" >
                                    <CardBody>
                                        <CardTitle>
                                            <h3>{category.title}</h3>
                                            <p>{category.description}</p>
                                        </CardTitle>
                                        <Row>

                                            <Link to={`/admin/categories/${category.id}`}>
                                                <Button size="md" type="button" color="success" className="mx-2">Edit</Button>
                                            </Link>
                                            <Modals
                                                title="Confirm Deletion !"
                                                message={`You are about to delete the category "${category.title}" permanently are you sure you want to do this? This will delete all courses belonging to it. Did you want to rename ?`}
                                                buttonText="Delete"
                                                buttonColor="danger"
                                                action={() => this.deleteCategory(category.id)}
                                            />
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        )) : null}
                    </Row>

                </Container>

            </div>
        )
    }
}

export default CategoryList
