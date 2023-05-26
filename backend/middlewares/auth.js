import CustomErrorHandler from "../services/CustomErrorHandler";
import Jwtservice from "../services/JwtService";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized());
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id, role } = await Jwtservice.verify(token);
    const user = {
      _id,
      role,
    };

    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorized());
  }
};

export default auth;
