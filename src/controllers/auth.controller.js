import { validationResult } from "express-validator";
import { User } from "../models/User.model.js";
import { comparePassword, hashPassword } from "../utils/hashpassword.js";
import { createToken } from "../utils/middlewares.js";

export const registerUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.send(result.array());
  const { body } = req;
  // validate the body...
  // criteria.
  // 1. password must be between 5 to 32 characters
  // 2. email must be an email
  // 3. name must be a string
  // 4. age must be a number
  // 5. dateofbirth must be a date

  const hashedPassword = hashPassword(body.password);

  try {
    // To collect the user data
    const user = new User({ ...body, password: hashedPassword });

    await user
      .save()
      .then((user) => {
        console.log("User created successfully:", user.toJSON());
        return res.status(201).json(user); // Returns the user in a Json format
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        return res
          .status(500)
          .json({ message: "Error creating user", error: err.message });
      });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400); // Returns an error, if there's an error
  }
};

export const loginUser = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  // const user = new User();
  try {
    // To find user from the user database
    const findUser = await User.findOne({ email });
    const token = createToken(findUser._id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    if (!findUser) throw new Error("User not found");

    // Importing the compare password variable to see if the user password matches with the hashed password in the database
    if (!comparePassword(password, findUser.password)) {
      return res.status(404).send("Bad Credentials");
    }
    return res.status(201).json({ findUser: findUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message || "Login failed" });
  }
};
