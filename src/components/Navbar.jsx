import React from "react";
import logo from "../img/logo32.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Rostera Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          Rostera
        </a>
      </div>
    </nav>
  );
}
