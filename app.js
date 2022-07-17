const express=require("express")
require("dotenv").config();

const app = express()
app.use(express.json())
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./src/routes/index"));

app.listen(8080, () => {
  console.log("Listening on port 8080");
});