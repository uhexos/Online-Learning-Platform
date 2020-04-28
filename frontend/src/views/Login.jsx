/*!
Login page for the site
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
import TopNavBar from "../components/TopNavBar";
import SimpleFooter from "../components/SimpleFooter";
import UserContext, { UserConsumer } from "../UserContext";
import auth from "../auth";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = { loginError: false };
  static contextType = UserContext;

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    let main = document.querySelector("main");
    main.scrollTop = 0;
  }
  getProfile = () => {
    const context = this.context;
    fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        context.updateValue("user", data);
        // TODO pick only relevant items to store in the context rather than the entire user object
        console.log("useer", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data));
        context.updateValue("isLoggedIn", true);
      });
  };

  prepCart = () => {
    // this function atrempts to create a cart for the user as soon as the user logs in
    // logic in the back prevents duplicate carts from being created for a user.
    fetch("http://localhost:8000/api/cart/new/", {
      method: "POST",
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => res.json());
  };
  //user arrow functions to autobind component to this, setState wont work if you dont use arrow syntax
  userLogin = () => {
    //take user auth from the form and store our jwt token into local storage
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // const data = { username: username, password: password };
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    // TODO handle fetch errors and add feedback to form
    fetch(`http://127.0.0.1:8000/auth/`, {
      method: "POST",
      body: formdata
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
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", username);
          this.getProfile();
          this.prepCart();
          this.props.history.push(
            this.props.location.state
              ? this.props.location.state.from.pathname
              : `/courses/`
          );
          // this.props.history.push(this.props.location.state.from.pathname || `/courses/`);
        }
      });
  };

  render() {
    return (
      <UserConsumer>
        {context => (
          <>
            <Helmet>
              <title>Login</title>
            </Helmet>
            <TopNavBar></TopNavBar>
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
                        <CardHeader className="bg-white ">
                          <div className="text-muted text-center mb-3">
                            <h2>Sign in</h2>
                          </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                          <div className="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                          </div>
                          <Alert color="warning" isOpen={this.state.loginError}>
                            Wrong Username or password
                          </Alert>
                          <Form role="form">
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-email-83 text-primary" />{" "}
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  placeholder="Username"
                                  type="text"
                                  id="username"
                                />
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-lock-circle-open text-primary" />
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
                          <Link to={`/register`}>
                            <small>Create new account</small>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </section>
            </main>
            <SimpleFooter></SimpleFooter>
          </>
        )}
      </UserConsumer>
    );
  }
}

export default Login;
