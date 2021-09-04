import React from "react";
import logo from "../img/logo32.png";

export default function Navbar(props) {
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
              <button className="btn btn-outline-success mx-3" type="button"
            style={{width: 'calc(100% - 2rem)'}}
              onClick={() => {document.getElementById('fileUpload').click();}}>
                <i className="bi bi-box-arrow-in-down"></i> Import
              </button>
              <div>
                <input
                  style={{ display: "none"}}
                  type="file"
                  name="Import"
                  id="fileUpload"
                  accept=".json"
                  onChange={(e) => props.importJson(e)}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
