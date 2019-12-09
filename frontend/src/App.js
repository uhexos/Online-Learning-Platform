import React from 'react';
import './App.css';
import CoursesList from "./components/CoursesList";
import CourseDetail from "./components/CourseDetail";
import AdminNavbar from './components/AdminNavbar'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Sidebar from './Sidebar'
import routes from "./routes"
class App extends React.Component {

  render() {

    return (
      <div>
        <AdminNavbar></AdminNavbar>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={CoursesList} />
            <Route path="/courses/" exact component={CoursesList} />
            TODO make a auto update url when new lesson is visited
            <Route path="/courses/:id/lessons/:lid" component={CourseDetail} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </Router>
      </div>

    )

  }
}

export default App;
