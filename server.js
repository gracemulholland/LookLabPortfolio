const express = require("express");
const app = express();
const PORT = 3000;

// Serve static files from 'public'
app.use(express.static("public"));

// Serve HTML pages
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.get("/wardrobe", (req, res) => res.sendFile(__dirname + "/views/wardrobe.html"));
app.get("/planner", (req, res) => res.sendFile(__dirname + "/views/planner.html"));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
