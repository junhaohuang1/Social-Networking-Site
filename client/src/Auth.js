class Auth {



   /**
    * Get a token value.
    *
    * @returns {string}
    */

  static checkUserLoggedIn(){
    return localStorage.getItem('user')
  }

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} user
   */
  static authenticateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('user') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('user');
  }



}

export default Auth;
