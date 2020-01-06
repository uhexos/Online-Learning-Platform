import React, { Component } from 'react'
import { Card, CardBody, Button, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom';
import CardTitle from 'reactstrap/lib/CardTitle'
import Col from 'reactstrap/lib/Col';

export class CategoryList extends Component {
    state = { categories: [] }
    componentDidMount() {
        fetch('http://localhost:8000/api/categories', {
            method: "get",
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
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
    render() {
        let { categories } = this.state
        return (
            <div>
                <Container>
                    <Row>
                        {categories.length > 0 ? categories.map(category => (
                            <Col md="3" key={category.id}>
                                <Card className="shadow" >
                                    <CardBody>
                                        <CardTitle>
                                            <h3>{category.title}</h3>
                                            <p>{category.description}</p>
                                        </CardTitle>
                                        <Link to={`/admin/categories/${category.id}`}>
                                            <Button type="button" color="success">Edit Category</Button>
                                        </Link>
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
