import React, { Component } from 'react'
import { Col, InputGroup, Input, InputGroupAddon, Button, Spinner, Row, InputGroupText } from 'reactstrap'

export class Search extends Component {
    state = {
        showSearchSpinner: false,
    }
    searchCourses = () => {
        this.setState({ showSearchSpinner: true })
        let query = document.getElementById('search').value
        fetch(`http://localhost:8000/api/${this.props.endpoint}/?search=${query}`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(
                result => {
                    this.props.updateItems("items",result.results)
                    this.props.updateItems("count",result.count)
                    this.props.updateItems("page_size",result.results.length)
                    this.props.updateItems("next_page",result.next)
                    this.props.updateItems("previous_page",result.previous)
                    this.props.updateItems("pages",result.pages)
                    this.setState({
                        showSearchSpinner: false
                    });
                    this.props.history.push(`?search=${query}`)
                },
                // Note: it's important to handle errors here
            );
    }
    render() {
        return (
        
                <Row>
                    <Col md = {12} lg ={12}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    {this.state.showSearchSpinner ? <Spinner color="primary" size="sm"/> : null}
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" id="search" />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={this.searchCourses}><i className="fa fa-search" aria-hidden="true"></i></Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>

            
        )
    }
}

export default Search
