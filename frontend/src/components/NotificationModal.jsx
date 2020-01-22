import React from "react";
// reactstrap components
import {
  Button,
  Modal,
  Row,
  Col
} from "reactstrap";
// custom component that creates a button and when the button is clicked creates a modal style as notification
class Modals extends React.Component {
  state = {
    defaultModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    return (
      <>
        <Row>
          <Col md="4">
            <Button
              className="mb-3"
              color={this.props.buttonColor}
              type="button"
              onClick={() => this.toggleModal("notificationModal")}
            >
              {this.props.buttonText}
            </Button>
            <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={this.state.notificationModal}
              toggle={() => this.toggleModal("notificationModal")}
            >
              <div className="modal-header">
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">{this.props.title}</h4>
                  <p>
                    {this.props.message}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                {/* action is a function that is executed when the confirm button is clicked */}
                <Button
                  className="btn-white"
                  color="default"
                  type="button"
                  onClick={
                    (action) => {
                      this.props.action();
                      this.toggleModal("notificationModal");
                    }
                  }
                >
                  Ok
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Modals;