import {
  MikroORM,
  Options,
  EntityManager,
  EntityRepository,
} from "@mikro-orm/mongodb";
import config from "../mikro-orm.config.ts";
import TodoEntity from "../todos/todo.entity.ts";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  todo: EntityRepository<TodoEntity>;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  // allow overriding config options for testing
  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  // save to cache before returning
  return (cache = {
    orm,
    em: orm.em,
    todo: orm.em.getRepository(TodoEntity),
  });
}
