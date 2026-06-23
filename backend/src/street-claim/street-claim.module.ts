import { Module } from "@nestjs/common";
import { StreetClaimController } from "./street-claim.controller";
import { StreetClaimService } from "./street-claim.service";

@Module({
  controllers: [StreetClaimController],
  providers: [StreetClaimService],
  exports: [StreetClaimService],
})
export class StreetClaimModule {}
