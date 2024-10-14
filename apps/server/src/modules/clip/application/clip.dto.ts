import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ClipCreateDto {
  @IsString()
  @IsOptional()
  url?: string

  @IsString()
  @IsOptional()
  creationTime?: string

  @IsString()
  @IsOptional()
  streamId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class ClipUpdateDto {
  @IsString()
  @IsOptional()
  url?: string

  @IsString()
  @IsOptional()
  creationTime?: string

  @IsString()
  @IsOptional()
  streamId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
