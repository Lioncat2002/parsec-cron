import { Connection } from "@solana/web3.js";
import { RAYDIUM_PUBLIC_KEY } from "./config/config";
import { METAPLEX } from "./config/constants";
import { CreateNewPool } from "./services/pool_metadata.service";

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
    const poolIndex = 4;
    const tokenAIndex = 8;
    const tokenBIndex = 9;

    const tokenAAccount = accounts[tokenAIndex];
    const tokenBAccount = accounts[tokenBIndex];
    const poolAccount = accounts[poolIndex];

    const metadataAccountA = METAPLEX.nfts()
      .pdas()
      .metadata({ mint: tokenAAccount });

    const metadataAccountB = METAPLEX.nfts()
      .pdas()
      .metadata({ mint: tokenBAccount });

    const tokenAMetadataInfo = await connection.getAccountInfo(
      metadataAccountA
    );
    const tokenBMetadataInfo = await connection.getAccountInfo(
      metadataAccountB
    );
    let tokenAName = "";
    let tokenBName = "";
    if (tokenAMetadataInfo) {
      const token = await METAPLEX.nfts().findByMint({
        mintAddress: tokenAAccount,
      });
      tokenAName = token.name;
    }

    if (tokenBMetadataInfo) {
      const token = await METAPLEX.nfts().findByMint({
        mintAddress: tokenBAccount,
      });
      tokenBName = token.name;
    }

    const displayData = [
      { Token: "A", "Account Public Key": tokenAAccount.toBase58() },
      { Token: "B", "Account Public Key": tokenBAccount.toBase58() },
      { Token: "Pool", "Account Public Key": poolAccount.toBase58() },
    ];

    CreateNewPool(
      poolAccount.toBase58(),
      tokenAName,
      tokenBName,
      tokenAAccount.toBase58(),
      tokenBAccount.toBase58()
    );
    console.log("New LP Found");
    console.table(displayData);
  } catch {
    console.log("Error fetching transaction:", txId);
    return;
  }
}
