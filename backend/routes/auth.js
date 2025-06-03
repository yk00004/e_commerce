const express = require("express");
const router = express.Router();
const User = require("./../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    const hashpassword = await bcrypt.hash(model.password, 10);
    let user = new User({
      name: model.name,
      email: model.email,
      password: hashpassword,
    });

    let ans = await user.save();
    res.send({ message: "user regiserted done" });
  } else {
    res.status(400).send({ message: "valid" });
  }
});

router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    let user = await User.findOne({ email: model.email });
    if (!user) {
        res.status(400).send({ message: "user not found" });
    }
    const ismathched = await bcrypt.compare(model.password, user.password);
    if (ismathched) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin:user.isAdmin
        },
        "secerae",
        {
          expiresIn: "1h",
        }
      );
      const result={token,user}
      res.send(result);
    } else {
        res.status(400).send({ message: "invalid password" });
    }
  } else {
    res.status(400).send({ message: "enter all" });
  }
});

module.exports = router;
