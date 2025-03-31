export default function GetTableInfo(data, sqlQuery = "") {
  let infoStore = null;
  try {
    if (data === 1) {
      infoStore = require("./DataStore/customers.json");
    } else if (data === 2) {
      infoStore = require("./DataStore/suppliers.json");
    } else if (data === 3) {
      infoStore = require("./DataStore/products.json");
    } else if (data === 4) {
      infoStore = require("./DataStore/select_customer.json");
    } else {
      // For custom queries, generate random data based on the SQL query
      infoStore = generateRandomData(sqlQuery);
    }

    // Ensure we have a valid data structure
    if (!Array.isArray(infoStore) || infoStore.length === 0) {
      throw new Error("Invalid data structure returned");
    }

    let tableHeaders = [];
    let tableRows = [];
    for (var i = 0; i < infoStore.length; i++) {
      const row = infoStore[i];
      if (i === 0) {
        for (const item in row) {
          tableHeaders.push(row[item]);
        }
      } else {
        let temp = [];
        for (const item in row) {
          temp.push(row[item]);
        }
        tableRows.push(temp);
      }
    }

    return { tableHeaders, tableRows };
  } catch (error) {
    console.error("Error in GetTableInfo:", error);
    // Return a minimal valid structure in case of error
    return {
      tableHeaders: ["Error"],
      tableRows: [["Failed to execute query. Please try again."]],
    };
  }
}

