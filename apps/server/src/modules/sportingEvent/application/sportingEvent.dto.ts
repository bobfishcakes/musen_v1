import { IsOptional, IsString } from 'class-validator'

export class SportingEventCreateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  creatorId?: string

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

export class SportingEventUpdateDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  startTime?: string

  @IsString()
  @IsOptional()
  endTime?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  creatorId?: string

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
