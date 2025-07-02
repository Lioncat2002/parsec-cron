import { Connection, PublicKey } from "@solana/web3.js";
import { fetchRaydiumPools } from "./fetcher";
import { GetPoolIds } from "./services/pool_metadata.service";
import { fetchPoolInfoByID } from "./utils/price.utils";
import { InsertPoolPrice } from "./services/pool_price.service";

export async function Connect(
  connection: Connection,
  programAddress: PublicKey,
  searchInstruction: string
): Promise<void> {
  console.log("Monitoring logs for: ", programAddress.toString());

  connection.onLogs(
    programAddress,
    ({ logs, err, signature }) => {
      if (err) return;
      if (logs && logs.some((log) => log.includes(searchInstruction))) {
        console.log(
          `signature for ${searchInstruction}: https://explorer.solana.com/tx/${signature}`
        );
        fetchRaydiumPools(signature, connection);
      }
    },
    "finalized"
  );
}

export async function PriceCron() {
  const poolIds = await GetPoolIds();
  const poolIdsStr = poolIds.join(",");
  const data = await fetchPoolInfoByID(poolIdsStr);
  for (const price of data.data) {
    console.log(price);
    if (price === null) {
      continue;
    }
    const poolId = price.id;
    const priceUSD = price.price;
    const mintAamount = price.mintAmountA;
    const mintBamount = price.mintAmountB;
    InsertPoolPrice(poolId, 0, priceUSD, mintAamount, mintBamount, new Date());
  }
  console.log(data.data);
}
