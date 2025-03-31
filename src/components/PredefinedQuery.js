import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import "./PredefinedQuery.css";

function PredefinedQuery({ setDefaults, setValue }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const queryValues = [
    {
      query: "select * from customers;",
      default: 1,
      description: "All Customers"
    },
    {
      query: "select * from products;",
      default: 2,
      description: "All Products"
    },
    {
      query: "select * from suppliers;",
      default: 3,
      description: "All Suppliers"
    },
    {
      query: "select contact_name, address, city, postal_code, country from customers limit 18;",
      default: 4,
      description: "Customer Contact Details"
    },
  ];
  
  return (
    <div className={`predefined-query-wrapper ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="header-container">
        <div className="app-title">React SQL Editor</div>
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="predefined-query-container">
        <div className="header-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="header-icon"
          >
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"></path>
            <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"></path>
          </svg>
          <p className="header-title">Available Queries</p>
        </div>

        <div className="queries-container">
          {queryValues.map((item, index) => (
            <div
              key={index}
              className="query-item"
              onClick={() => {
                setDefaults(`${item.default}`);
                setValue(`${item.query}`);
              }}
            >
              <div className="query-description">{item.description}</div>
              <div className="query-code">{item.query}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PredefinedQuery;
