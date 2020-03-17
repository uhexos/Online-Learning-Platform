import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
export class CoursePaginator extends Component {
    state = { url: null };
    makePageButtons = pages_num => {
        console.log(pages_num);
        let arr = [];
        // extract the current url structure so we preserve user setting like category etc during pagination.
        // console.log('choices', this.state.url)
        // let url = this.props.next_page?new URL(this.props.next_page):new URL(this.props.previous_page);
        let url = new URL(this.state.url);
        // produce urls based on the link structure
        for (let i = 1; i <= pages_num; i++) {
            url.searchParams.set("page", i);
            arr.push(
                <PaginationItem key={i}>
                    <PaginationLink href={url.href} onClick={this.getItems}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return arr;
    };
    componentDidMount() {
        // console.log('mount', this.props.next_pageZ)
        this.setState({ url: this.props.next_page });
    }

    getItems = e => {
        e.preventDefault();
        let url = e.currentTarget.href;
        fetch(`${url}`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(
                result => {
                    this.props.updateItems("items", result.results);
                    this.props.updateItems("count", result.count);
                    this.props.updateItems("page_size", result.results.length);
                    this.props.updateItems("next_page", result.next);
                    this.props.updateItems("previous_page", result.previous);

                    this.setState({
                        showSearchSpinner: false
                    });
                }
                // Note: it's important to handle errors here
            );
    };
    render() {
        return (
            <>
                {this.state.url ? (
                    <Pagination aria-label="Page navigation example">
                        {/* <PaginationItem key="first">
                <PaginationLink first href={this.props.next_page} onClick={this.getItems}/>
            </PaginationItem> */}
                        {this.props.previous_page ? (
                            <PaginationItem key="previous">
                                <PaginationLink
                                    previous
                                    href={this.props.previous_page}
                                    onClick={this.getItems}
                                />
                            </PaginationItem>
                        ) : (
                                <PaginationItem key="previous">
                                    <PaginationLink
                                        previous
                                        href="#"
                                        onClick={this.getItems}
                                    />
                                </PaginationItem>
                            )}
                        {this.state.url ? this.makePageButtons(this.props.number) : null}
                        {this.props.next_page ? (
                            <PaginationItem key="next">
                                <PaginationLink
                                    next
                                    href={this.props.next_page}
                                    onClick={this.getItems}
                                />
                            </PaginationItem>
                        ) : (
                                <PaginationItem key="next">
                                    <PaginationLink
                                        next
                                        href="#"
                                        onClick={this.getItems}
                                    />
                                </PaginationItem>
                            )}

                        {/* <PaginationItem key="last">
                <PaginationLink last href="#" />
            </PaginationItem> */}
                    </Pagination>
                ) : null}
            </>
        );
    }
}

export default CoursePaginator;
