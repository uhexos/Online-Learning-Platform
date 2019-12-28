import React from 'react';
import './App.css';
import CoursesList from "./components/CoursesList";
import CourseDetail from "./components/CourseDetail";
import AdminNavbar from './components/AdminNavbar';
// import RegisterPage from './components/RegisterPage'
// import LoginPage from './components/LoginPage'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import ProfilePage from './components/ProfilePage'
import Profile from "./views/examples/Profile.jsx";
import NoMatch from './views/NoMatch'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Sidebar from './Sidebar'
import CoursePurchasePage from './views/CoursePurchasePage';
// core components
import SimpleFooter from "./components/SimpleFooter.jsx";
class App extends React.Component {

  render() {

    return (
      <div>
        <Router>
          {/* <AdminNavbar></AdminNavbar> */}
          <Switch>
            <Route path="/" exact={true} component={CoursesList} />
            {/* TODO redirect courses/id to courses/id/lesson/0 */}
            <Route path="/courses/" exact component={CoursesList} />
            <Route path="/courses/:id/purchase/" component={CoursePurchasePage} />
            <Route path="/courses/:id/lessons/:lid" component={CourseDetail} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="profile" component={Profile} /> */}
            <Route path="*" component={NoMatch} />
            
          </Switch>
          {/* <SimpleFooter /> */}
        </Router>
       
      </div>

    )

  }
}

export default App;
