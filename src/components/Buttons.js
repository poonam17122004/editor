"use client";
import toast from "react-hot-toast";
import getTableInfo from "./GetTableInfo";
import "./Buttons.css";

function Buttons({
  setCSVData,
  setQuery,
  setValue,
  setHeaders,
  setRows,
  setDefaults,
  defaults,
  value,
}) {
  const runQuery = () => {
    if (!value.trim()) {
      toast.error("Please enter a query before running.");
      return;
    }

    setQuery(value);

    // Check if the query is one of the predefined ones
    const predefinedQueries = {
      "select * from customers;": 1,
      "select * from suppliers;": 2,
      "select * from products;": 3,
      "select contact_name, address, city, postal_code, country from customers limit 18;": 4,
    };

    // Set defaults to the predefined query number or 0 for custom queries
    const queryDefault = predefinedQueries[value.toLowerCase()] || 0;

    // Pass the actual SQL query for custom queries
    try {
      const { tableHeaders, tableRows } = getTableInfo(queryDefault, value);

      // Update state with the new data
      setDefaults(queryDefault);
      setHeaders(tableHeaders);
      setRows(tableRows);

      // Prepare CSV data
      const temp = [];
      if (tableHeaders.length > 0 && tableRows.length > 0) {
        temp.push(tableHeaders);
        tableRows.forEach((row) => {
          temp.push(row);
        });
        setCSVData(temp);
        toast.success("Query executed successfully");
      } else {
        toast.error("No data returned from query");
      }
    } catch (error) {
      console.error("Error executing query:", error);
      toast.error("Error executing query");
    }
  };

  const reset = () => {
    // function to reset the editor
    setQuery("");
    setValue("");
    setDefaults(1);
    setHeaders([]);
    setRows([]);
    setCSVData([]);
    toast.success("Editor reset");
  };

  return (
    <div className="buttons-container">
      <div className="button-wrapper">
        <button
          onClick={reset}
          className="reset-button"
          aria-label="Reset query"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="button-icon"
          >
            <path d="M3 2v6h6"></path>
            <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
          </svg>
          <span className="button-text">Reset</span>
        </button>
      </div>
      <div className="button-wrapper">
        <button
          onClick={runQuery}
          className="run-query-button"
          aria-label="Run query"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="button-icon"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span className="button-text">Run Query</span>
        </button>
      </div>
    </div>
  );
}

export default Buttons;
