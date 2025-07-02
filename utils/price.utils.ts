import axios from "axios";
import { RAYDIUM_BASE_URL } from "../config/config";
export async function fetchPoolInfoByID(poolIds: string) {
  // this function fetches the liqudity and price of a token
  /**
     * curl -X 'GET' \
  'https://api-v3.raydium.io/pools/info/ids?ids=GGy6rxQP9FXYVbAXY4Zk5G9t1vABSSdcqcfzWTvzszkn' \
  -H 'accept: application/json'
     */
  const response = await axios.get(
    `${RAYDIUM_BASE_URL}/pools/info/ids?ids=${poolIds}`
  );
  const data = response.data;
  return data;
}
