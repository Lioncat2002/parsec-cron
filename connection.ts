import { Connection, PublicKey } from "@solana/web3.js";
import { fetchRaydiumPools } from "./fetcher";

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
