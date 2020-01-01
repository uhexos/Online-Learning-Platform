import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export class AddLesson extends Component {
    state = {"lessonContent":null};
    saveLesson = () =>{
        const fileField = document.querySelector('input[type="file"]');
        const formData = new FormData();

        let title = document.getElementById("lessonTitle").value;
        // let video = document.getElementById("lessonVideo").value;
        let content = this.state.lessonContent;
        let description = document.getElementById("lessonDescription").value;
        // console.log("*************",{content,video,title,description});
        formData.append("title", title);
        formData.append("video", fileField.files[0],fileField.files[0].name);
        formData.append("content", content);
        formData.append("description", description);
        fetch(`http://localhost:8000/api/courses/${this.props.match.params.id}/lessons/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      }
    }).then(res => {
      if (res.ok) {
        this.setState({ visible: true });
      }
      return res.json();
    });
    }
    
    render() {
        return (
            <div style={{width:"70%", marginLeft:"50px"}}>
                <h2>Add a lesson</h2>
                <Form>
                    <FormGroup style={formGroup}>
                        <Input type="text" name="title" id="lessonTitle" />
                        <span>Enter lesson title</span> 
                    </FormGroup>
                    <FormGroup style={formGroup}>
                        <Input type="file" name="video" id="lessonVideo" />
                        <span>Choose course video if any</span>
                    </FormGroup>
                    <span>Content</span>
                    <CKEditor id="lessonContent"
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            this.setState({lessonContent:data});
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />

                    <FormGroup row style={{marginTop:"50px"}}>
                        <Col sm={12}>
                        <Input type="textarea" name="text" id="lessonDescription" />
                        </Col>
                        <span style={{marginLeft:"15px"}}>Enter a brief description of the lesson</span>
                    </FormGroup>
                    <Button color="primary" type="submit" onClick={this.saveLesson}>Post</Button>
                </Form>
            </div>
        )
    }
}

const formGroup = {
    marginBottom:"30px"
}
export default AddLesson;
