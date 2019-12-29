import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export class AddLesson extends Component {
    render() {
        return (
            <div style={{width:"70%", marginLeft:"50px"}}>
                <h2>Add a lesson</h2>
                <Form>
                    <FormGroup style={formGroup}>
                        <Input type="text" name="lessonTitle" />
                        <span>Enter lesson title</span> 
                    </FormGroup>
                    <FormGroup style={formGroup}>
                        <Input type="file" name="lessonVideo" />
                        <span>Choose course video if any</span>
                    </FormGroup>
                    <span>Content</span>
                    <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
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
                        <Input type="textarea" name="text" id="exampleText" />
                        </Col>
                        <span style={{marginLeft:"15px"}}>Enter a brief description of the lesson</span>
                    </FormGroup>
                    <Button type="submit">Post</Button>
                </Form>
            </div>
        )
    }
}

const formGroup = {
    marginBottom:"30px"
}
export default AddLesson;
