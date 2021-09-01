import React from "react";
import "./TimetableRow.css";

export default function TimetableRow(props) {
  return (
    <tr>
      <td>
        <button
          className="btn btn-danger btn-sm d-flex justify-content-center align-items-center me-1"
          onClick={() => props.handleRemoveRow(props.dayIndex, props.rowIndex)}>
          <i className="bi-dash" style={{fontSize: "1.25em"}}></i>
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
      {props.timetableRow.cells.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className={`timeCell ${cell === 1 ? "highlighted" : ""}`}
          onClick={() =>
            props.handleToggleCell(props.dayIndex, props.rowIndex, cellIndex)
          }></td>
      ))}
      <td>
        <button
          className="btn btn-danger ms-1"
          onClick={() => props.handleClearRow(props.dayIndex, props.rowIndex)}>
          <i className="bi-trash"></i>
        </button>
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="hours">
        {props.getRowHours(props.dayIndex, props.rowIndex)} hrs
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="shifts">
        {props.getRowShifts(props.dayIndex, props.rowIndex)} shifts
      </td>
    </tr>
  );
}
