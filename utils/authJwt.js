const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.config");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).send({ message: "No token provided!" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  if (await redisClient.exists(token))
    return res.status(401).send({ message: "Unauthorized!" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    req.userId = user.id;
    next();
  });
};
