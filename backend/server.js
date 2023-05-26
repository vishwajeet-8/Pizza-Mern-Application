import express from "express";
import mongoose from "mongoose";
const app = express();
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT || APP_PORT;

//Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB connected...");
});

global.appRoot = path.resolve(__dirname);
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
