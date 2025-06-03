const jwt = require("jsonwebtoken");

function verifytoken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    // console.log("auth-middlewere token");

    return res.status(401).send({
      error: "access denied",
    });
  }

  try {
    const decode = jwt.verify(token, "secerae");
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({
      error: "access denied",
    });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      error: "access denied",
    });
  }
}

module.exports = { verifytoken, isAdmin };
