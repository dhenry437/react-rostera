import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TimetableRow from "./components/TimetableRow";
import SummaryTable from "./components/SummaryTable";

export default function App() {
  const initialDays = [
    {
      name: "Monday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Tuesday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Wednesday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Thursday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Friday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Saturday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
    {
      name: "Sunday",
      timetable: [
        {
          name: "",
          cells: [...Array(96).keys()].map(i => 0),
        },
      ],
    },
  ];

  const [days, setDays] = useState(initialDays);

  const resetDays = () => {
    setDays(initialDays);
  };

  // Load data from local storage
  useEffect(() => {
    const days = localStorage.getItem("days");
    if (days) setDays([...JSON.parse(days)]);
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("days", JSON.stringify(days));
  }, [days]);

  const toggleCell = (dayIndex, rowIndex, cellIndex) => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable[rowIndex].cells[cellIndex] === 0
      ? (tmpDays[dayIndex].timetable[rowIndex].cells[cellIndex] = 1)
      : (tmpDays[dayIndex].timetable[rowIndex].cells[cellIndex] = 0);
    setDays([...tmpDays]);
  };

  // Takes an parameter value being 0 or 1 (unhighlighted or highlighted)
  const setCellHighlight = (dayIndex, rowIndex, cellIndex, value) => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable[rowIndex].cells[cellIndex] = value;
    setDays([...tmpDays]);
  };

  // Generic change handler.
  const handleNameInputChange = (value, dayIndex, rowIndex) => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable[rowIndex].name = value;
    setDays([...tmpDays]);
  };

  const handleClearRow = (dayIndex, rowIndex) => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable[rowIndex].cells = [...Array(96).keys()].map(
      i => 0
    );
    setDays([...tmpDays]);
  };

  const handleAddRow = dayIndex => {
    let tmpDays = [...days];
    const timetableRow = { name: "", cells: [...Array(96).keys()].map(i => 0) }; // Generate state for blank row
    tmpDays[dayIndex].timetable.push(timetableRow);
    setDays([...tmpDays]);
  };

  const handleRemoveRow = (dayIndex, rowIndex) => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable.splice(rowIndex, 1);
    setDays([...tmpDays]);
  };

  const handleClearAllRows = dayIndex => {
    let tmpDays = [...days];
    tmpDays[dayIndex].timetable.forEach(
      tt => (tt.cells = [...Array(96).keys()].map(i => 0))
    );
    setDays([...tmpDays]);
  };

  const getRowHours = (dayIndex, rowIndex) => {
    return (
      days[dayIndex].timetable[rowIndex].cells.reduce((a, b) => a + b, 0) / 4
    );
  };

  const getRowShifts = (dayIndex, rowIndex) => {
    let shiftCount = 0;
    let inShift = false;
    days[dayIndex].timetable[rowIndex].cells.forEach(cell => {
      if (!inShift && cell) {
        inShift = true;
        shiftCount += 1;
      } else if (!cell) inShift = false;
    });
    return shiftCount;
  };

  const getDayHours = dayIndex => {
    let dayHours = 0;
    const tmpDays = [...days];
    tmpDays[dayIndex].timetable.forEach(
      tt => (dayHours += tt.cells.reduce((a, b) => a + b, 0) / 4)
    );
    return dayHours;
  };

  const getUniqueNames = value => {
    let uniqueNames = [];
    days.forEach(day => {
      day.timetable.forEach(tt => {
        if (tt.name.trim() !== "") {
          if (!uniqueNames.includes(tt.name.trim())) {
            uniqueNames.push(tt.name.trim());
          }
        }
      });
    });
    return uniqueNames.filter(name => name !== value);
  };

  const importJson = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const data = reader.result;
      if (!validateObjectSchema(data)) {
        alert("Invalid data");
        return;
      }
      setDays([...JSON.parse(data)]);
    };
    reader.onerror = function () {
      alert(reader.error);
    };
  };

  const validateObjectSchema = data => {
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    // Assert data is array
    if (!Array.isArray(data)) return false;
    // Assert data array has 7 elements
    if (data.length !== 7) return false;
    data.forEach((day, dayIndex) => {
      // Assert day name is correct
      if (day.name !== weekdays[dayIndex]) return false;
      // Assert day timetable is array
      if (!Array.isArray(day.timetable)) return false;
      day.timetable.forEach(tt => {
        // Assert timetable name is string
        if (typeof tt.name !== "string") return false;
        // Assert timetable cells is array
        if (!Array.isArray(tt.cells)) return false;
        // Assert cells is of lenght 96
        if (tt.cells.length !== 96) return false;
      });
    });
    return true;
  };

  return (
    <>
      <Navbar importJson={importJson} resetDays={resetDays} />
      <div className="unselectable accordion m-3" id="accordionExample">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${dayIndex}`}
                aria-expanded="true"
                aria-controls={`collapse${dayIndex}`}>
                {day.name}
              </button>
            </h2>
            <div
              id={`collapse${dayIndex}`}
              className="accordion-collapse collapse show"
              aria-labelledby={`heading${dayIndex}`}>
              <div className="accordion-body">
                <table draggable="false">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th colSpan="2" style={{ textAlign: "start" }}>
                        0
                      </th>
                      {[...Array(23).keys()].map(e => (
                        <th key={e} colSpan="4" style={{ textAlign: "center" }}>
                          {e + 1}
                        </th>
                      ))}
                      <th colSpan="2" style={{ textAlign: "end" }}>
                        24
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.timetable.map((timetableRow, rowIndex) => (
                      <TimetableRow
                        key={rowIndex}
                        timetableRow={timetableRow}
                        handleRemoveRow={handleRemoveRow}
                        handleNameInputChange={handleNameInputChange}
                        toggleCell={toggleCell}
                        setCellHighlight={setCellHighlight}
                        handleClearRow={handleClearRow}
                        getRowHours={getRowHours}
                        getRowShifts={getRowShifts}
                        getUniqueNames={getUniqueNames}
                        names={getUniqueNames()}
                        dayIndex={dayIndex}
                        rowIndex={rowIndex}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success d-flex justify-content-center align-items-center mt-2"
                    onClick={() => handleAddRow(dayIndex)}>
                    <i className="bi-person-plus-fill"></i>
                  </button>
                  <div className="mt-2 mb-0">
                    <h5 className="mb-0">
                      Total Hours:{" "}
                      <span className="badge bg-secondary">
                        {getDayHours(dayIndex)}
                      </span>
                    </h5>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClearAllRows(dayIndex)}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SummaryTable days={days} />
    </>
  );
}
