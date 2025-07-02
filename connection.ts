import { Connection, PublicKey } from "@solana/web3.js";
import { fetchRaydiumPools } from "./fetcher";
import { GetPoolIds } from "./services/pool_metadata.service";
import { fetchPoolInfoByID } from "./utils/price.utils";

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


export async function PriceCron(){
    const poolIds=await GetPoolIds()
    const poolIdsStr=poolIds.join(",")
    console.log(poolIdsStr)
    const data=await fetchPoolInfoByID(poolIdsStr)
    console.log(data.data)
}