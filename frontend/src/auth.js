class Auth {

  checkLoginstatus = (response) => {
    // TODO refactor this fucntion using https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#handle-response-js
    // to build a more robust solution
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        console.log('logout done')
        this.logout();
        window.location.reload();
    
      }
    }
    return response;
  }
  logout() {
    localStorage.removeItem('token')
  }

  isAuthenticated() {
    this.authenticated = localStorage.getItem('token') ? true : false
    return this.authenticated;
  }
  render() {
    return null
  }
}

export default new Auth();
//   TODO introduce context api
