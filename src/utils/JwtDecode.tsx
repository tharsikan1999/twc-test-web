// src/utils/tokenUtils.ts
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userID: string;
  email: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
