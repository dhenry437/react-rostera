import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import "./TimetableRow.css";

export default function TimetableRow(props) {
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownOrigin, setMouseDownOrigin] = useState({
    x: null,
    y: null,
    value: null,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [prevCellStates, setPrevCellStates] = useState();

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    // cleanup this component
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (cellIndex, cellValue) => {
    setMouseDown(true);
    setMouseDownOrigin({ x: cellIndex, y: props.rowIndex, value: cellValue });
    setPrevCellStates([ ... props.timetableRow.cells]);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setMouseDownOrigin({ x: null, y: null, value: null });
    setPrevCellStates(null);
  };

  const handleMouseOver = cellIndex => {
    if (mouseDown) {
      const min = Math.min.apply(null, [mouseDownOrigin.x, cellIndex]);
      const max = Math.max.apply(null, [mouseDownOrigin.x, cellIndex]);

      for (let i = min; i <= max; i++) {
        props.setCellHighlight(
          props.dayIndex,
          props.rowIndex,
          i,
          mouseDownOrigin.value ? 0 : 1
        );
      }

      // Set all other cells back to their original state
      for (let i = 0; i < min; i++) {
        if (props.timetableRow.cells[i] !== prevCellStates[i]) {
          props.setCellHighlight(
            props.dayIndex,
            props.rowIndex,
            i,
            prevCellStates[i]
          );
        }
      }
      for (let i = max + 1; i < 24 * 4; i++) {
        if (props.timetableRow.cells[i] !== prevCellStates[i]) {
          props.setCellHighlight(
            props.dayIndex,
            props.rowIndex,
            i,
            prevCellStates[i]
          );
        }
      }
    }
  };

  const escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return props.getUniqueNames(value).filter(name => regex.test(name));
  };

  const getSuggestionValue = suggestion => {
    return suggestion;
  };

  const renderSuggestion = suggestion => {
    return <span>{suggestion}</span>;
  };

  const onSuggestionsFetchRequested = () => {
    setSuggestions(getSuggestions(props.timetableRow.name));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue, method }) => {
    props.handleNameInputChange(newValue, props.dayIndex, props.rowIndex);
  };

  const inputProps = {
    placeholder: "Name",
    className: "me-1 form-control",
    style: { width: 125 },
    value: props.timetableRow.name,
    onChange: onChange,
  };

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
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </td>
      {props.timetableRow.cells.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className={`timeCell ${cell === 1 ? "highlighted" : ""}`}
          onMouseDown={() => handleMouseDown(cellIndex, cell)}
          onClick={() =>
            props.toggleCell(props.dayIndex, props.rowIndex, cellIndex)
          }
          onMouseOver={() => handleMouseOver(cellIndex)}></td>
      ))}
      <td>
        <button
          className="btn btn-danger ms-1"
          onClick={() => props.handleClearRow(props.dayIndex, props.rowIndex)}>
          <i className="bi-trash"></i>
        </button>
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="hours">
        {props.getRowHours(props.dayIndex, props.rowIndex)}<br/>hours
      </td>
      <td style={{ textAlign: "center" }} className="ps-1" id="shifts">
        {props.getRowShifts(props.dayIndex, props.rowIndex)}<br/>shifts
      </td>
    </tr>
  );
}
