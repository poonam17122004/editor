"use client"

import { useState } from "react"
import "./TableSchema.css"

const tableSchemas = {
  customers: [
    { name: "Customer ID", type: "varchar(40)" },
    { name: "Company Name", type: "varchar(40)" },
    { name: "Contact Name", type: "varchar(40)" },
    { name: "Contact Title", type: "varchar(40)" },
    { name: "Address", type: "varchar(40)" },
    { name: "City", type: "varchar(40)" },
    { name: "Region", type: "varchar(40)" },
    { name: "Postal Code", type: "varchar(40)" },
    { name: "Country", type: "varchar(40)" },
    { name: "Phone Number", type: "varchar(40)" },
    { name: "Fax", type: "varchar(40)" },
  ],
  suppliers: [
    { name: "supplierID", type: "varchar(40)" },
    { name: "companyName", type: "varchar(40)" },
    { name: "contactName", type: "varchar(40)" },
    { name: "contactTitle", type: "varchar(40)" },
    { name: "address", type: "varchar(40)" },
    { name: "city", type: "varchar(40)" },
    { name: "region", type: "varchar(40)" },
    { name: "postalCode", type: "varchar(40)" },
    { name: "country", type: "varchar(40)" },
    { name: "phone", type: "varchar(40)" },
  ],
  products: [
    { name: "productID", type: "varchar(40)" },
    { name: "productName", type: "varchar(40)" },
    { name: "supplierID", type: "varchar(40)" },
    { name: "categoryID", type: "varchar(40)" },
    { name: "quantityPerUnit", type: "varchar(40)" },
    { name: "unitPrice", type: "decimal(10,2)" },
    { name: "unitsInStock", type: "int" },
    { name: "unitsOnOrder", type: "int" },
    { name: "discontinued", type: "bit" },
  ],
  orders: [
    { name: "orderID", type: "varchar(40)" },
    { name: "customerID", type: "varchar(40)" },
    { name: "employeeID", type: "varchar(40)" },
    { name: "orderDate", type: "datetime" },
    { name: "requiredDate", type: "datetime" },
    { name: "shippedDate", type: "datetime" },
    { name: "shipVia", type: "int" },
    { name: "freight", type: "decimal(10,2)" },
    { name: "shipName", type: "varchar(40)" },
    { name: "shipAddress", type: "varchar(40)" },
    { name: "shipCity", type: "varchar(40)" },
  ],
}

function TableSchema({ setValue }) {
  const [expandedTable, setExpandedTable] = useState(null)

  const handleTableClick = (tableName) => {
    if (expandedTable === tableName) {
      setExpandedTable(null)
    } else {
      setExpandedTable(tableName)
      setValue(`select * from ${tableName};`)
    }
  }

  return (
    <div className="table-schema-container">
      <div className="schema-header">
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
          className="schema-icon"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
          <path d="M12 13v5"></path>
          <path d="M8 13v5"></path>
          <path d="M16 13v5"></path>
        </svg>
        <h3>Database Schema</h3>
      </div>

      <div className="tables-list">
        {Object.keys(tableSchemas).map((tableName) => (
          <div key={tableName} className="table-item">
            <div
              className={`table-name ${expandedTable === tableName ? "expanded" : ""}`}
              onClick={() => handleTableClick(tableName)}
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
                className="table-icon"
              >
                <path d="M3 3h18v18H3z"></path>
                <path d="M21 9H3"></path>
                <path d="M12 3v18"></path>
              </svg>
              {tableName} [{tableSchemas[tableName].length}]
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chevron-icon"
              >
                {expandedTable === tableName ? (
                  <polyline points="18 15 12 9 6 15"></polyline>
                ) : (
                  <polyline points="6 9 12 15 18 9"></polyline>
                )}
              </svg>
            </div>

            {expandedTable === tableName && (
              <div className="table-fields">
                {tableSchemas[tableName].map((field, index) => (
                  <div key={index} className="field-item">
                    <div className="field-connector"></div>
                    <div className="field-name">{field.name}</div>
                    <div className="field-type">[{field.type}]</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableSchema

