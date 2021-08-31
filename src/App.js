import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TimetableRow from "./components/TimetableRow";
import SummaryTable from "./components/SummaryTable";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
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
      ],
    };
  }

  handleToggleCell = (dayIndex, rowIndex, cellIndex) => {
    let days = [...this.state.days];
    days[dayIndex].timetable[rowIndex].cells[cellIndex] === 0 ?
      days[dayIndex].timetable[rowIndex].cells[cellIndex] = 1
      :
      days[dayIndex].timetable[rowIndex].cells[cellIndex] = 0;
    this.setState({ days: days });
  }

  handleClearRow = (dayIndex, rowIndex) => {
    let days = [...this.state.days];
    days[dayIndex].timetable[rowIndex].cells = [...Array(96).keys()].map(i => 0);
    this.setState({ days: days });
  }

  handleAddRow = (dayIndex) => {
    let days = [...this.state.days];
    const timetableRow = { name: "", cells: [...Array(96).keys()].map(i => 0) }; // Generate state for blank row
    days[dayIndex].timetable.push(timetableRow);
    this.setState({ days: days });
  }

  handleRemoveRow = (dayIndex, rowIndex) => {
    let days = [...this.state.days];
    days[dayIndex].timetable.splice(rowIndex, 1);
    this.setState({ days: days });
  }

  handleClearAllRows = (dayIndex) => {
    let days = [...this.state.days];
    days[dayIndex].timetable.forEach(tt => (
      tt.cells = [...Array(96).keys()].map(i => 0)
    ));
    this.setState({ days: days });
  }

  getRowHours = (dayIndex, rowIndex) => {
    return this.state.days[dayIndex].timetable[rowIndex].cells.reduce((a, b) => a + b, 0) / 4
  }

  getDayHours = (dayIndex) => {
    let dayHours = 0;
    const days = [...this.state.days];
    days[dayIndex].timetable.forEach(tt => (
      dayHours += tt.cells.reduce((a, b) => a + b, 0) / 4
    ))
    return dayHours;
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="accordion m-3" id="accordionExample">
          {this.state.days.map((day, dayIndex) => (
            <div key={dayIndex} className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  // className={`accordion-button ${i === 0 ? "" : "collapsed"}`}
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
                // className={`accordion-collapse collapse ${i === 0 && "show"}`}
                className="accordion-collapse collapse show"
                aria-labelledby={`heading${dayIndex}`}>
                <div className="accordion-body">
                  <table>
                    <tbody>
                      {day.timetable.map((timetableRow, rowIndex) => (
                        <TimetableRow
                          key={rowIndex}
                          timetableRow={timetableRow}
                          handleRemoveRow={this.handleRemoveRow}
                          handleToggleCell={this.handleToggleCell}
                          handleClearRow={this.handleClearRow}
                          getRowHours={this.getRowHours}
                          dayIndex={dayIndex}
                          rowIndex={rowIndex}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-success d-flex justify-content-center align-items-center mt-2"
                      onClick={() => this.handleAddRow(dayIndex)}>
                      <i className="bi-person-plus-fill"></i>
                    </button>
                    <div className="mt-2 mb-0">
                      <h5 className="mb-0">
                        Total Hours:{" "}
                        <span className="badge bg-secondary">{this.getDayHours(dayIndex)}</span>
                      </h5>
                    </div>
                    <button className="btn btn-danger"
                      onClick={() => this.handleClearAllRows(dayIndex)}>Clear All</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SummaryTable days={this.state.days} />
      </>
    );
  }
}
