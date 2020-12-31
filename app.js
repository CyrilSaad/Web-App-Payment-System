const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
const url = "mongodb://localhost:27017/acme";
const http = require("http");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});

module.exports = app;
