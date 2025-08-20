import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    let userId = 1; // Example userId, this could be dynamic based on your application logic
    let pathname = "/users/" + userId;
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to = {"/users/" + userId} >User 1</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;