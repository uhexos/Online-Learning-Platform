import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
  Input,
  Label,
  Table,
  Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import auth from "../auth";

export class EditQuiz extends Component {
  state = {
    activeTab: "1",
    lesson: null,
    quiz: { questions: [{ options: [] }] },
    options: [],
    question: {},
    answer: 0,
  };

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  getQuiz = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/quiz/${this.state.lesson}`, {
      method: "get",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ quiz: data });
        this.setActiveTab("2");
      });
  };
  setOptions = (question) => {
    this.setState({
      options: question.options,
      question: question,
      answer: question.answer,
    });
    this.toggle("3");
  };

  updateOptionAsync = async (oid, formdata) => {
    // let formdata = { prompt: 'mask' }
    let response = await fetch(
      `http://localhost:8000/api/quiz/${this.state.quiz.lesson}/questions/${this.state.quiz.id}/options/${oid}/`,
      {
        method: "PATCH",
        body: JSON.stringify(formdata),
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    ).then((res) => auth.checkLoginstatus(res));
    let data = await response.json();
    return data;
  };
  updatePrompt = (event) => {
    event.preventDefault();
    let formdata = new FormData(document.getElementById("updatePromptForm"));
    fetch(
      `http://localhost:8000/api/quiz/${this.state.quiz.lesson}/questions/${this.state.question.id}/`,
      {
        method: "PATCH",
        body: formdata,
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => res.json());
  };
  updateOptions = (event) => {
    event.preventDefault();
    Array.from(
      document.querySelectorAll("#updateOptionsForm input")
    ).map((input) =>
      this.updateOptionAsync(input.dataset.id, { prompt: input.value })
    );
    document.getElementById("getQuizButton").click();
  };
  deleteQuestion = () => {
    let result = window.confirm("Are you sure you want to delete the question");
    if (result) {
      fetch(
        `http://localhost:8000/api/quiz/${this.state.quiz.lesson}/questions/${this.state.question.id}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      ).then((res) => auth.checkLoginstatus(res));
      document.getElementById("getQuizButton").click();
    }
  };
  handleAnswerChange = (event) => {
    this.setState({ answer: event.target.value });
  };
  deleteQuiz =()=>{
    let result = window.confirm("Are you sure you want to delete the question");
    if (result) {
      fetch(
        `http://localhost:8000/api/quiz/${this.state.lesson}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      ).then((res) => auth.checkLoginstatus(res));
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Pick Quiz
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Edit Options
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <CardBody>
                  <Form className="editQuiz">
                    <FormGroup>
                      <Label for="quiz">Pick quiz:</Label>
                      <Input
                        name="quiz"
                        type="select"
                        onChange={() =>
                          this.setState({
                            lesson: document.querySelector(".editQuiz select")
                              .value,
                          })
                        }
                      >
                        <option>...</option>
                        {this.props.lessons.map((lesson) => (
                          <option key={lesson.id} value={lesson.id}>
                            {lesson.title}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="getQuizButton"
                      onClick={this.getQuiz}
                    >
                      Edit quiz
                    </button>
                    <Button
                      color="danger"
                      onClick={this.deleteQuiz}
                      className="float-right"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Form>
                </CardBody>{" "}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card body>
                  <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th>#</th>
                        <th style={{ whiteSpace: "normal" }}>Prompt</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.quiz.questions.map((question, index) => (
                        <tr key={`question-${index}`}>
                          <th scope="row">{index + 1}</th>
                          <td style={{ whiteSpace: "normal" }}>
                            {question.prompt}
                          </td>
                          <td>
                            <Button
                              color="link"
                              id="setOptionsButton"
                              onClick={() => this.setOptions(question)}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3" className="pt-4">
            <Button
              color="danger"
              onClick={this.deleteQuestion}
              className="float-right"
            >
              <i className="fas fa-trash"></i>
            </Button>
            <Form className="mb-3" id="updatePromptForm">
              <FormGroup>
                <Label for="questionBox">Question</Label>
                <Input
                  type="textarea"
                  name="prompt"
                  id="questionBox"
                  defaultValue={this.state.question.prompt}
                />
                {/* <Input
                  type="text"
                  name="answer"
                  id="answerBox"
                  defaultValue={this.state.question.answer}
                  hidden
                /> */}
              </FormGroup>
              <FormGroup>
                <Label for="answer">Change Answer</Label>
                {this.state.question.answer ? (
                  <Input
                    type="select"
                    name="answer"
                    value={this.state.answer}
                    onChange={this.handleAnswerChange}
                  >
                    {this.state.question.options
                      ? this.state.question.options.map((option) => {
                          return (
                            <option key={option.id} value={option.id}>
                              {option.id}
                              {option.prompt}
                            </option>
                          );
                        })
                      : null}
                  </Input>
                ) : null}
              </FormGroup>
              <Button color="primary" onClick={this.updatePrompt}>
                Update Prompt
              </Button>
            </Form>
            <h3>OPTIONS</h3>
            <Form id="updateOptionsForm">
              <ol type="a">
                {this.state.options.map((option) => (
                  <FormGroup key={option.id}>
                    <li>
                      <Input
                        type="text"
                        data-id={option.id}
                        defaultValue={option.prompt}
                      />
                    </li>
                  </FormGroup>
                ))}
              </ol>
              {this.state.options.length > 0 ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.updateOptions}
                >
                  Update Options
                </button>
              ) : null}
            </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default EditQuiz;
