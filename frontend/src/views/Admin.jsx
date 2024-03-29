import React, { Component } from 'react'
import {  Switch } from "react-router-dom";
import Container from 'reactstrap/lib/Container';
import AddLesson from './AddLesson';
import Index from "./Index.jsx";
import AddCourse from '../components/AddCourse';
import AddCategory from '../components/AddCategory';
import Profile from "../components/ProfilePage";
import TutorCourses from "../components/TutorCourses";
import NoMatch from './NoMatch';
import CategoryList from '../components/CategoryList';
import CategoryDetail from '../components/CategoryDetail';
import { UserConsumer } from '../UserContext';
import { ProtectedRoute } from '../protected.route';

import "../assets/vendor/nucleo/css/nucleo.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/scss/argon-dashboard-react.scss";

// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import AdminFooter from "../components/Footers/AdminFooter.jsx";
import Sidebar from '../components/Sidebar/Sidebar';
import EditTutorCourses from '../components/EditTutorCourses';
import EditCourseLesson from '../views/EditCourseLesson';
import { Helmet } from "react-helmet";

export class Admin extends Component {
    // this is the homepage for the admin section
    // it is also the dashboard
    
    render() {
        // these get rendered in the sidebar 
        let routes = [
            {
                path: "/",
                name: "Dashboard",
                icon: "ni ni-tv-2 text-primary",
                component: Index,
                layout: "/admin"
            },
            {
                path: "/courses",
                name: "View Courses",
                icon: "ni ni-pin-3 text-orange",
                component: TutorCourses,
                layout: "/admin"
            },
            {
                path: "/courses/new",
                name: "Create Course",
                icon: "ni ni-planet text-blue",
                component: AddCourse,
                layout: "/admin"
            },

            {
                path: "/profile",
                name: "User Profile",
                icon: "ni ni-single-02 text-yellow",
                component: Profile,
                layout: "/admin"
            },
        ];
        return (
            <div>
                <Helmet>
                    <title>Admin</title>
                </Helmet>
                <div>
                    <UserConsumer>
                        {(context) => (
                        <AdminNavbar
                            {...this.props}
                            brandText=""
                            context={context}
                        />)}
                    </UserConsumer>

                    <Sidebar
                        {...this.props}
                        routes={routes}
                        logo={{
                            innerLink: "/",
                            imgSrc: require("../assets/img/brand/argon-react.png"),
                            imgAlt: "..."
                        }}
                    />
                    <div className="main-content" ref="mainContent">
                        <Container fluid>
                            <Switch>
                                <ProtectedRoute path="/admin/profile" exact component={Profile} />
                                <ProtectedRoute path="/admin/courses" exact component={TutorCourses} />
                                <ProtectedRoute path="/admin" exact component={Index}  />
                                <ProtectedRoute path="/admin/courses/new" component={AddCourse} />
                                <ProtectedRoute path="/admin/courses/:id/lessons/new" component={AddLesson} />
                                <ProtectedRoute path="/admin/courses/:id/edit" component={EditTutorCourses} />
                                <ProtectedRoute path="/admin/courses/:id/lesson/:lid/edit" component={EditCourseLesson} />
                                <ProtectedRoute path="/admin/categories" exact component={CategoryList} />
                                <ProtectedRoute path="/admin/categories/new" exact component={AddCategory} />
                                <ProtectedRoute path="/admin/categories/:id" component={CategoryDetail} />
                                <ProtectedRoute path="*" component={NoMatch} />
                            </Switch>
                            <AdminFooter />
                        </Container>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin
