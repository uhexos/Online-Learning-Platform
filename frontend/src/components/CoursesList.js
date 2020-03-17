import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button, Input, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SimpleFooter from './SimpleFooter';
import AdvancedSearch from './advancedSearch';
import StarRatings from './StarRatings';
import Search from './search';
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
  }

  componentDidMount() {
  //  let test = new URLSearchParams(this.props.location.search);
  //  let st = "";
  //  test.forEach((value,key)=> st+=`${key}=${value}`)
  //  console.log('test',`http://localhost:8000/api/courses/${st}`)
    fetch(`http://localhost:8000/api/courses/`, {
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
            items: result.results,
            count: result.count,
            page_size: result.results.length,
            next_page: result.next,
            previous_page: result.previous,
            pages:result.pages,
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


  updateItems = (key, value) => {
    var temp_obj = {};
    temp_obj[key] = value;
    this.setState(temp_obj)
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
              <Col sm={12} md={12}>
                <Search updateItems={this.updateItems} endpoint="courses" />
                <AdvancedSearch updateItems={this.updateItems} endpoint="courses" />
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
                  {items.map(item => (
                    <Col sm="6" md="4" key={item.id}>
                      <Card className="shadow mb-3">
                        <CardImg top src={item.thumbnail} alt="course thumbnail" />
                        <CardBody>
                          <CardTitle>
                            <h4>{item.title}</h4>
                            <h5 className="text-warning">
                              ${item.price}
                            </h5>
                            <p><span>By </span>{item.owner.username}</p>
                            <StarRatings stars={item.rating.average} course_id={item.id} rate={false} />
                          </CardTitle>

                          <Row>
                            <Col xs="9" md="8" >
                              <Link to={`/courses/purchase/${item.id}`}>
                                <Button color="primary">Learn More... </Button>
                              </Link>
                            </Col>
                            <Col xs="3" md="4" className="text-right">
                              <Button color="link" onClick={() => this.addToCart(item.id)}><i className="fa fa-cart-plus fa-lg"></i></Button>
                            </Col>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col>
                  {/* default page size shall be 10 */}
                  {console.log("goes in",this.state.next_page,this.state.previous_page)}
                    <CoursePaginator number={this.state.pages} updateItems={this.updateItems} next_page={this.state.next_page} previous_page={this.state.previous_page}/>
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
