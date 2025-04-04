import React, { useState } from "react";
import TablePopup from "./TablePopup";
import GetTableInfo from "../GetTableInfo";
import "./TableStructure.css";

function TableStructure({ tableName, tableHead, tableNo }) {
  const [trigger, setTrigger] = useState(false);
  tableHead = Object.values(tableHead);

  const [tableHeadData, setTableHeadData] = useState([]);
  const [tableRowData, setTableRowData] = useState([]);
  const handleTable = () => {
    const { tableHeaders, tableRows } = GetTableInfo(tableNo);
    setTableHeadData(tableHeaders);
    setTableRowData(tableRows);
    setTrigger(true);
  };

  return (
    <div className="table-structure-container">
      <div className="table-header" onClick={handleTable}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="table-header-icon"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 0C1.34315 0 0 1.34315 0 3V7V15C0 16.6569 1.34314 18 3 18H21C22.6569 18 24 16.6569 24 15V7V3C24 1.34315 22.6569 0 21 0H3ZM22 6V3C22 2.44771 21.5523 2 21 2H3C2.44772 2 2 2.44772 2 3V6H22ZM2 8H7L7 16H3C2.44772 16 2 15.5523 2 15V8ZM9 16V8H15V16H9ZM17 16H21C21.5523 16 22 15.5523 22 15V8H17V16Z"
            fillOpacity="0.67"
          ></path>
        </svg>
        <p className="table-header-text">{tableName} [-]</p>
      </div>
      {tableHead.map((row, index) => (
        <div className="table-row-container" key={index}>
          <div className="table-row-indicator"></div>
          <p className="table-row-text">
            {row}{" "}
            <span className="table-row-type">
              [varchar(40)]
            </span>
          </p>
        </div>
      ))}

      <TablePopup
        trigger={trigger}
        setTrigger={setTrigger}
        headers={tableHeadData}
        rows={tableRowData}
      />
    </div>
  );
}

export default TableStructure;