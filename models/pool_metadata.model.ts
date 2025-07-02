import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("pool_metadata")
export class PoolMetadata {
  @PrimaryColumn({ name: "pool_id", type: "varchar" })
  poolId!: string;

  @Column({ type: "varchar" })
  tokenA!: string;

  @Column({ type: "varchar" })
  tokenB!: string;

  @Column({ name: "token_a_mint", type: "varchar" })
  tokenAMint!: string;

  @Column({ name: "token_b_mint", type: "varchar" })
  tokenBMint!: string;

  @Column({ type: "varchar", nullable: true })
  ammType?: string; // e.g. CONSTANT_PRODUCT, CONCENTRATED

  @Column({ name: "created_at", type: "bigint", default: () => "EXTRACT(EPOCH FROM now())::bigint" })
  createdAt!: number;
}
