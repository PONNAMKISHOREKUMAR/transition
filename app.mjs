import express from "express";
import fetch from "node-fetch";
import rules from "./config/rules.js"; // Include `.js` extension for ES modules


const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

const API_URL =
  "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";

app.get("/", async (req, res) => {
  try {
    // Fetch data from the API
    const response = await fetch(API_URL);
    const data = await response.json();

    // Evaluate rules
    const results = rules.map((rule) => ({
      name: rule.name,
      status: rule.condition(data) ? "Passed" : "Failed",
    }));

    // Render the dashboard
    res.render("dashboard", { results });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
