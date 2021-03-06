const express = require("express");
const app = express();
const mongoose = require("mongoose");
import routes from "./routes/index";
import {APP_PORT, DB_P} from "./config";
import errorHandler from "./middlewares/errorHandler";
import {initSocket} from "./services/SocketServer"
const cors = require('cors');

//DataBase
const connection = mongoose
  .connect(`mongodb+srv://sumit90990:${DB_P}@pizzeria0.etcrr.mongodb.net/pizza?retryWrites=true&w=majority`)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.log(err));


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use("/", (req, res) => {
  return res.send("Welcome to Our Pizza API");
});

app.use(errorHandler);

const port = process.env.PORT || APP_PORT;
const server  = app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});

//socket implementation 
initSocket(server);

