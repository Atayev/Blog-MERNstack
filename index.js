import express from "express";
import mongodb from "mongoose";
import {
  postCreateValidation,
  signupValidation,
} from "./validators/validations.js";
import authMiddleware from "./utils/authMiddleware.js";
import * as controller from "./controllers/UserController.js";
import * as postController from "./controllers/PostController.js";
const app = express();
const PORT = process.env.PORT || 4000;

mongodb
  .connect(
    "mongodb+srv://admin:admin@cluster0.ve0xqc7.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => console.log("DB error", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", authMiddleware, postCreateValidation, postController.create);
app.delete("/posts/:id", authMiddleware, postController.remove);
app.patch("/posts/:id",authMiddleware, postController.update);

app.post("/auth/signin", controller.signIn);
app.post("/auth/signup", signupValidation, controller.signUp);
app.get("/auth/me", authMiddleware, controller.getUser);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running on ${PORT}`);
});
