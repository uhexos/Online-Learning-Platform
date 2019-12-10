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

export class CoursePurchasePage extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg="3" >
            <Card className="mt-4 shadow " >
              <CardHeader>
                <h4 className="my-0 text-center font-weight-normal">Pro</h4>
              </CardHeader>
              <CardBody>
                <CardTitle>
                  <h1 className="card-title text-center pricing-card-title">$15</h1>
                </CardTitle>
                <ul className="list-unstyled text-center mt-3 mb-4">
                  <li>20 users included</li>
                  <li>10 GB of storage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <Button color="danger" size="lg" block>
                  Buy Course
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
                    <h3>Product Name</h3>
                    <small className="text-muted">
                      Instructor: Author Name
                    </small>
                  </CardTitle>
                  <h4 className="text-warning">$24.99</h4>
                  <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sapiente dicta fugit fugiat hic aliquam itaque facere,
                    soluta. Totam id dolores, sint aperiam sequi pariatur
                    praesentium animi perspiciatis molestias iure, ducimus!
                  </CardText>
                  <span className="text-warning">★ ★ ★ ★ ☆</span>
                  4.0 stars
                </CardTitle>
              </CardBody>
            </Card>
            {/* <!-- /.card --> */}

            <Card className="my-4 shadow">
              <CardHeader>Product Reviews</CardHeader>
              <CardBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Omnis et enim aperiam inventore, similique necessitatibus
                  neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                  laborum. Sequi mollitia, necessitatibus quae sint natus.
                </p>
                <small className="text-muted">
                  Posted by Anonymous on 3/1/17
                </small>
                <hr />
                <a href="#" className="btn btn-success">
                  Leave a Review
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CoursePurchasePage;
