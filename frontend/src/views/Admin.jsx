import React, { Component } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Route, Switch } from "react-router-dom";
import Container from 'reactstrap/lib/Container';
import AddLesson from './AddLesson';
import Index from "./Index.jsx";
import AddCourse from '../components/AddCourse';
import AddCategory from '../components/AddCategory';
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminFooter from "../components/Footers/AdminFooter";
import Profile from "../components/ProfilePage";
import TutorCourses from "../components/TutorCourses";
import NoMatch from './NoMatch';
import CategoryList from '../components/CategoryList';
import CategoryDetail from '../components/CategoryDetail';

export class Admin extends Component {

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
                name: "My Courses",
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
                <div>
                    <AdminNavbar
                        {...this.props}
                        brandText=""
                    />
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
                                <Route path="/admin" exact component={Index} />
                                <Route path="/admin/profile" exact component={Profile} />
                                <Route path="/admin/courses" exact component={TutorCourses} />
                                <Route path="/admin/courses/new" component={AddCourse} />
                                <Route path="/admin/courses/:id/lessons/new" component={AddLesson} />
                                <Route path="/admin/categories" exact component={CategoryList} />
                                <Route path="/admin/categories/new" exact component={AddCategory} />
                                <Route path="/admin/categories/:id"  component={CategoryDetail} />
                                
                                <Route path="*" component={NoMatch} />
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
