import React, { Component } from 'react'
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export class AdvancedSearch extends Component {
    state = {isOpen:false}

    toggle = () => this.setState({isOpen:!this.state.isOpen});
    render() {
        return (
            <div>

                <Button color="primary" size="sm" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Options</Button>
                <Collapse isOpen={this.state.isOpen}>
                    <Card>
                        <CardBody>
                            Anim pariatur cliche reprehenderit,
                             enim eiusmod high life accusamus terry richardson ad squid. Nihil
                             anim keffiyeh helvetica, craft beer labore wes anderson cred
                             nesciunt sapiente ea proident.
          </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}

export default AdvancedSearch
