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
import React, { useContext } from "react";

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
import UserHeader from "./Headers/UserHeader";
import Container from "reactstrap/lib/Container";
import Label from "reactstrap/lib/Label";
import UserContext, { UserConsumer } from "../UserContext";
import auth from "../auth";
import { Helmet } from "react-helmet";

class UserProfile extends React.Component {
  static contextType = UserContext;
  state = {
    loading: true,
    user: null
  };
  // TODO remove password field from serialiser or make read only
  componentDidMount() {
    const context = this.context;

    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data, loading: false });
        context.updateValue("user", this.state.user);
        localStorage.setItem("user", JSON.stringify(data));
        // localStorage.setItem("user", this.state.user);
        // console.log('user',context)
      });
  }
  updateProfile = () => {
    let formdata = new FormData();

    formdata.append("username", document.getElementById("username").value);
    formdata.append("email", document.getElementById("userEmail").value);
    formdata.append(
      "first_name",
      document.getElementById("userFirstName").value
    );
    formdata.append("last_name", document.getElementById("userLastName").value);
    formdata.append("about", document.getElementById("userDescription").value);
    formdata.append("is_tutor", document.getElementById("userIsTutor").checked);

    fetch(`http://localhost:8000/api/users/${this.state.user.id}/`, {
      method: "PATCH",
      body: formdata,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  render() {
    return (
      <UserConsumer>
        {context => (
          <>
            {this.state.loading || !this.state.user ? (
              <h5 className="title">No such user profile... </h5>
            ) : (
              <Container className="content" fluid>
                <Helmet>
                  <title>User Profile</title>
                </Helmet>
                <UserHeader name={this.state.user.username} />
                <Row className="mt-2">
                  <Col lg="8" className="order-xl-2 mb-3">
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
                                  id="username"
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
                                  id="userEmail"
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
                                  id="userLastName"
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
                                  id="userFirstName"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label for="userDescription ">Description</Label>
                            <Input
                              defaultValue={this.state.user.about}
                              type="textarea"
                              name="userDescription"
                              id="userDescription"
                            />
                          </FormGroup>
                          <FormGroup>
                            {/* TODO fix this to use proper react strap components */}
                            <Label for="courseIsTutor">Become A tutor</Label>
                            <span className="clearfix" />
                            <Label className="custom-toggle">
                              <Input
                                defaultChecked={this.state.user.is_tutor}
                                type="checkbox"
                                id="userIsTutor"
                              />
                              <span className="custom-toggle-slider rounded-circle" />
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="button"
                          onClick={this.updateProfile}
                        >
                          Save
                        </Button>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="4" className="order-xl-1 ">
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
                            <h5 className="title">{`${this.state.user.first_name} ${this.state.user.last_name}`}</h5>
                          </a>
                        </div>
                        <div className="card-description">
                          {this.state.user.about}
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div className="button-container">
                          <Button
                            className="btn-icon btn-round"
                            color="facebook"
                          >
                            <i className="fab fa-facebook" />
                          </Button>
                          <Button
                            className="btn-icon btn-round"
                            color="twitter"
                          >
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
              </Container>
            )}
          </>
        )}
      </UserConsumer>
    );
  }
}

export default UserProfile;
