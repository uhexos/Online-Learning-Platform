import React, { Component } from "react";
import Col from "reactstrap/lib/Col";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import Row from "reactstrap/lib/Row";
import Container from "reactstrap/lib/Container";
import CardTitle from "reactstrap/lib/CardTitle";
import CardText from "reactstrap/lib/CardText";
import Button from "reactstrap/lib/Button";
import CourseAccordian from "../components/CourseAccordian";
import TopNavBar from "../components/TopNavBar.jsx"
import Comments from "./Comments";
import StarRatings from "../components/StarRatings";

export class CoursePurchasePage extends Component {
  state = { isLoaded: false, error: null, course: null };
  componentDidMount() {
    fetch(`http://localhost:8000/api/courses/${this.props.match.params.id}/`, {
      method: "Get",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Didnt get user ${res.statusText}`);
        }
        return res.json();
      })
      .then(
        data => {
          this.setState({ isLoaded: true, course: data });
        },
        error => {
          this.setState({
            isLoaded: false
          });
        }
      );
  }
 
  addToCart = (id) => {
    // TODO add animations or an alert that show it was added successfully
    let formdata = new FormData();
    formdata.append("course", parseInt(id));
    fetch("http://localhost:8000/api/cart/add/", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (!res.ok) {
          console.log('successfully added to cart')
        }
        return res.json();
      })

  }
  render() {
    return (
      <>
        <TopNavBar />
        {!this.state.isLoaded ? (
          <h5>Loading details ...</h5>
        ) : (
            <Container fluid>
              <Row>
                <Col lg="3">
                  <Card className="mt-4 shadow ">
                    {/* <CardHeader>
                <h4 className="my-0 text-center font-weight-normal">Pro</h4>
              </CardHeader> */}
                    <CardBody>
                      <CardTitle>
                        <h1 className="card-title text-center pricing-card-title">
                          ${this.state.course.price}
                        </h1>
                      </CardTitle>
                      <ul className="list-unstyled text-center mt-3 mb-4">
                        <li>Priority email support</li>
                        <li>Life time <i className="fa fa-universal-access" aria-hidden="true"></i></li>
                      </ul>
                      <Button color="danger" size="lg" block onClick={() => this.addToCart(this.state.course.id)}>
                        Add to Cart
                    </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="9">
                  <Card className="mt-4 shadow">
                    <img
                      className="card-img-top img-fluid"
                      src="http://placehold.it/900x400"
                      alt=""
                    />
                    <CardBody>
                      <CardTitle>
                        <CardTitle>
                          <h3>{this.state.course.title}</h3>
                          <small className="text-muted">
                            Instructor:
                          {this.state.course.owner.first_name +
                              " " +
                              this.state.course.owner.last_name && this.state.course.owner.username}
                          </small>
                        </CardTitle>
                        <h4 className="text-warning">
                          ${this.state.course.price}
                        </h4>
                        <CardText>{this.state.course.description}</CardText>
                        {/* TODO implement */}
                          <span className="text-warning"><StarRatings stars={this.state.course.rating.average} course_id={this.props.match.params.id} rate={false}/></span>
                        rating
                    </CardTitle>
                      <CourseAccordian courseID={this.state.course.id} />
                    </CardBody>
                  </Card>
                  {/* <!-- /.card --> */}
                  {/* TODO implement comments stuff */}
                  <Card className="my-4 shadow">
                    <CardBody className="">
                      <Comments url={`http://localhost:8000/api/courses/${this.props.match.params.id}/`} article_id={this.props.match.params.id} article_title={this.state.course.title}></Comments>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
      </>
    );
  }
}

export default CoursePurchasePage;
