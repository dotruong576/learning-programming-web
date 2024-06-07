import jsonWebToken from "jsonwebtoken";
import config from "../config";
import { JWTPayload } from "../types/api/authTypes";

export type ReturnJWTType = {
    token: string;
    expires: string;
};

const signJWT = (payload: JWTPayload): ReturnJWTType => {
 const signedToken = jsonWebToken.sign(payload, config.jwt.secret, {
 expiresIn: parseInt(config.jwt.expiredIn),
 algorithm: config.JWTAlgorithm,
 });

 return {
     token: signedToken,
     expires: config.jwt.expiredIn,
 };
};

export{signJWT};