import React from 'react';
import {Link} from 'react-router-dom';


const NavBarForm = (props) => {
console.log("NavBarForm props", props)
  return (
  <nav className="navbar navbar-default">
    <div className="navbar-header">
        <Link className="navbar-brand" to="/">Research Network</Link>
      {props.loggedIn ? (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/profile" onClick={props.getProfile}>Edit Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" onClick={props.logout} >Log out</Link>
          </li>
          <li className="nav-item">
            {props.modalButton}
          </li>
          <li className="nav-item">
            {props.friendSearchButton}
          </li>
        </ul>
      ) : (
        <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/login">Log in</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup">Sign up</Link>
        </li>
        </ul>
      )}
    </div>
  </nav>
);
};


export default NavBarForm;
