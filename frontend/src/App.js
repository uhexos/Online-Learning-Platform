import React from 'react';
import './App.css';
import CoursesList from "./CoursesList";
import CourseDetail from "./CourseDetail";
import AdminNavbar from './AdminNavbar'
import RegisterPage from './RegisterPage'
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
            <Route path="/" exact={true} component={CoursesList}/>
            <Route path="/courses/" exact component={CoursesList}/>
            <Route path="/courses/:id" component={CourseDetail}/>
            <Route path="/register" component={RegisterPage}/>
          </Switch>
        </Router>
        {/* <CoursesList /> */}
      </div>
    )

  }
}

export default App;
