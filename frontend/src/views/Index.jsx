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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts.jsx";

import Header from "../components/Headers/Header.jsx";
import auth from "../auth.js";

class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "year",
    sales: []
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "year" ? "month" : "year"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }

    fetch("http://localhost:8000/api/reports/sales", {
      method: "GET",
      headers: {
        authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => auth.checkLoginstatus(res))
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(sales => {
        this.setState({ sales: sales });
      })
      .catch(err => {
        err.text().then(errorMessage => {
          this.setState({ errors: errorMessage });
        });
      });
  }
  fillChart = choice => {
    let yearData = Array(12).fill(0); //month totals
    let monthData = Array(31).fill(0); //daily totals

    // fill the array with the total sales for each month of the year
    this.state.sales.map(sale => {
      var saleDate = new Date(sale.pub_date);
      var today = new Date();
      yearData[saleDate.getMonth()]
        ? (yearData[saleDate.getMonth()] += parseFloat(sale.course.price)) //value already in position
        : (yearData[saleDate.getMonth()] = parseFloat(sale.course.price)); //first value to enter position

      // fill the array with the total sales for each day of the month
      // console.log( aleDate.getFullYear)
      if (
        today.getMonth() == saleDate.getMonth() &&
        today.getFullYear() == saleDate.getFullYear()
      ) {
        // remove 1 from everydate to keep it in line with array index ie 30 becomes index 29
        monthData[saleDate.getDate() - 1]
          ? (monthData[saleDate.getDate() - 1] += parseFloat(sale.course.price))
          : (monthData[saleDate.getDate() - 1] = parseFloat(sale.course.price));
      }
    });
    // console.log(monthData);
    let test = {
      year: canvas => {
        return {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          datasets: [
            {
              label: "Performance",
              data: yearData
            }
          ]
        };
      },
      month: canvas => {
        return {
          labels: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31
          ],
          datasets: [
            {
              label: "Performance",
              data: monthData
            }
          ]
        };
      }
    };
    return test[choice];
  };

  getTableRows = () => {
    let arr = {};
    //group sales by course id and make a course price an accumulator
    this.state.sales.map(sale => {
      if (sale.course) {
        if (sale.course.id in arr) {
          arr[sale.course.id].price =
            parseFloat(arr[sale.course.id].price) +
            parseFloat(sale.course.price);
          arr[sale.course.id].count += 1;
        } else {
          //function was originally incorrectly modifying the actual state. This create a deep copy of the object. ie is totally different
          arr[sale.course.id] = JSON.parse(JSON.stringify(sale.course));
          arr[sale.course.id].count = 0;
        }
      }
    });
    // console.log(this.state.sales)

    return Object.values(arr).map(groupedSaleData => {
      if (groupedSaleData.count != 0) {
        return (
          <tr key={groupedSaleData.id}>
            <td>
              <i className="text-success mr-3" /> {groupedSaleData.id}
            </td>
            <th scope="row">{groupedSaleData.title}</th>
            <td>{groupedSaleData.price}</td>
            <td>{groupedSaleData.count}</td>
          </tr>
        );
      }
    });
  };
  render() {
    return (
      <>
        {/* contains cards at top of template */}
        <Header data={this.state.sales} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      // data={chartExample1[this.state.chartExample1Data]}
                      data={this.fillChart(this.state.chartExample1Data)}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody> */}
            {/* Chart */}
            {/* <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Course id</th>
                      <th scope="col">Course name</th>
                      <th scope="col">Total Sales Amount</th>
                      <th scope="col">Copies Sold</th>
                    </tr>
                  </thead>
                  <tbody>{this.getTableRows()}</tbody>
                </Table>
              </Card>
            </Col>
            {/* <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
