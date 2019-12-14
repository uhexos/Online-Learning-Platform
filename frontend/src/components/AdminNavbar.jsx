import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Button
  // NavbarText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
const AdminNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="lg">
        <NavbarBrand href="/">Courses</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isOpen ? (
              <NavItem>
                <Col className="text-right" >
                  <Button
                    color="danger"
                    size="sm"
                    aria-expanded={isOpen}
                    className=""
                    onClick={toggle}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </Button>
                </Col>
              </NavItem>
            ) : null}

            <NavItem>
              <NavLink tag={RRNavLink} to="/courses/">
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">My Courses</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
