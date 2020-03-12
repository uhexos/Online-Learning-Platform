import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
export class CoursePaginator extends Component {
    // state = { count: this.props.count, page_size: this.props.page_size, next: this.props.next, previous: this.props.next };
    makePageButtons = (count, page_size) => {
        let arr = [];
        let pages_num = Math.ceil(count / page_size);
        for (let i = 1; i <= pages_num; i++) {
            arr.push(<PaginationItem  key={i}>
                <PaginationLink href="#">{i}</PaginationLink>
            </PaginationItem>);
        }
        return arr;
    }
    render() {
        return (
            <Pagination aria-label="Page navigation example">
                {console.log(this.props.count,this.props.page_size)
                }
                <PaginationItem key="first">
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem key="previous">
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {this.makePageButtons(this.props.count, this.props.page_size)}
                <PaginationItem key="next">
                    <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem key="last">
                    <PaginationLink last href="#" />
                </PaginationItem>
            </Pagination>
        );
    }
}

export default CoursePaginator;
