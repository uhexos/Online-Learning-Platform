import React, { Component } from 'react'
import { Card, CardImg, CardBody, CardTitle, Button, Input, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SimpleFooter from './SimpleFooter';
import AdvancedSearch from './advancedSearch';
import StarRatings from './StarRatings';
import Search from './search';
import CoursePaginator from './CoursePaginator';
import UserProfile from './ProfilePage';


export class NonTutorProfile extends Component {
    render() {
        return (
            <div>
                <TopNavBar></TopNavBar>
                <Container fluid>
                    <UserProfile></UserProfile>
                </Container>
                <SimpleFooter></SimpleFooter>
            </div>
        )
    }
}

export default NonTutorProfile


