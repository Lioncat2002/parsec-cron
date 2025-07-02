import { AppDataSource } from "../db";
import { PoolPrice } from "../models/pool_prices.model";

export async function InsertPoolPrice(
  poolId: string,
  priceToken: number,
  priceUSD: number,
  mintAamount: number,
  mintBamount: number,
  timestamp: Date
) {
  const priceRepo = AppDataSource.getRepository(PoolPrice);

  const priceEntry = priceRepo.create({
    poolId: poolId,
    priceToken: priceToken,
    priceUSD: priceUSD,
    mintAamount: mintAamount,
    mintBamount: mintBamount,
    time: timestamp,
  });

  await priceRepo.save(priceEntry);
}
