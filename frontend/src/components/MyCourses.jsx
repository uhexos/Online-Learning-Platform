import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button, CardGroup } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SimpleFooter from './SimpleFooter';
import StarRatings from './StarRatings';

// this will serve as the explore page check mycourses.jsx for new courses page 
function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      searchTerm: ''
    };
    this.searchResult = this.searchResult.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courses", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <TopNavBar></TopNavBar>
          <Container>
            <Row className="mt-5">
              <Col sm="6">
                <div style={{ marginLeft: '150px' }}>
                  <input type="text" className="form-control" placeholder="search" onChange={this.onSearchChange} />
                </div>
              </Col>
              {/* <Col sm="2">
                <div style={{ marginLeft:'10px' }}>
                  <button className="btn btn-success" 
                  onClick={ () => this.searchResult(this.state.searchTerm) }>Search</button>
                </div>
              </Col> */}
            </Row>
          </Container>


          {/* //check if we have any items before mapping. */}
          {!isLoaded || items == null ? (
            <h5 className="title">Loading courses...</h5>
          ) : (
              <Container>
                <Row className="mt-5">
                  {items.filter(isSearched(this.state.searchTerm)).map(item => (
                    <Col sm="6" md="4" key={item.id}>
                      <Card className="shadow mb-3">
                        <CardImg top src={item.thumbnail} alt="course thumbnail" />
                        <CardBody>
                          <CardTitle>
                            <h5>{item.title}</h5>
                            <p><span>By </span>{item.owner.username}</p>
                            <StarRatings stars={item.rating.score__avg} course_id={item.id}/>
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
              </Container>
            )}
          <SimpleFooter></SimpleFooter>
        </div>
      );
    }
  }
}

export default CoursesList;
