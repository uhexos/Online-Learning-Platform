// doesnt work at at fix this mess

import React, { Component } from 'react'
import Container from 'reactstrap/lib/Container'
import { Row, Col, Table, Button } from 'reactstrap'
import AdminNavbar from './TopNavBar'
import auth from '../auth'
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
const config = {
    txref: "",
    customer_email: "",
    amount: 0,
    PBFPubKey: "FLWPUBK_TEST-8916fcc2b01e16ac3eb7d38fb4c9872c-X",
    meta: [{
        metaname: "cart",
        metavalue: ""
    }],
    onSuccess: () => { },
    onClose: () => { }
};
export class Checkout extends Component {
    state = { cart: { items: [] }, total: 0, config: {} }
    componentDidMount() {
        fetch("http://localhost:8000/api/cart/", {
            method: "GET",
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => res.json())
            .then(res => {
                this.setState({ cart: res });
                this.getTotalPrice()
                let user = JSON.parse(localStorage.getItem('user'));
                console.log(this.state.cart.items);
                config.txref = `cart-${this.state.cart.id}-${user.id}`;
                config.customer_email = user.email;
                config.amount = this.state.total
                config.meta[0].metavalue = this.state.cart.id;
                config.onSuccess = () => this.verifyCheckout();
                this.setState({ config: config })
            })

    }
    getTotalPrice = () => {
        let tmpPrice = 0.0;
        this.state.cart.items.map(item => tmpPrice += parseFloat(item.course.price));
        this.setState({ total: tmpPrice });
    }
    deleteItem = (id) => {
        console.log("deleting", id)
        fetch(`http://localhost:8000/api/cart/item/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => {
                if (res.ok) {
                    const cart = { ...this.state.cart }
                    const items = this.state.cart.items.filter(item => item.id !== id);
                    cart.items = items;
                    // console.log("deleted",cart)
                    // console.log("undeleted",this.state.cart.items)
                    this.setState({ cart: cart });
                    this.getTotalPrice();
                }
            })
    }
    verifyCheckout = () => {
        let formData = new FormData()
        formData.append('txref', this.state.config.txref)
        fetch("http://localhost:8000/api/cart/verify/", {
            method: 'post',
            body: formData,
            headers: {
                authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => auth.checkLoginstatus(res))
            .then(res => console.log("enrolled success"))
    }

    render() {
        return (
            <div>
                <AdminNavbar />
                <Container className="pt-2">
                    {console.log(this.state)}
                    <Row>
                        <Col lg="8" mb="5" className="p-5 bg-white rounded shadow">
                            {/* <!-- Shopping cart table --> */}
                            <Table responsive>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="p-2 px-3 text-uppercase">Product</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Price</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Quantity</div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase">Remove</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cart.items.map((item, index) => (
                                            <tr key={item.id}>
                                                {/* {this.state.cart.total += item.course.price} */}
                                                <th scope="row" className="border-0">
                                                    <Row className="p-2">
                                                        <img src={item.course.thumbnail} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                                        <div className="ml-3 d-inline-block">
                                                            <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{item.course.title}</a></h5>
                                                        </div>
                                                    </Row>
                                                </th>
                                                <td className="align-middle"><strong>${item.course.price}</strong></td>
                                                {/* TODO fix these to do the neccessary patch on change and delete on click */}
                                                <td className="align-middle"><strong>1</strong></td>
                                                <td className="align-middle"><Button color="link" className="text-danger" onClick={() => this.deleteItem(item.id)}><i className="fa fa-trash"></i></Button></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </Table>
                            {/* <!-- End --> */}
                        </Col>

                        <Col lg="4">
                            <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                            <div className="p-4">
                                <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${this.state.total}</strong></li>
                                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10.00</strong></li> */}
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0.00</strong></li>
                                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                        <h5 className="font-weight-bold">${this.state.total}</h5>
                                    </li>
                                </ul>
                                {/* <a href="#" className="btn btn-dark rounded-pill py-2 btn-block" onClick={this.completeCheckout}>Procceed to checkout</a> */}
                                <RaveProvider {...this.state.config}>
                                    <RavePaymentButton className="btn btn-dark rounded-pill py-2 btn-block">Pay</RavePaymentButton>
                                </RaveProvider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Checkout
