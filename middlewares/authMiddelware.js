const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers["authorization"]) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Split the token from Authorization header
    const token = req.headers["authorization"].split(" ")[1];

    // Verify the JWT token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        // Set userId on request body
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failed",
    });
  }
};
