import React, { Component } from 'react'

// reactstrap components
import {
    Button,
    Modal,
    Input,
    Col,

} from "reactstrap";
import auth from '../auth';

export class StarRatings extends Component {
    state = {
        exampleModal: false,
        user_rating: null
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    createStars = (numberOfStars) => {
        let stars = []
        for (var i = 0; i < Math.floor(numberOfStars); i++) {
            stars.push(<i class="fa fa-star" key={i} aria-hidden="true"></i>)
        }
        // check for remainder and print half star to represent it
        if (numberOfStars - Math.floor(numberOfStars) != 0) {
            stars.push(<i class="fa fa-star-half" key={i} aria-hidden="true"></i>)
        }
        return stars
    }

    createRating = () => {
        let formdata = new FormData()
        let score = document.getElementById("ratingdropdown").value;
        formdata.append('score', score)
        fetch(`http://localhost:8000/api/courses/${this.props.course_id}/rating/new/`, {
            method: "POST",
            body: formdata,
            headers: {
                'Authorization': `JWT ${localStorage.getItem("token")}`,
            }
        })
        .then(res => auth.checkLoginstatus(res))
        .then(res => res.json())
    }

    updateRating = () => {
        let formdata = new FormData()
        let score = document.getElementById("ratingdropdown").value;
        formdata.append('score', score)
        fetch(`http://localhost:8000/api/courses/${this.props.course_id}/rating/`, {
            method: "PUT",
            body: formdata,
            headers: {
                'Authorization': `JWT ${localStorage.getItem("token")}`,
            }
        })
        .then(res => auth.checkLoginstatus(res))
        .then(res => res.json())
    }
    componentDidMount = () => {
        fetch(`http://localhost:8000/api/courses/${this.props.course_id}/rating/`, {
            method: 'get',
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => res.json())
            .then(res => this.setState({ user_rating: res.score }))
    }

    render() {
        return (
            <div>
                {this.createStars(this.props.stars)}
                <>
                    {/* Button trigger modal */}
                    <Button
                        color="warning"
                        type="button"
                        size="sm"
                        onClick={() => this.toggleModal("exampleModal")}
                    >
                        Rate
        </Button>
                    {/* Modal */}
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.exampleModal}
                        toggle={() => this.toggleModal("exampleModal")}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Rate the course.
            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("exampleModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Col sm={12}>
                                <Input type="select" name="select" id="ratingdropdown">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </Col>
                        </div>
                        <div className="modal-footer">
                            <Button
                                color="secondary"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("exampleModal")}
                            >
                                Close
            </Button>
                            {this.state.user_rating ?
                                (<Button color="primary" type="button" onClick={this.updateRating}>
                                    Update rating
                                </Button>) :
                                (<Button color="primary" type="button" onClick={this.createRating}>
                                    Rate me
                                </Button>)}

                        </div>
                    </Modal>
                </>
            </div>
        )
    }
}

export default StarRatings
