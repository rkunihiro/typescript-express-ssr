import createError from "http-errors";
import express from "express";
import path from "path";
import logger from "morgan";
import stylus from "stylus";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.static(path.join(__dirname, "../public")));
app.use(stylus.middleware({
    src: path.join(__dirname, "stylus"),
    dest: path.join(__dirname, "../public/css"),
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: any) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(3000);
