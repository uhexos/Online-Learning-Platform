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
  render() {
    return (
      <div>
        <Card className="mt-2">
          <CardBody>
            <CardTitle>Quiz: {this.props.quiz.title}</CardTitle>
            <Form>
              {this.props.quiz.questions.map((question, index) => (
                <FormGroup key={`q-${question.id}`}>
                  <p>
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
                </FormGroup>
              ))}
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Quiz;
