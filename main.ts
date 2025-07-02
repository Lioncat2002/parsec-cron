import { PublicKey } from "@solana/web3.js";
import { RAYDIUM_PUBLIC_KEY, SERVER_TYPE } from "./config/config";
import { CONNECTION } from "./config/constants";
import { Connect, PriceCron } from "./connection";

async function main() {
  if (SERVER_TYPE == "metadata")
    await Connect(CONNECTION, new PublicKey(RAYDIUM_PUBLIC_KEY), "initialize2");
  else if (SERVER_TYPE == "price") {
    console.log("Started price cron");
    setInterval(PriceCron, 60 * 1000);
  } // 1 min
  // keep process alive forever
  await new Promise(() => {});
}

main().catch(console.error);
