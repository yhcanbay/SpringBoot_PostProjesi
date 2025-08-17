import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    let userId = 1; // Example userId, this could be dynamic based on your application logic
    let pathname = " /users/ " + userId;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to = {pathname} >User 1</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;