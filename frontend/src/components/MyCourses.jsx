import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button, CardGroup } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SimpleFooter from './SimpleFooter';
import StarRatings from './StarRatings';
import auth from '../auth';
import Search from './search';
import AdvancedSearch from './advancedSearch';
import CoursePaginator from './CoursePaginator';

// this will serve as the explore page check mycourses.jsx for new courses page 
class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      count: 1,
      page_size: 0,
      next_page: "#",
      previous_page: "#",
    };
    this.searchResult = this.searchResult.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courses/bought", {
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
        res => {
          this.setState({
            isLoaded: true,
            items: res.results,
            count: res.count,
            page_size: res.results.length,
            next_page: res.next,
            previous_page: res.previous,
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

  searchResult(event) {
    const isNotTitle = item => item.title !== event.target.value;
    const updatedItems = this.state.items.filter(isNotTitle);
    this.setState({ items: updatedItems });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  updateItems = (key, value) => {
    var temp_obj = {};
    temp_obj[key] = value;
    this.setState(temp_obj)
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <TopNavBar></TopNavBar>
          <Container>
            <div className="mt-5">
              <Search updateItems={this.updateItems} endpoint="courses/bought" />
              <AdvancedSearch updateItems={this.updateItems} endpoint="courses/bought" />
            </div>
          </Container>


          {/* //check if we have any items before mapping. */}
          {!isLoaded || items == null ? (
            <h5 className="title">Loading courses...</h5>
          ) : (
              <Container>
                <Row className="mt-5">
                  {items.map(item => (
                    <Col sm="6" md="4" key={item.id}>
                      <Card className="shadow mb-3">
                        <CardImg top src={item.thumbnail} alt="course thumbnail" />
                        <CardBody>
                          <CardTitle>
                            <h5>{item.title}</h5>
                            <p><span>By </span>{item.owner.username}</p>
                            <StarRatings stars={item.rating.average} course_id={item.id} rate={true} />
                          </CardTitle>
                          <Row>
                            <Col>
                              <Link to={`/courses/${item.id}/lessons/0`}>
                                <Button color="primary" block>View Course </Button>
                              </Link>
                            </Col>
                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col>
                    <CoursePaginator count={this.state.count} page_size={this.state.page_size} url="" />
                  </Col>
                </Row>
              </Container>
            )}
          <SimpleFooter></SimpleFooter>
        </div>
      );
    }
  }
}

export default CoursesList;
