import React from "react";
import "./TableUI.css";

function TableUI({ headers, rows }) {
  return (
    <div className="table-container">
      <table className="output-table">
        <thead>
          <tr className="table-header-row">
            {headers.map((header, index) => (
              <th key={index} className="table-header">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row_value, index) => (
            <tr
              key={index}
              className={`table-row ${
                index % 2 === 0 ? "table-row-even" : "table-row-odd"
              }`}
            >
              {row_value.map((cell_value, index) => (
                <td key={index} className="table-row-cell">
                  {cell_value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUI;
