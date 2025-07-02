import { AppDataSource } from "../db";
import { PoolMetadata } from "../models/pool_metadata.model";

export async function CreateNewPool(
  poolId: string,
  tokenA: string,
  tokenB: string,
  tokenAMint: string,
  tokenBMint: string
) {
  const metadataRepo = AppDataSource.getRepository(PoolMetadata);

  const poolExists = await metadataRepo.findOneBy({ poolId });
  if (!poolExists) {
    const meta = metadataRepo.create({
      poolId,
      tokenA,
      tokenB,
      tokenAMint,
      tokenBMint,
    });
    await metadataRepo.save(meta);
  } else {
    console.log("Pool already exists", poolId);
  }
}
