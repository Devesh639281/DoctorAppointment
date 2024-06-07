import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decryptedTokenOrDecoded) => {
        if (err) {
          return res
            .status(200)
            .send({ success: false, message: "Auth Failed" });
        } else {
          req.body.userId = decryptedTokenOrDecoded.id;
          next();
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth Failed",
    });
  }
};
export default userAuth;
