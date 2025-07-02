import { Hypertable, TimeColumn } from "@timescaledb/typeorm";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("pool_prices")
@Hypertable({
  compression: {
    compress: true,
    compress_orderby: "time",
    compress_segmentby: "pool_id",
    policy: {
      schedule_interval: "7 days",
    },
  },
})
export class PoolPrice {
  @PrimaryColumn({ name: "pool_id", type: "varchar" })
  poolId!: string;

  @Column({ name: "price_token", type: "numeric" })
  priceToken!: number; // Price in base token (e.g., SOL)

  @Column({ name: "price_usd", type: "numeric" })
  priceUSD!: number; // Price in USD

  @Column({ name: "mint_a_amount", type: "numeric" })
  mintAamount!: number; // amount of token A in pool

  @Column({ name: "mint_b_amount", type: "numeric" })
  mintBamount!: number; // amount of token B in pool

  @TimeColumn()
  time!: Date;
}
