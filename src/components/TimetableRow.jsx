import React from "react";
import "./TimetableRow.css";

export default function TimetableRow(props) {
  return (
    <tr>
      <td>
        <button
          className="btn btn-danger btn-sm d-flex justify-content-center align-items-center me-1"
          onClick={() => props.handleRemoveRow(props.dayIndex, props.rowIndex)}>
          <i className="bi-dash"></i>
        </button>
      </td>
      <td>
        <input
          style={{ width: 125 }}
          className="me-1 form-control"
          type="text"
          maxLength="12"
          placeholder="Name"
        />
      </td>
      {props.timetableRow.cells.map((cell, i) => (
        <td key={i} className="timeCell"></td>
      ))}
      <td>
        <button className="btn btn-danger ms-1">
          <i className="bi-trash"></i>
        </button>
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="hours">
        0 hrs
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="shifts">
        0 shifts
      </td>
    </tr>
  );
}
