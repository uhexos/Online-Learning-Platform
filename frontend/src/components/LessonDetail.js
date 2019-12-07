import React, { Component } from 'react'

export class LessonDetail extends Component {
    createMarkup() {
        return {__html: this.props.lesson.content};
      }

    render() {
        if (!this.props.lesson) return null //this line
        return (
            <div>
                {/* {console.log("lesson details",this.props.lesson)} */}

                <h1>{this.props.lesson.title}</h1>
                <video key={this.props.lesson.id} className="embed-responsive "controls>
                    {console.log("video url",this.props.lesson.video)}
                    <source src={this.props.lesson.video} type="video/mp4"></source>
                </video>
                <br/>
                <div dangerouslySetInnerHTML={this.createMarkup()}/>
            </div>
        )
    }
}

export default LessonDetail
