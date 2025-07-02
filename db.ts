import { DataSource } from "typeorm";
import { PoolMetadata } from "./models/pool_metadata.model";
import { PoolPrice } from "./models/pool_prices.model";
import { DB_URL } from "./config/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URL,
  entities: [PoolMetadata, PoolPrice],
  migrations: ["migrations/*.ts"],
  synchronize: true, // TODO: make this false in prod
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
