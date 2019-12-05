import React from 'react';
import './App.css';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar'
let jwtkey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTc1NTcwNzIzLCJlbWFpbCI6IiIsIm9yaWdfaWF0IjoxNTc1NTY3MTIzfQ.rlrCjWuq_3GO0vXjUR7NVU9oSgGUmMqq2E6bOPneSzM";

class CoursesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/courses",
      {
        method: 'GET',
        headers: {
          Authorization: `JWT ${jwtkey}`
        }
      }
    )
      .then(res => res.json())
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
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {/* <Sidebar></Sidebar> */}
          <Container>
            <Row className="mt-5">
              {items.map(item => (
                <Col sm="6" md="3" key={item.id}>
                  <Card>
                    {console.log(item.thumbnail)}
                    <CardImg top src={item.thumbnail} alt="..." />
                    <CardBody>
                      <CardTitle>{item.title}</CardTitle>
                      <CardText>{item.description}</CardText>
                      <Link to={`/courses/${item.id}`}>
                        <Button color="primary" >View Course </Button>
                      </Link>
                    </CardBody>
                  </Card>
                    
                </Col>
              ))}
            </Row>

          </Container>
        </div>



      );
    }
  }
}

export default CoursesList;
