const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

// Default route
app.get("/", cors(), (req, res) => {
  res
    .status(200)
    .send("Welcome to Miyou API, to use the API use the /api route");
});

var whitelist = [
  "https://miyou.netlify.app",
  "https://www.miyou.tk",
  "https://miyou.tk",
  "http://localhost:3000",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Import route
const routes = require("./routes");

// Other Routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started listening in port ${PORT}`);
});
