import React, { Component } from "react";
import Container from "reactstrap/lib/Container";
import { Card, CardImg, CardBody, CardTitle, Button } from "reactstrap";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import { Link } from "react-router-dom";
import auth from "../auth";

export class TutorCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      owner: {}
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
            owner: user
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
    let { error, isLoaded, owner } = this.state;

    if (owner.courses === null) {
      return <p>loading!!! </p>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          {/* //check if we have any items before mapping. */}
          {!isLoaded || owner.courses == null ? (
            <h5 className="title">Loading courses...</h5>
          ) : (
            <Container>
              <Row className="mt-5">
                {owner.courses == 0 ? (
                  <p>You do not have any courses yet.</p>
                ) : null}
                {owner.courses.map(item => (
                  <Col sm="6" md="4" key={item.id}>
                    <Card className="shadow mb-3">
                      <CardImg
                        top
                        src={item.thumbnail}
                        alt="course thumbnail"
                      />
                      <CardBody>
                        <CardTitle>
                          <Row>
                            <Col>
                              <h5>{item.title}</h5>
                            </Col>
                            <h5 className="text-align-right text-muted">{item.id}</h5>
                          </Row>

                          <p>
                            <span>By </span>
                            {owner.username}
                          </p>
                        </CardTitle>
                        <Link to={`/admin/courses/${item.id}/edit`}>
                          <Button color="primary">Edit Course </Button>
                        </Link>
                        <Link
                          to={`/admin/courses/${item.id}/lessons/new`}
                          style={{ marginLeft: "5px" }}
                        >
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
