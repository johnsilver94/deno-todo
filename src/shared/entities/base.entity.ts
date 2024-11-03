import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { BaseEntity as BaseMongoEntity, ObjectId } from "@mikro-orm/mongodb";
import { BaseModel } from "../models/base.model.ts";

@Entity()
export class BaseEntity extends BaseMongoEntity implements BaseModel {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property({ version: true })
  __v!: number;

  @Property({ type: "date", onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
