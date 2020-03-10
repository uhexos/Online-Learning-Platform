import React, { Component } from 'react'
import { Col, InputGroup, Input, InputGroupAddon, Button, Spinner } from 'reactstrap'

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
                    this.props.updateItems(result)
                    this.setState({
                        showSearchSpinner: false
                    });
                },
                // Note: it's important to handle errors here
            );
    }
    render() {
        return (
            <div>
                <Col>
                    {this.state.showSearchSpinner ? <Spinner color="primary" /> : null}
                    <InputGroup>
                        <Input type="text" placeholder="Search" id="search" />
                        <InputGroupAddon addonType="append">
                            <Button color="primary" onClick={this.searchCourses}><i className="fa fa-search" aria-hidden="true"></i></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </div>
        )
    }
}

export default Search
