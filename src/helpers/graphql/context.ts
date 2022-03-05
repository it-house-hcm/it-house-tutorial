import { Request } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import _ from "lodash";
import { UserRole } from "../../modules/user/user.model";
import Token from "../token";

export class Context {
  public req: Request;
  public token?: Token;
  public isAuth = false;
  public isTokenExpired = false;

  constructor(params: { req: Request }) {
    this.req = params.req;
    const token = _.get(this.req.headers, "x-token");

    if (token) {
      try {
        this.token = Token.decode(token as string);
        this.isAuth = true;
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          this.isTokenExpired = true;
        }
      }
    }
  }

  get userId() {
    if (!this.isAuth) return null;
    return this.token?._id;
  }

  get scopes() {
    if (!this.isAuth) return [];
    if (!this.token) return [];
    return _.get(this.token, "payload.scopes", []);
  }

  get isAdmin() {
    if (!this.isAuth) return false;
    if (!this.token) return false;
    return this.token.role === UserRole.ADMIN;
  }

  get isUser() {
    if (!this.isAuth) return false;
    if (!this.token) return false;
    return this.token.role === UserRole.USER;
  }

  auth(roles: string[]) {
    if (!this.isAuth) throw Error("Unauthorized");
    if (!this.token) throw Error("Unauthorized");
    if (!roles.includes(this.token.role)) throw Error("Permission denied");
    return this;
  }

  grant(scopes: string[]) {
    if (!this.isAuth) throw Error("Unauthorized");
    if (!this.token) throw Error("Unauthorized");
    if (!scopes.every((scope) => this.scopes.includes(scope)))
      throw Error("Permission denied");
    return this;
  }
}
