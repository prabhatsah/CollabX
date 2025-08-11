import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class SelectOrganizationDto {
  @ApiProperty({
    description: "Auth user ID from initial login",
    example: "clxxxxx",
  })
  @IsString()
  @IsNotEmpty()
  authUserId: string;

  @ApiProperty({
    description: "Selected organization ID",
    example: "org_123",
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;
}
