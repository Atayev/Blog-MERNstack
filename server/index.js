import express from "express";
import mongodb from "mongoose";
import multer from "multer";
import cors from 'cors'
import {
  postCreateValidation,
  signinValidation,
  signupValidation,
} from "./validators/validations.js";

import { authMiddleware, handleValidationErrors } from './utils/index.js'

import { userController, postController } from './controllers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongodb
  .connect(
    "mongodb+srv://admin:admin@cluster0.ve0xqc7.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => console.log("DB error", err));

app.use(express.json());
app.use(cors())
app.use("/upload", express.static("uploads"));



app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post(
  "/posts",
  authMiddleware,
  postCreateValidation,
  handleValidationErrors,
  postController.create
);
app.delete("/posts/:id", authMiddleware, postController.remove);
app.patch(
  "/posts/:id",
  authMiddleware,
  postCreateValidation,
  handleValidationErrors,
  postController.update
);

app.post(
  "/auth/signin",
  signinValidation,
  handleValidationErrors,
  userController.signIn
);
app.post(
  "/auth/signup",
  signupValidation,
  handleValidationErrors,
  userController.signUp
);
app.get("/auth/me", authMiddleware, userController.getUser);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server running on ${PORT}`);
});
