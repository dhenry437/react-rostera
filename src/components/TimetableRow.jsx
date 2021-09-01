import React, { useEffect, useState } from "react";
import "./TimetableRow.css";

export default function TimetableRow(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownOrigin, setMouseDownOrigin] = useState({x: null, y: null, value: null});

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    // cleanup this component
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (cellIndex, cellValue) => {
    setMouseDown(true);
    setMouseDownOrigin({x: cellIndex, y: props.rowIndex, value: cellValue});
  }

  const handleMouseUp = () => {
    setMouseDown(false);
    setMouseDownOrigin({x: null, y: null, value: null});
  }

  const handleMouseOver = (cellIndex) => {
    if (mouseDown) {
      const min = Math.min.apply(null, [mouseDownOrigin.x, cellIndex]);
      const max = Math.max.apply(null, [mouseDownOrigin.x, cellIndex]);
      for (let i = min; i < max; i++) {
        props.setCellHighlight(props.dayIndex, props.rowIndex, i, mouseDownOrigin.value ? 0 : 1)
      }
    }
  }

  return (
    <tr>
      <td>
        <button
          className="btn btn-danger btn-sm d-flex justify-content-center align-items-center me-1"
          onClick={() => props.handleRemoveRow(props.dayIndex, props.rowIndex)}>
          <i className="bi-dash" style={{ fontSize: "1.25em" }}></i>
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
          onMouseDown={() => handleMouseDown(cellIndex, cell)}
          onClick={() => props.toggleCell(props.dayIndex, props.rowIndex, cellIndex)}
          onMouseOver={() => handleMouseOver(cellIndex)}
          ></td>
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
