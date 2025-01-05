import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

export type TTokenType = "access" | "reset" | "refresh";

export const createToken = (jwtPayload: JwtPayload, type: TTokenType) => {
  jwtPayload.tokenType = type;

  let token = "";

  switch (type) {
    case "access":
      token = jwt.sign(jwtPayload, config.jwt_access_token_secret, {
        expiresIn: config.jwt_access_token_expire,
      });
      break;
    case "reset":
      token = jwt.sign(jwtPayload, config.jwt_access_token_secret, {
        expiresIn: "10m",
      });
      break;
    case "refresh":
      token = jwt.sign(jwtPayload, config.jwt_refresh_token_secret, {
        expiresIn: config.jwt_refresh_token_expire,
      });
  }

  return token;
};

export const verifyToken = (token: string, type: TTokenType) => {
  let user: JwtPayload;

  switch (type) {
    case "access":
      user = jwt.verify(token, config.jwt_access_token_secret) as JwtPayload;
      break;
    case "refresh":
      user = jwt.verify(token, config.jwt_refresh_token_secret) as JwtPayload;
      break;
    case "reset":
      user = jwt.verify(token, config.jwt_access_token_secret) as JwtPayload;
  }

  return user;
};
