import { Document } from "mongoose";

export type BaseDocument = Document & {
  createdAt?: Date;
  updatedAt?: Date;
};
