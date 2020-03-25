import React, { Component } from 'react'
import Alert from "reactstrap/lib/Alert";

export class FormAlert extends Component {
  
    makeAlerts = (p) => {
        // p = json object containing our errors
        let messagesArray = []
        //convert json to js object 
        console.log("p is ", p )
        p = JSON.parse(p);
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                let message = `-> ${key}: ${p[key]}`;
                messagesArray.push(
                    <Alert
                        key={key}
                        color="warning"
                        className="shadow"
                        isOpen={this.props.visible}
                    >
                        <b>{message}</b>
                    </Alert>)
            }
        }
        // return an array so that react nows to render it
        return messagesArray
    }

    render() {
        return (
            <div>
                {this.makeAlerts(this.props.messageObject)}
            </div>
        )
    }
}

export default FormAlert
