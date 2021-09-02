import React from "react";

export default function SummaryTable(props) {
  const convertToHHMM = decimalHours => {
    var n = new Date(0, 0);
    // n.setSeconds(+decimalTimeString * 60 * 60);
    n.setMinutes(+decimalHours * 60);
    var result = n.toTimeString().slice(0, 5);
    return result;
  };

  const getRowData = () => {
    let rowData = {}; // name: { name: "", shifts: [mon: "", ...] }
    props.days.forEach((day, dayIndex) => {
      day.timetable.forEach(tt => {
        // Skip if name blank
        if (tt.name.trim() === "")  return;
        // Skip if no cells highlighted
        if (tt.cells.reduce((a, b) => a + b, 0) === 0) return;
        // Check if person exits otherwise create
        if (!rowData.hasOwnProperty(tt.name)) {
          rowData[tt.name] = {
            name: tt.name,
            shifts: {
              Monday: "",
              Tuesday: "",
              Wednesday: "",
              Thursday: "",
              Friday: "",
              Saturday: "",
              Sunday: "",
            },
          };
        }
        // Parse shifts
        let inShift = false;
        let shiftStart = "";
        tt.cells.forEach((cell, i) => {
          if (!inShift && cell) {
            inShift = true;
            shiftStart = `${convertToHHMM(i * 0.25)}`;
          } else if (inShift && !cell) {
            inShift = false;
            if (rowData[tt.name].shifts[day.name] !== "") rowData[tt.name].shifts[day.name] += ", ";
            rowData[tt.name].shifts[
              day.name
            ] += `${shiftStart} - ${convertToHHMM(i * 0.25)}`;
            shiftStart = "";
          } else if (!cell) inShift = false;
        });
      });
    });
    return rowData;
  };

  return (
    <div className="card mx-3 mb-3">
      <div className="card-header">Summary</div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              {props.days.map((day, i) => (
                <th key={i} scope="col">
                  {day.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(getRowData()).map(row => (
              <tr>
                <th scope="row">{row[1].name}</th>
                <td>{row[1].shifts.Monday}</td>
                <td>{row[1].shifts.Tuesday}</td>
                <td>{row[1].shifts.Wednesday}</td>
                <td>{row[1].shifts.Thursday}</td>
                <td>{row[1].shifts.Friday}</td>
                <td>{row[1].shifts.Saturday}</td>
                <td>{row[1].shifts.Sunday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
