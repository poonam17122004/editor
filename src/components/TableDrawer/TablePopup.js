import React from "react";
import TableUI from "../TableUI";
import "./TablePopup.css";

function TablePopup({ trigger, setTrigger, rows, headers }) {
  return (
    trigger && (
      <div className="table-popup-overlay">
        <div className="table-popup-container">
          <button
            onClick={() => setTrigger(false)}
            className="table-popup-close"
          >
            X
          </button>
          <TableUI headers={headers} rows={rows} />
        </div>
      </div>
    )
  );
}

export default TablePopup;