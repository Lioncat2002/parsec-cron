import { Connection } from "@solana/web3.js";
import { HTTP_URL, WSS_URL } from "./config";
import { Metaplex } from "@metaplex-foundation/js";

export const CONNECTION = new Connection(HTTP_URL, { wsEndpoint: WSS_URL});
export const METAPLEX=Metaplex.make(CONNECTION)