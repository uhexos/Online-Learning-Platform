import React from 'react';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import SimpleFooter from './SimpleFooter';
// import Sidebar from './Sidebar'
let jwtkey = localStorage.getItem('token');

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
    }
    else {
      // TODO add fix to stop the rendering before fetcch from api 
      return (
        <div>
          <AdminNavbar></AdminNavbar>
          <Container>
            <Row className="mt-5">
              {items.detail ? <h2>Loading courses...</h2> : (items.map(item => (
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
              )))}

            </Row>
          </Container>
          <SimpleFooter></SimpleFooter>
        </div>
      );
    }
  }
}

export default CoursesList;
