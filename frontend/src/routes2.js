/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Original by creative tim. Modified Code by Ugo & Johnson

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.jsx";
import Profile from "./views/examples/Profile.jsx";
// import Maps from "./views/examples/Maps.jsx";
// import Register from "./views/examples/Register.jsx";
// import Login from "./views/examples/Login.jsx";
// import Tables from "./views/examples/Tables.jsx";
// import Icons from "./views/examples/Icons.jsx";
// import ProfilePage from "./components/ProfilePage.jsx";
import AddCourse from "./components/AddCourse";
import TutorCourses from "./components/TutorCourses";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/dashboard"
  },
  {
    path: "/course/new",
    name: "Add Course",
    icon: "ni ni-planet text-blue",
    component: AddCourse,
    layout: "/dashboard"
  },
  {
    path: "/courses",
    name: "My Courses",
    icon: "ni ni-pin-3 text-orange",
    component: TutorCourses,
    layout: "/dashboard"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/dashboard"
  }
  // {
  //   path: "/courses/:id/lesson/new",
  //   name: "Add Lessons",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: AddLesson,
  //   layout: "/dashboard"
  // }
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
