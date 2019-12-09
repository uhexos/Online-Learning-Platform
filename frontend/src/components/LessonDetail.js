import React, { Component } from 'react'
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';

export class LessonDetail extends Component {
    createMarkup() {
        return { __html: this.props.lesson.content };
    }

    render() {
        if (!this.props.lesson) return null //this line
        return (
            <Card>
                {/* {console.log("lesson details",this.props.lesson)} */}
                <CardHeader>
                    <CardTitle>                    <h1>{this.props.lesson.title}</h1>
                    </CardTitle>
                </CardHeader>
                <CardBody >
                    {this.props.lesson.video ? (
                        <div>
                            <video key={this.props.lesson.id} className="embed-responsive " controls>
                                <source src={this.props.lesson.video} type="video/mp4"></source>
                            </video>
                            <br />
                            {console.log("lesson content", this.props.lesson)}
                        </div>
                    ) : null}
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </CardBody>
            </Card>
        )
    }
}

export default LessonDetail
