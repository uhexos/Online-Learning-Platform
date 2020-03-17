import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card, Form, FormGroup, Label, Input, CustomInput, Row, Col } from 'reactstrap';
import auth from '../auth';

export class AdvancedSearch extends Component {
    state = { isOpen: false, categories: [] }

    toggle = () => this.setState({ isOpen: !this.state.isOpen });
    searchCoursesAdvanced = () => {
        let query = document.getElementById('search').value
        let arr = [];
        let max_price_element = document.getElementById('max_price');
        let min_price_element = document.getElementById('min_price');
        let category_element = document.getElementById('category');
        let min_rating_element = document.getElementById('rating');

        //make sure min is less than max before sending off 
        if (parseFloat(min_price_element.value) > parseFloat(max_price_element.value)) {
            console.log('swapping')
            let temp = min_price_element.value;
            min_price_element.value = max_price_element.value;
            max_price_element.value = temp;
        }

        arr.push(max_price_element);
        arr.push(min_price_element);
        arr.push(category_element);
        arr.push(min_rating_element);

        let filters = "";
        for (let index = 0; index < arr.length; index++) {
            let item = arr[index];
            if (item.value != "") {
                filters += `${item.name}=${item.value}&`
            }
        }
        let url = "";
        url = query ? `http://localhost:8000/api/${this.props.endpoint}/?search=${query}&${filters}` : `http://localhost:8000/api/${this.props.endpoint}/?${filters}`

        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => res.json())
            .then(res => {
                this.props.updateItems("items", res.results)
                this.props.updateItems("count", res.count)
                this.props.updateItems("page_size", res.results.length)
                this.props.updateItems("next_page", res.next)
                this.props.updateItems("previous_page", res.previous)
                this.props.updateItems("pages", res.pages)
                console.log('filters',`?search=${query}&${filters}`)
                this.props.history.push(query ? `?search=${query}&${filters}` : `?${filters}`)

            })
    }
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

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button className="float-right mt-2" color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Options</Button>
                    </Col>
                </Row>
                <Collapse isOpen={this.state.isOpen}>
                    <Card>
                        <CardBody>
                            <Form inline>
                                <FormGroup className="mx-1">
                                    <Label for="category" hidden>Category</Label>
                                    <CustomInput type="select" id="category" name="category">
                                        <option value="">Category</option>
                                        {this.state.categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>
                                        )}
                                    </CustomInput>
                                </FormGroup>

                                <FormGroup className="mx-1">
                                    <Label for="min_price" hidden>Min Price</Label>
                                    <Input type="number" name="min_price" id="min_price" placeholder="Min Price" />
                                </FormGroup>
                                <FormGroup className="mx-1">
                                    <Label for="max_price" hidden>max Price</Label>
                                    <Input type="number" name="max_price" id="max_price" placeholder="Max Price" />
                                </FormGroup>
                                <FormGroup className="mx-1">
                                    <Label for="rating" hidden>Rating</Label>
                                    <CustomInput type="select" id="rating" name="min_rating">
                                        <option value="">Min Rating</option>
                                        <option value='1' > 1 star</option>
                                        <option value='2'> 2 stars</option>
                                        <option value='3'> 3 stars</option>
                                        <option value='4'> 4 stars</option>
                                        <option value='5'> 5 stars</option>
                                    </CustomInput>
                                </FormGroup>
                                <Button color="primary" type="button" onClick={this.searchCoursesAdvanced}><i className="fa fa-search" aria-hidden="true"></i></Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

export default AdvancedSearch
