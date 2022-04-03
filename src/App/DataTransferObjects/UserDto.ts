import { DataTransferObject } from "@envuso/core/Routing";
import { IsEmail, IsString } from "class-validator";

export class User extends DataTransferObject {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
