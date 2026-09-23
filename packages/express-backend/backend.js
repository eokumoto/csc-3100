// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userServices
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to retrieve users.");
    });
});

app.get("/users/:id", (req, res) => {
  userServices
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to retrieve user.");
    });
});

app.post("/users", (req, res) => {
  userServices
    .addUser(req.body)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to create user.");
    });
});

app.delete("/users/:id", (req, res) => {
  userServices
    .deleteUser(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to delete user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