// Function to generate random data for unknown queries
function generateRandomData(sqlQuery = "") {
  // Create various random data templates for different query types
  const dataTemplates = {
    users: {
      headers: {
        0: "ID",
        1: "Username",
        2: "Email",
        3: "First Name",
        4: "Last Name",
        5: "Role",
        6: "Created At",
      },
      generateRow: (i) => ({
        0: `USER${String(i).padStart(3, "0")}`,
        1: generateUsername(),
        2: `user${i}@example.com`,
        3: getRandomItem(firstNames),
        4: getRandomItem(lastNames),
        5: getRandomItem(["Admin", "User", "Editor", "Viewer"]),
        6: randomDate(new Date(2020, 0, 1), new Date()),
      }),
    },
    orders: {
      headers: {
        0: "Order ID",
        1: "Customer",
        2: "Product",
        3: "Quantity",
        4: "Price",
        5: "Status",
        6: "Order Date",
      },
      generateRow: (i) => ({
        0: `ORD${String(i).padStart(5, "0")}`,
        1: `CUST${Math.floor(Math.random() * 1000)}`,
        2: getRandomItem([
          "Laptop",
          "Phone",
          "Tablet",
          "Monitor",
          "Keyboard",
          "Mouse",
          "Headphones",
        ]),
        3: Math.floor(Math.random() * 10) + 1,
        4: `$${(Math.random() * 1000).toFixed(2)}`,
        5: getRandomItem(["Pending", "Shipped", "Delivered", "Cancelled"]),
        6: randomDate(new Date(2022, 0, 1), new Date()),
      }),
    },
    products: {
      headers: {
        0: "Product ID",
        1: "Name",
        2: "Category",
        3: "Supplier",
        4: "Price",
        5: "Stock",
        6: "Rating",
      },
      generateRow: (i) => ({
        0: `PROD${String(i).padStart(4, "0")}`,
        1: getRandomItem(productNames),
        2: getRandomItem(["Electronics", "Clothing", "Food", "Books", "Toys"]),
        3: `Supplier ${Math.floor(Math.random() * 20) + 1}`,
        4: `$${(Math.random() * 500).toFixed(2)}`,
        5: Math.floor(Math.random() * 1000),
        6: (Math.random() * 5).toFixed(1),
      }),
    },
    employees: {
      headers: {
        0: "Employee ID",
        1: "Name",
        2: "Department",
        3: "Position",
        4: "Salary",
        5: "Hire Date",
        6: "Manager",
      },
      generateRow: (i) => ({
        0: `EMP${String(i).padStart(4, "0")}`,
        1: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        2: getRandomItem([
          "HR",
          "IT",
          "Sales",
          "Marketing",
          "Finance",
          "Operations",
        ]),
        3: getRandomItem([
          "Manager",
          "Director",
          "Specialist",
          "Assistant",
          "Coordinator",
        ]),
        4: `$${(Math.random() * 100000 + 30000).toFixed(2)}`,
        5: randomDate(new Date(2015, 0, 1), new Date()),
        6: `EMP${String(Math.floor(Math.random() * 20) + 1).padStart(4, "0")}`,
      }),
    },
    sales: {
      headers: {
        0: "Sale ID",
        1: "Product",
        2: "Customer",
        3: "Date",
        4: "Quantity",
        5: "Revenue",
        6: "Region",
      },
      generateRow: (i) => ({
        0: `SALE${String(i).padStart(4, "0")}`,
        1: getRandomItem(productNames),
        2: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        3: randomDate(new Date(2022, 0, 1), new Date()),
        4: Math.floor(Math.random() * 20) + 1,
        5: `$${(Math.random() * 2000 + 100).toFixed(2)}`,
        6: getRandomItem(["North", "South", "East", "West", "Central"]),
      }),
    },
  };

  try {
    // Try to determine which table template to use based on the SQL query
    let templateToUse = null;

    if (sqlQuery) {
      sqlQuery = sqlQuery.toLowerCase();

      // Extract table name from the query using simple regex
      const fromMatch = sqlQuery.match(/from\s+(\w+)/i);
      const tableName = fromMatch ? fromMatch[1] : null;

      if (tableName) {
        // Map common table names to our templates
        const tableMapping = {
          user: "users",
          users: "users",
          account: "users",
          accounts: "users",
          customer: "users",
          customers: "users",

          order: "orders",
          orders: "orders",
          purchase: "orders",
          purchases: "orders",

          product: "products",
          products: "products",
          item: "products",
          items: "products",

          employee: "employees",
          employees: "employees",
          staff: "employees",

          sale: "sales",
          sales: "sales",
          transaction: "sales",
          transactions: "sales",
        };

        if (tableMapping[tableName]) {
          templateToUse = dataTemplates[tableMapping[tableName]];
        }
      }

      // If no specific table name found, look for keywords in the query
      if (!templateToUse) {
        if (/user|account|customer|email|login|password/i.test(sqlQuery)) {
          templateToUse = dataTemplates.users;
        } else if (/order|purchase|ship|deliver/i.test(sqlQuery)) {
          templateToUse = dataTemplates.orders;
        } else if (/product|item|inventory|stock|price/i.test(sqlQuery)) {
          templateToUse = dataTemplates.products;
        } else if (/employee|staff|salary|hire|department/i.test(sqlQuery)) {
          templateToUse = dataTemplates.employees;
        } else if (/sale|revenue|transaction|region/i.test(sqlQuery)) {
          templateToUse = dataTemplates.sales;
        }
      }
    }

    // If still no template found, choose randomly
    if (!templateToUse) {
      const templateKeys = Object.keys(dataTemplates);
      templateToUse =
        dataTemplates[
          templateKeys[Math.floor(Math.random() * templateKeys.length)]
        ];
    }

    // Generate header row
    const randomData = [templateToUse.headers];

    // Determine number of rows to generate based on LIMIT clause
    let numRows = 15; // default
    const limitMatch = sqlQuery.match(/limit\s+(\d+)/i);
    if (limitMatch && parseInt(limitMatch[1]) > 0) {
      numRows = Math.min(parseInt(limitMatch[1]), 50); // Cap at 50 rows max
    }

    // Generate random rows
    for (let i = 1; i <= numRows; i++) {
      randomData.push(templateToUse.generateRow(i));
    }

    return randomData;
  } catch (error) {
    console.error("Error generating random data:", error);
    // Return a fallback dataset in case of error
    return [
      { 0: "Status" },
      { 0: "Error generating data. Please try another query." },
    ];
  }
}

// Helper functions for random data generation
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toLocaleDateString();
}

function generateUsername() {
  const prefixes = ["user", "dev", "admin", "guest", "member"];
  const suffix = Math.floor(Math.random() * 1000);
  return `${getRandomItem(prefixes)}${suffix}`;
}

// Sample data for random generation
const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Emily",
  "David",
  "Sarah",
  "Robert",
  "Lisa",
  "William",
  "Jessica",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
];
const productNames = [
  "Ultra HD TV",
  "Smartphone Pro",
  "Laptop Elite",
  "Wireless Earbuds",
  "Smart Watch",
  "Digital Camera",
  "Gaming Console",
  "Bluetooth Speaker",
  "Fitness Tracker",
  "Wireless Mouse",
  "Mechanical Keyboard",
  "External SSD",
];
