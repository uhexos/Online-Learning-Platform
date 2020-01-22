import React, { Component } from 'react';
import Container from "reactstrap/lib/Container";
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import auth from '../auth';


export class TutorCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null
    };
  }

  componentDidMount() {
    // reworked to use the profile api endpoint so that we dont have to call for every course in the db unnecessarily.
    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(
        user => {
          this.setState({
            isLoaded: true,
            // take only the courses made by the user and toss the rest away
            // items: result.filter(item => this.currentUserCourse(item.owner.username))
            items: user.courses
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  // TODO rework view course button to be an edit button.
  render() {
    let { error, isLoaded, items } = this.state;

    if (items === null) {
      return <p>loading!!! </p>

    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>

          {/* //check if we have any items before mapping. */}
          {!isLoaded || items == null ? (
            <h5 className="title">Loading courses...</h5>
          ) : (
              <Container>
                <Row className="mt-5">
                  {items == 0 ? (
                    <p>You do not have any courses yet.</p>
                  ): null}
                  {items.map(item => (
                    <Col sm="6" md="4" key={item.id}>
                      <Card className="shadow mb-3">
                        <CardImg top src={item.thumbnail} alt="course thumbnail" />
                        <CardBody>
                          <CardTitle>
                            <h5>{item.title}</h5>
                            <p><span>By </span>{item.owner.username}</p>
                          </CardTitle>
                          <Link to={`/courses/${item.id}/lessons/0`}>
                            <Button color="primary">View Course </Button>
                          </Link>
                          <Link to={`/admin/courses/${item.id}/lessons/new`} style={{ marginLeft: "5px" }}>
                            <Button color="success">Add Lesson</Button>
                          </Link>
                        </CardBody>
                      </Card>
                    </Col>


                  ))}
                </Row>
              </Container>
            )}
        </div>
      );
    }
  }
}

export default TutorCourses;
