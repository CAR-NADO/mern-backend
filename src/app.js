import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";

const app = express();

app.use(
  cors()
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/api/v1/user", router);

export { app };
