import { User } from "./models/user.js";

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    if (!users) throw new Error("User not found");

    res.status(200).send(users);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Error:", err);
  }
});

// To get the user by ID
router.get("/api/users/:id", async (req, res) => {
  const { params: id } = req;
  try {
    console.log(id);
    const findUser = await User.findOne({ _id: id.id }); //Find user by the ID
    if (!findUser) return res.redirect("/error"); //When user isn't found

    res.status(200).send(findUser); //Sends the user response
  } catch (err) {
    console.error("error:", err);
    res.redirect("/error").json({ error: err.message || "failed" });
  }
});

//update a particular user
router.post("/api/users/update/:id", async (req, res) => {
  const { body, params: id } = req;
  body.password = hashPassword(body.password); //To hash the updated password
  try {
    const UpdateUser = await User.updateOne({ _id: id.id }, { $set: body }); // To get the user by Id and update the body

    if (!UpdateUser) throw new Error("User not cannot be updated");

    // Response with the user
    res.redirect("/members");
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ error: err.message || "failed to update user" });
  }
});

// To delete users
router.delete("/api/users/delete/:id", async (req, res) => {
  const { params: id } = req;

  try {
    const deleteUser = await User.deleteOne({ _id: id.id }); // Find the user by Id and delete

    if (!deleteUser) throw new Error("User not cannot be updated");

    res.status(200).send(deleteUser);
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ error: err.message || "failed to delete user" });
  }
});

export default router;
