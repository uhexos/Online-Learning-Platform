/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  state = { salesTotal: 0, salesPercentage: 0 };

  getSalesTotal = () => {
    let total = 0;
    this.props.data.map(sale => {
      let saleDate = new Date(sale.pub_date);
      let today = new Date();
      if (
        saleDate.getMonth() == today.getMonth() &&
        saleDate.getYear() == today.getYear()
      ) {
        total += parseFloat(sale.course.price);
      }
    });
    return total;
  };
  getSalesDifference = () => {
    let total = 0;
    let lastMonthTotal = 0;
    this.props.data.map(sale => {
      let saleDate = new Date(sale.pub_date);
      let today = new Date();
      if (
        saleDate.getMonth() == today.getMonth() &&
        saleDate.getYear() == today.getYear()
      ) {
        total += parseFloat(sale.course.price);
      } else if (
        saleDate.getMonth() == today.getMonth() - 1 &&
        saleDate.getYear() == today.getYear()
      ) {
        lastMonthTotal += parseFloat(sale.course.price);
      }
    });
    return (((total - lastMonthTotal) / lastMonthTotal) * 100).toFixed(2);
  };
  getTotalNumberOfSales = () => {
    return this.props.data.length;
  };
  getSalesNumberDifference = () => {
    let total = 0;
    let lastMonthTotal = 0;
    this.props.data.map(sale => {
      let saleDate = new Date(sale.pub_date);
      let today = new Date();
      if (
        saleDate.getMonth() == today.getMonth() &&
        saleDate.getYear() == today.getYear()
      ) {
        total += 1;
      } else if (
        saleDate.getMonth() == today.getMonth() - 1 &&
        saleDate.getYear() == today.getYear()
      ) {
        lastMonthTotal += 1;
      }
    });
    return (((total - lastMonthTotal) / lastMonthTotal) * 100).toFixed(2);
  };

  getNewSales = () => {
    let total = 0;
    this.props.data.map(sale => {
      let saleDate = new Date(sale.pub_date);
      let today = new Date();
      if (
        saleDate.getMonth() == today.getMonth() &&
        saleDate.getYear() == today.getYear()
      ) {
        total += 1;
      }
    });
    return total;
  };

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            All time Sales
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.getTotalNumberOfSales()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2"></span>{" "}
                        <span className="text-nowrap">All sales ever</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Number of Sales this month
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.getNewSales()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className={`text-${this.getSalesNumberDifference() > 0?"success":"warning"} mr-2`}>
                          <i
                            className={`fas fa-arrow-${
                              this.getSalesNumberDifference() > 0
                                ? "up"
                                : "down"
                            }`}
                          />{" "}
                          {Math.abs(this.getSalesNumberDifference())}%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Sales (expected payout)
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            GHS {this.getSalesTotal()}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className={`text-${this.getSalesDifference() > 0?"success":"warning"}`}>
                          <i
                            className={`fas fa-arrow-${
                              this.getSalesDifference() > 0 ? "up" : "down"
                            }`}
                          />{" "}
                          {Math.abs(this.getSalesDifference())}%
                        </span>{" "}
                        <span className="text-nowrap">vs last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                {/* <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            49,65%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col> */}
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
