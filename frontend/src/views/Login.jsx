/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Alert from "reactstrap/lib/Alert";
import AdminNavbar from '../components/AdminNavbar';
import SimpleFooter from '../components/SimpleFooter';
import UserContext, { UserConsumer } from "../UserContext";

class Login extends React.Component {
  state = { loginError: false };
  static contextType = UserContext

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    let main = document.querySelector("main")
    main.scrollTop = 0
  }
  getProfile = () => {
    const context = this.context
    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        context.updateValue('user', data);
        // TODO pick only relevant items to store in the context rather than the entire user object 
        localStorage.setItem('user', JSON.stringify(data));
        context.updateValue('isLoggedIn', true);
      });
  }
  //user arrow functions to autobind component to this, setState wont work if you dont use arrow syntax
  userLogin = () => {
    //take user auth from the form and store our jwt token into local storage
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const data = { username: username, password: password };

    // TODO handle fetch errors and add feedback to form
    fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(result => {
        if (!result.token) {
          // display error message alert in form 
          this.setState({
            loginError: true
          });
        } else {
          this.setState({ loginError: false });
          //store a value to the user computer to use on all pages expires after 1 hours check settings.py for current duration
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', username);
          this.getProfile();
          this.props.history.push(this.props.location.state ? this.props.location.state.from.pathname : `/courses/`);
          // this.props.history.push(this.props.location.state.from.pathname || `/courses/`);
        }
      });
  };

  render() {
    return (
      <UserConsumer>
        {(context) => (<>
          {/* {this.getProfile()} */}
          {console.log(this.props.location)}
          <AdminNavbar></AdminNavbar>
          <main id="main">
            <section className="section section-shaped section-lg">
              <div className="shape shape-style-1 bg-gradient-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="pt-lg-md">
                <Row className="justify-content-center">
                  <Col lg="5">
                    <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                          <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={require("../assets/img/github.svg")}
                              />
                            </span>
                            <span className="btn-inner--text">Github</span>
                          </Button>
                          <Button
                            className="btn-neutral btn-icon ml-1"
                            color="default"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={require("../assets/img/google.svg")}
                              />
                            </span>
                            <span className="btn-inner--text">Google</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Or sign in with credentials</small>
                        </div>
                        <Alert color="warning" isOpen={this.state.loginError}>Wrong Username or password</Alert>
                        <Form role="form">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-email-85" />                              </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Username" type="text" id="username" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-lock-circle" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Password"
                                type="password"
                                autoComplete="off"
                                id="password"
                              />
                            </InputGroup>
                          </FormGroup>
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id=" customCheckLogin"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor=" customCheckLogin"
                            >
                              <span>Remember me</span>
                            </label>
                          </div>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="primary"
                              type="button"
                              onClick={this.userLogin}
                            >
                              Sign in
                        </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                    <Row className="mt-3">
                      <Col xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </Col>
                      <Col className="text-right" xs="6">
                        <a
                          className="text-light"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Create new account</small>
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <SimpleFooter></SimpleFooter>
        </>)
        }
      </UserConsumer>

    );
  }
}

export default Login;
