import { ObjectId } from "@db/mongo";

export interface BaseModel {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}
