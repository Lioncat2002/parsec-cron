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

  @Column({ type: "numeric" })
  priceToken!: number; // Price in base token (e.g., SOL)

  @Column({ type: "numeric" })
  priceUSD!: number; // Price in USD

  @TimeColumn()
  time!: Date;
}
