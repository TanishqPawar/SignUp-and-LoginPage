import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/employee.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect");
      }
    } else {
      res.json("no record existed");
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      res.json("Account already exists");
    } else {
      EmployeeModel.create({ name, email, password })
        .then(() => res.json("Registration successful"))
        .catch((err) => res.json(err));
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});
