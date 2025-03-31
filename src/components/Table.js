import { CSVLink } from "react-csv";
import TableUI from "./TableUI";
import "./Table.css";

function Table({ query, headers, rows, csvData }) {
  const isPredefinedQuery = [
    "select * from customers;",
    "select * from suppliers;",
    "select * from products;",
    "select contact_name, address, city, postal_code, country from customers limit 18;",
  ].includes(query?.toLowerCase());

  const hasValidData = headers && headers.length > 0 && rows && rows.length > 0;

  return (
    <div className="table-wrapper">
      {query ? (
        <section className="output-section">
          <div className="output-header-container">
            <div className="output-header">
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
                className="output-icon"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Query Results
              {!isPredefinedQuery && hasValidData && (
                <span className="random-data-indicator">(Sample Data)</span>
              )}
            </div>
            {hasValidData && csvData && csvData.length > 0 && (
              <CSVLink
                data={csvData}
                filename={`sql_export_${new Date().getTime()}.csv`}
                className="csv-link"
              >
                <button className="export-button">
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
                    className="export-icon"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span className="export-button-text">Export CSV</span>
                </button>
              </CSVLink>
            )}
          </div>
          {hasValidData && (
            <div className="results-info">
              <span className="results-count">{rows.length} rows</span>
              <span className="results-time">Query time: 0.05s</span>
              {!isPredefinedQuery && (
                <span className="random-data-note">
                  Note: This is randomly generated sample data for demonstration
                </span>
              )}
            </div>
          )}
          <TableUI headers={headers || []} rows={rows || []} />
        </section>
      ) : (
        <div className="no-query-placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="placeholder-icon"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
          <div className="placeholder-text">
            Run a query to see results here
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
