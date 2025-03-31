import React from "react";
import TableStructure from "./TableStructure";
import "./DataDraw.css";

function DataDraw() {
  let customers = require("../DataStore/customers.json");
  let suppliers = require("../DataStore/suppliers.json");
  let products = require("../DataStore/products.json");
  return (
    <div className="data-draw-container">
      <TableStructure
        tableHead={customers[0]}
        tableName="customers"
        tableNo={1}
      />
      <div className="divider"></div>
      <TableStructure
        tableHead={suppliers[0]}
        tableName="suppliers"
        tableNo={2}
      />
      <div className="divider"></div>
      <TableStructure
        tableHead={products[0]}
        tableName="products"
        tableNo={3}
      />
    </div>
  );
}

export default DataDraw;