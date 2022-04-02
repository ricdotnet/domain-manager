import { DataTransferObject } from "@envuso/core/Routing";
import { IsIP, IsString } from "class-validator";

export class IPV4Dto extends DataTransferObject {
  @IsString()
  domainName: string;

  @IsString()
  subDomain: string;

  @IsIP(4)
  ipAddress: string;
}
