class Auth {
  checkLoginstatus = (response) => {
    // TODO refactor this fucntion using https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#handle-response-js
    // to build a more robust solution
    if (!response.ok) {
      if (parseInt(response.status)===401) {
        this.logout()
      } else if (parseInt(response.status)===403) {
        window.open("/nopermission","_self")
      }
    }
    return response;
  }
  logout() {
    // TODO redirect to sign out page
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    window.location.reload();
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
