import React from 'react';
import './App.css';
import CoursesList from "./components/CoursesList";
import MyCourses  from "./components/MyCourses";
import CourseDetail from "./components/CourseDetail";
import Homepage from "./components/Homepage";
import Checkout from "./components/Checkout";
// import AdminNavbar from './components/AdminNavbar';
// import RegisterPage from './components/RegisterPage'
// import LoginPage from './components/LoginPage'
import Login from './views/Login'
import Register from './views/Register'
// import Dashboard from './views/Dashboard' //removing this breaks the admin side so don't
import Admin from './views/Admin'
import ProfilePage from './components/ProfilePage'
import NoMatch from './views/NoMatch'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Sidebar from './Sidebar'
import CoursePurchasePage from './views/CoursePurchasePage';
import { UserProvider } from './UserContext';
import { ProtectedRoute } from './protected.route';
// core components
// import SimpleFooter from "./components/SimpleFooter.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    // if a user object already exists use that one instead otherwise set as empty 
    this.state = {
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {},
      isLoggedIn: localStorage.getItem('user') ? true : false,
    };
  }
  updateValue = (key, val) => {
    this.setState({ [key]: val });
  }
  render() {
    return (
      <UserProvider value={{ state: this.state, updateValue: this.updateValue, }}>
        <div>
          <Router>
            {/* <AdminNavbar></AdminNavbar> */}
            <Switch>
              <Route path="/" exact component={Homepage} />
              {/* <Route path="/" exact={true} component={CoursesList} /> */}
              {/* TODO redirect courses/id to courses/id/lesson/0 */}
              <Route path="/courses/" exact component={CoursesList} />
              <ProtectedRoute path="/mycourses/" exact component={MyCourses} />
              <Route path="/courses/purchase/:id" component={CoursePurchasePage} />
              <ProtectedRoute path="/courses/:id/lessons/:lid" component={CourseDetail} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={ProfilePage} />
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <ProtectedRoute path="/admin" component={Admin} />
              <ProtectedRoute path="/cart" component={Checkout} />
              <Route path="*" component={NoMatch} />

            </Switch>
            {/* <SimpleFooter /> */}
          </Router>

        </div>
      </UserProvider>


    )

  }
}

export default App;
