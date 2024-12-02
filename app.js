const express = require("express");
const app = express();
const routes = require("./server/Routes/schoolRoutes");
const port = 8080;
const pool = require("./server/config/db");
app.use(express.json());
app.get("/", (rerq, res) => {
  res.send("<h1>Hello Sanjay</h1>");
});
//route
app.use("/api/v1/school", routes);
//database connection
pool
  .query("SELECT 1")
  .then(() => {
    console.log("Mysql db Connected");
    app.listen(port, (req, res) => {
      console.log(`Server is Running at ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
