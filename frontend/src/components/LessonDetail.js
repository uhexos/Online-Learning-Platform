import React, { Component } from 'react'
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import { Spinner } from 'reactstrap';
import Helmet from 'react-helmet'

export class LessonDetail extends Component {
    createMarkup() {
        return { __html: this.props.lesson.content };
    }

    render() {
        if (!this.props.lesson) return <Spinner color="primary" size="lg"/> //this line puts a loading icon if no lesson yet 
        return (
            <Card>
                <Helmet>
                    <title>{"lesson " +this.props.lesson.id + ": " +this.props.lesson.title}</title>
                </Helmet>
                <CardBody className="shadow">
                    <CardTitle>
                        <h1>{this.props.lesson.title}</h1>
                    </CardTitle>
                    {this.props.lesson.video ? (
                        <div>
                            <video key={this.props.lesson.id} className="embed-responsive " controls>
                                <source src={this.props.lesson.video} type="video/mp4"></source>
                            </video>
                            <br />
                        </div>
                    ) : null}
                    <div dangerouslySetInnerHTML={this.createMarkup()} />
                </CardBody>
            </Card>
        )
    }
}

export default LessonDetail
