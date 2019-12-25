import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar'
let jwtkey = localStorage.getItem('token');

class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courses",
      {
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else {
      return (
        <div>
          {/* //check if we have any items before mapping. */}
          {!isLoaded || items == null ? (<h5 className="title">Loading courses...</h5>) : (
            <Container>
              <Row className="mt-5">
                {items.map(item => (
                  <Col sm="6" md="4" key={item.id}>
                    <Card className="shadow">
                      <CardImg top src={item.thumbnail} alt="..." />
                      <CardBody>
                        <CardTitle><h5>{item.title}</h5></CardTitle>
                        <Link to={`/courses/${item.id}/lessons/0`}>
                          <Button color="primary" >View Course </Button>
                        </Link>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>)}
        </div>
      );
    }
  }
}

export default CoursesList;
