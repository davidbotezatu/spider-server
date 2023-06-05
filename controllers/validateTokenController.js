exports.validateToken = async (_, res) => {
  res.status(200).json({ message: "Valid token" });
};
