import { Connection } from "@solana/web3.js";
import { RAYDIUM_PUBLIC_KEY } from "./config/config";
import { METAPLEX } from "./config/constants";

export async function fetchRaydiumPools(txId: string, connection: Connection) {
  try {
    const tx = await connection.getParsedTransaction(txId, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed",
    });

    //@ts-expect-error no proper types in web3js for some of the classes
    const accounts = (tx?.transaction.message.instructions).find(
      (ix) => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY
      //@ts-expect-error no proper types in web3js for some of the classes
    ).accounts as PublicKey[];

    if (!accounts) {
      console.log("No accounts found in the transaction.");
      return;
    }

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];

    const metadataAccountA = METAPLEX.nfts()
      .pdas()
      .metadata({ mint: tokenAAccount });

    const metadataAccountInfo = await connection.getAccountInfo(
      metadataAccountA
    );

    if (metadataAccountInfo) {
      const token = await METAPLEX.nfts().findByMint({
        mintAddress: tokenAAccount,
      });
      const tokenName = token.name;
      const tokenSymbol = token.symbol;
      //let tokenLogo = token.json!.image;
      console.log(tokenName, tokenSymbol, token);
    }

    const displayData = [
      { Token: "A", "Account Public Key": metadataAccountInfo },
      { Token: "B", "Account Public Key": tokenBAccount.toBase58() },
    ];

    console.log("New LP Found");
    console.table(displayData);
  } catch {
    console.log("Error fetching transaction:", txId);
    return;
  }
}
