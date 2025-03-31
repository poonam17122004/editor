import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import Buttons from "./components/Buttons";
import PredefinedQuery from "./components/PredefinedQuery";
import SqlEditor from "./components/SqlEditor";
import Table from "./components/Table";
import DataDraw from "./components/TableDrawer/DataDraw";
import { ThemeContext } from "./ThemeContext";
import "./App.css";

function App() {
  const defaultSQLMessage =
    "-- Online SQL Editor to Run SQL Online. \n-- Use the editor to view all tables in SQL operations.\n\n-- Remove the code and Start exploring!\n\n-- Happy Coding!";

  const [value, setValue] = useState(defaultSQLMessage);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [query, setQuery] = useState("");
  const [defaults, setDefaults] = useState(1);
  const [csvData, setCSVData] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (value.trim() === "") {
      toast.error("Please enter a query before running.");
    }
  }, [value]);

  return (
    <div
      className={`app-container ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content">
        <div className="content-wrapper">
          <div className="predefined-query-section">
            <PredefinedQuery setValue={setValue} setDefaults={setDefaults} />
          </div>
          <div className="sql-editor-section">
            <div className="buttons-container">
              <div className="input-header">Input</div>
              <Buttons
                setQuery={setQuery}
                setHeaders={setHeaders}
                setRows={setRows}
                setCSVData={setCSVData}
                value={value}
                setValue={setValue}
                setDefaults={setDefaults}
                defaults={defaults}
              />
            </div>
            <SqlEditor value={value} setValue={setValue} />
          </div>
        </div>
        <Table query={query} headers={headers} rows={rows} csvData={csvData} />
      </div>

      <div className="sidebar">
        <DataDraw />
      </div>

      <Toaster
        position="bottom-left"
        gutter={8}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
}

export default App;
