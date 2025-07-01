import { Hypertable, TimeColumn } from "@timescaledb/typeorm";
import { Entity, PrimaryColumn } from "typeorm";

@Entity("pools")
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
export class Pool {
  @PrimaryColumn({ name: "pool_id", type: "varchar" })
  poolId!: string;
  tokenA!: string;
  tokenB!: string;
  priceToken!: string; // should ideally be in SOL
  priceUSD!: string;

  @TimeColumn()
  time!: Date;
}
