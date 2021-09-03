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
        <div className="btn-group">
          <button
            type="button"
            className="no-style"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i style={{ fontSize: "1.6em" }} className="bi bi-gear-fill"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                Action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
