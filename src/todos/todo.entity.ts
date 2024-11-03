import { Entity, Property } from "@mikro-orm/core";

import { BaseEntity } from "../shared/entities/base.entity.ts";
import { TodoModel } from "./todo.model.ts";

@Entity({ tableName: "todos" })
class TodoEntity extends BaseEntity implements TodoModel {
  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  completed: boolean = false;
}

export default TodoEntity;
