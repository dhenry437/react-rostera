import React from "react";

export default function SummaryTable(props) {
  const convertToHHMM = decimalHours => {
    var n = new Date(0, 0);
    // n.setSeconds(+decimalTimeString * 60 * 60);
    n.setMinutes(+decimalHours * 60);
    var result = n.toTimeString().slice(0, 5);
    return result;
  };

  const handleJsonExport = () => {
    download(JSON.stringify(props.days), "json");
  };

  const handleCsvExport = () => {};

  const download = (data, fileExt) => {
    const URIs = {
      json: "data:text/json;charset=utf-8,",
      csv: "data:text/csv;charset=utf-8,",
    };
    let content = URIs[fileExt] + data;
    let encodedUri = encodeURI(content);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `rostera_export.${fileExt}`);
    document.body.appendChild(link);

    link.click();
  };

  const getRowData = () => {
    let rowData = {}; // name: { name: "", shifts: [mon: "", ...] }
    props.days.forEach((day, dayIndex) => {
      day.timetable.forEach(tt => {
        // Skip if name blank
        if (tt.name.trim() === "") return;
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
            if (rowData[tt.name].shifts[day.name] !== "")
              rowData[tt.name].shifts[day.name] += ", ";
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
      <div className="card-header d-flex justify-content-between">
        Summary
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i className="bi bi-box-arrow-down m"></i> Export
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleJsonExport()}
                type="button">
                JSON
              </button>
            </li>
          </ul>
        </div>
      </div>
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
            {Object.entries(getRowData()).map((row, i) => (
              <tr key={i}>
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
