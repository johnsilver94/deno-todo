import { MongoDriver, defineConfig } from "@mikro-orm/mongodb";
import { SeedManager } from "@mikro-orm/seeder";
import TodoEntity from "./todos/todo.entity.ts";
import { Options } from "@mikro-orm/core";

const MikroOrmConfig: Options = defineConfig({
  entities: [TodoEntity], // Paths to your entities
  dbName: Deno.env.get("MONGODB_NAME"), // Your MongoDB database name
  clientUrl: Deno.env.get("MONGODB_CONNECTION"), // MongoDB connection URL
  extensions: [SeedManager],
  driver: MongoDriver, // Use MongoDB driver
  allowGlobalContext: true, // Allow global context for seeding
  seeder: {
    path: "../mikro-orm/seeds",
    defaultSeeder: "DatabaseSeeder",
  },
  debug: true, // Enable debug mode for development
});

export default MikroOrmConfig;
