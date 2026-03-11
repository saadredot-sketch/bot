const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const chatRoute = require("./Routes/Route");
app.use(chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
