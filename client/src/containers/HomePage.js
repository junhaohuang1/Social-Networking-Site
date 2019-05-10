import React from "react";
import HomeForm from '../components/HomeForm.js';
import Friends from './friends.js'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <HomeForm/>
        <Friends/>
      </div>
    );
  }
}

export default HomePage;
