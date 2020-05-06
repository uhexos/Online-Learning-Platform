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
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  CustomInput,
  FormFeedback,
} from "reactstrap";
import classnames from "classnames";
import auth from "../auth";

export class CreateQuiz extends Component {
  state = {
    activeTab: "1",
    invalidName: false,
    invalidQuestion: false,
    activeLesson: "",
    activeQuestion: "",
    activeQuestionPrompt: "",
    options: [],
  };
  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  toggle = (tab) => {
    if (this.state.activeTab !== tab) this.setActiveTab(tab);
  };

  saveQuiz = (event) => {
    event.preventDefault();
    var formdata = new FormData();
    var name = document.getElementById("quizName").value;
    var lesson_id = document.getElementById("lesson").value;
    formdata.append("title", name);
    formdata.append("lesson", lesson_id);
    fetch("http://localhost:8000/api/quiz/", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => res.json())
      .then((res) => {
        if (res.id || res.lesson[0] === "This field must be unique.") {
          //this checks if the lesson already has a quiz and allows you add new questions to it despite the error.
          this.setState({ activeLesson: lesson_id });
          this.setActiveTab("2");
          document.getElementById("quizForm").reset();
        } else {
          this.setState({ invalidName: true });
        }
      });
  };
  saveQuestion = (event) => {
    event.preventDefault();
    var formdata = new FormData();
    var prompt = document.getElementById("question").value;
    formdata.append("prompt", prompt);
    fetch(
      `http://localhost:8000/api/quiz/${this.state.activeLesson}/questions/`,
      {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => res.json())
      .then((res) => {
        console.log(res.id);
        if (res.id) {
          this.setActiveTab("3");
          this.setState({ activeQuestion: res.id });
          this.setState({ activeQuestionPrompt: res.prompt });
          document.getElementById("questionForm").reset();
        } else {
          this.setState({ invalidQuestion: true });
        }
      });
  };
  saveAnswer = (event) => {
    event.preventDefault();
    var formdata = new FormData();
    var answer = document.getElementById("answer").value;
    formdata.append("answer", answer);
    fetch(
      `http://localhost:8000/api/quiz/${this.state.activeLesson}/questions/${this.state.activeQuestion}/`,
      {
        method: "PATCH",
        body: formdata,
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => res.json())
      .then((res) => {
        console.log(res.id);
        if (res.id) {
          this.setActiveTab("2");
          this.setState({ activeQuestion: res.id });
          this.setState({ activeQuestionPrompt: res.prompt });
          document.getElementById("answerForm").reset();
        } else {
          this.setState({ invalidQuestion: true });
        }
      });
  };
  saveOption = (event) => {
    event.preventDefault();
    // var optionAData = new FormData();
    // var optionBData = new FormData();
    // var optionCData = new FormData();
    // var optionDData = new FormData();

    var optionAData = {};
    var optionBData = {};
    var optionCData = {};
    var optionDData = {};

    var optionA = document.getElementById("optionA").value;
    var optionB = document.getElementById("optionB").value;
    var optionC = document.getElementById("optionC").value;
    var optionD = document.getElementById("optionD").value;

    // console.log('a',[optionA, optionB, optionC, optionD])
    optionAData["prompt"] = optionA;
    optionBData["prompt"] = optionB;
    optionCData["prompt"] = optionC;
    optionDData["prompt"] = optionD;

    // var formdata = [JSON.stringify(optionAData), JSON.stringify(optionBData), JSON.stringify(optionCData), JSON.stringify(optionDData)];
    var formdata = [optionAData, optionBData, optionCData, optionDData];
    console.log(JSON.stringify(formdata));
    fetch(
      `http://localhost:8000/api/quiz/${this.state.activeLesson}/questions/${this.state.activeQuestion}/options/`,
      {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "content-type": "application/json",
        },
      }
    )
      .then((res) => auth.checkLoginstatus(res))
      .then((res) => res.json())
      .then((res) => {
        console.log(res.id);
        if (res.length > 0) {
          this.setActiveTab("4");
          this.setState({ options: res });
          document.getElementById("optionForm").reset();
        } else {
          this.setState({ invalidQuestion: true });
        }
      });
  };

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
              Quiz name
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Create Question
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Create Options
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Answer
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Form id="quizForm" onSubmit={this.saveQuiz}>
                      <FormGroup>
                        <Label for="lesson">Choose lesson:</Label>
                        <CustomInput
                          type="select"
                          name="lesson"
                          id="lesson"
                          placeholder="Lesson 1 Quiz"
                          // invalid={this.state.invalidName}
                        >
                          <option value="">Choose a Lesson</option>
                          {this.props.lessons.map((lesson) => (
                            <option key={lesson.id} value={lesson.id}>
                              {lesson.title}
                            </option>
                          ))}
                        </CustomInput>
                      </FormGroup>
                      <FormGroup>
                        <Label for="name">Quiz Name:</Label>
                        <Input
                          type="text"
                          name="name"
                          id="quizName"
                          placeholder="Lesson 1 Quiz"
                          invalid={this.state.invalidName}
                        />
                        {this.state.invalidName ? (
                          <FormFeedback invalid="true">
                            Invalid name or the lesson already has a quiz
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Next >>
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Form id="questionForm" onSubmit={this.saveQuestion}>
                      <FormGroup>
                        <Label for="prompt">Question</Label>
                        <Input
                          type="text"
                          name="prompt"
                          id="question"
                          placeholder="What is js ?"
                        />
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Next >>
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Form  id="optionForm"onSubmit={this.saveOption}>
                      <FormGroup>
                        <Label for="prompt">Option A</Label>
                        <Input
                          type="text"
                          name="prompt"
                          id="optionA"
                          placeholder="What is js ?"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="prompt">Option B</Label>
                        <Input
                          type="text"
                          name="optionB"
                          id="optionB"
                          placeholder="What is js ?"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="prompt">Option C</Label>
                        <Input
                          type="text"
                          name="prompt"
                          id="optionC"
                          placeholder="What is js ?"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="prompt">Option D</Label>
                        <Input
                          type="text"
                          name="prompt"
                          id="optionD"
                          placeholder="What is js ?"
                        />
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Next >>
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <h3>{this.state.activeQuestionPrompt}</h3>
                    <ol>
                      {this.state.options.map((option) => (
                        <li type="A" key={option.id}>
                          {option.prompt}
                        </li>
                      ))}
                    </ol>
                    <Form id="answerForm"onSubmit={this.saveAnswer}>
                      <FormGroup>
                        <Label for="prompt">Answer</Label>
                        <Input type="select" name="answer" id="answer">
                          {this.state.options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.prompt}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default CreateQuiz;
