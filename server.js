const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

// Import route
const routes = require("./routes");

// Default route
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Welcome to Miyou API, to use the API use the /api route");
});

// Other Routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started listening in port ${PORT}`);
});
