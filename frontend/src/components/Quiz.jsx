import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export class Quiz extends Component {
  state = { revealAnswers: false };
  markQuiz = () => {
    let a = Array.from(
      document.querySelectorAll("input[type=radio]:checked")
    ).map((option) => {
      console.log("option", option.label);
      if (
        option.value ==
        this.props.quiz.questions.find((question) => {
          return question.id == option.name;
        }).answer
      ) {
        //   console.log(document.querySelector(`label[for=option-${option.value}]`));
        document.querySelector(
          `label[for=option-${option.value}]`
        ).style.color = "green";
      } else {
        document.querySelector(
          `label[for=option-${option.value}]`
        ).style.color = "red";
      }
      this.setState({ revealAnswers: true });
      return (
        option.value ==
        this.props.quiz.questions.find((question) => {
          return question.id == option.name;
        }).answer
      );
    });
    console.log("a is", a);
  };
  render() {
    return (
      <div>
        <Card className="mt-2">
          <CardBody>
            <CardTitle>Quiz: {this.props.quiz.title}</CardTitle>
            <Form>
              {this.props.quiz.questions.map((question, index) => (
                <FormGroup key={`q-${question.id}`}>
                  <p style={{ "font-weight": "bold" }}>
                    ({index + 1}) {question.prompt}
                  </p>
                  {question.options.map((option) => (
                    <div key={`option-${option.id}`}>
                      <input
                        type="radio"
                        id={`option-${option.id}`}
                        name={question.id}
                        value={option.id}
                      />
                      <Label className="ml-2" for={`option-${option.id}`}>
                        {option.prompt}
                      </Label>
                    </div>
                  ))}

                  {this.state.revealAnswers ? (
                    <p style={{ "font-weight": "bold",color:"green" }}>
                      Answer:{" "}
                      {question.answer
                        ? question.options.find(
                            (option) => option.id === question.answer
                          ).prompt
                        : "No answer provided"}
                    </p>
                  ) : null}
                </FormGroup>
              ))}
            </Form>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.markQuiz}
            >
              Mark quiz
            </button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Quiz;
