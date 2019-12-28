import React from 'react';
import { Route, Switch } from "react-router-dom";

//reactstrap components
import { Container } from "reactstrap";


import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/argon-dashboard-react.scss";

// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import AdminFooter from "../components/Footers/AdminFooter.jsx";
import Sidebar from '../components/Sidebar/Sidebar';

import AdminLayout from "../layouts/Admin.jsx";
import AuthLayout from "../layouts/Auth.jsx";

import routes from '../routes2.js'

class Dashbaord extends React.Component{
    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
      }
      
    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/admin") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };

      getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
          if (
            this.props.location.pathname.indexOf(
              routes[i].layout + routes[i].path
            ) !== -1
          ) {
            return routes[i].name;
          }
        }
        return "Brand";
      };
    render(){
        return(
            <div>
              <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
                <Sidebar
                    {...this.props}
                    routes={routes}
                    logo={{
                        innerLink: "/admin/index",
                        imgSrc: require("../assets/img/brand/argon-react.png"),
                        imgAlt: "..."
                    }}
                />
                <div className="main-content" ref="mainContent">
          
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
            </div>
        )
    }
}
export default Dashbaord;