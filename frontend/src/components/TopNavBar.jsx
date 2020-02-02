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
  // NavbarText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { UserConsumer } from "../UserContext";
import auth from "../auth";

const TopNavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="lg">
        <NavbarBrand href="/">Courses</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <div className="navbar-collapse-header d-md-none">
              <NavItem>
                <Col className="collapse-close" xs="12">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggle}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </NavItem>
            </div>
            {/* both reactstrap and react router have a component called Navlink this is the format to use both correctly*/}
            <NavItem>
              <NavLink tag={RRNavLink} to="/courses/" onClick={toggle}>
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/courses/" onClick={toggle}>My Courses</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right onClick={toggle}>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UserConsumer>
              {(context) => (
                <>
                  {context.state.isLoggedIn ? (
                    <>
                      <NavItem>
                        <NavLink tag={RRNavLink} to="/admin" onClick={toggle}>Dashboard</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={RRNavLink} to="#" onClick={auth.logout}>Log Out</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={RRNavLink} to="/cart" onClick={toggle}><i className="ni ni-cart" />
                        </NavLink>
                      </NavItem>
                    </>
                  ) :
                    <>
                      <NavItem>
                        <NavLink tag={RRNavLink} to="/login" onClick={toggle}>Login</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={RRNavLink} to="/register" onClick={toggle}>Register</NavLink>
                      </NavItem>
                    </>}


                </>)}
            </UserConsumer>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavBar;
