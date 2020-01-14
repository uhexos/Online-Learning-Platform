import React from 'react';
import './App.css';
import CoursesList from "./components/CoursesList";
import CourseDetail from "./components/CourseDetail";
// import AdminNavbar from './components/AdminNavbar';
// import RegisterPage from './components/RegisterPage'
// import LoginPage from './components/LoginPage'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import Admin from './views/Admin'
import ProfilePage from './components/ProfilePage'
import NoMatch from './views/NoMatch'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import Sidebar from './Sidebar'
import CoursePurchasePage from './views/CoursePurchasePage';
import { UserProvider } from './UserContext';
// core components
// import SimpleFooter from "./components/SimpleFooter.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  updateValue = (val) => {
    this.setState({ user: val });
    // console.log("updated user",this.state.user)
  }
  render() {
    return (
      <UserProvider value={{state:this.state,updateValue: this.updateValue,}}>
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
              <Route path="/admin" component={Admin} />
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
