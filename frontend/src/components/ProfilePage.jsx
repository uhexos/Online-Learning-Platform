/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import AdminNavbar from "./AdminNavbar";
import SimpleFooter from "./SimpleFooter";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {
  state = {
    loading: true,
    user: null
  };
  // TODO remove password field from serialiser or make read only
  componentDidMount() {
    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data, loading: false });
      });
  }

  render() {
    return (
      <>
        {this.state.loading || !this.state.user ? (
          <h5 className="title">Loading user profile... </h5>
        ) : (
          <div className="content container-fluid mt-4">
            <Row>
              <Col md="8" className="order-xl-2">
                <Card>
                  <CardHeader>
                    <h5 className="title">Edit Profile</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-md-1" md="6">
                          <FormGroup>
                            <label>Username</label>
                            <Input
                              defaultValue={this.state.user.username}
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input
                              defaultValue={this.state.user.email}
                              placeholder="mike@example.com"
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              defaultValue={this.state.user.first_name}
                              placeholder="John"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              defaultValue={this.state.user.last_name}
                              placeholder="Doe"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    {/* TODO implement the save button  */}
                    <Button className="btn-fill" color="primary" type="submit">
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4" className="order-xl-1">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar"
                          src={require("../assets/img/emilyz.jpg")}
                        />
                        <h5 className="title">Mike Andrew</h5>
                      </a>
                      <p className="description">Ceo/Co-Founder</p>
                    </div>
                    <div className="card-description">
                      Do not be scared of the truth because we need to restart
                      the human foundation in truth And I love you like Kanye
                      loves Kanye I love Rick Owens’ bed design but the back
                      is...
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button className="btn-icon btn-round" color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        )}

        <SimpleFooter></SimpleFooter>
      </>
    );
  }
}

export default UserProfile;
