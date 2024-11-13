import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateBasketballDto {
  @IsOptional()
  @IsNumber()
  league?: number

  @IsOptional()
  @IsString()
  season?: string

  @IsOptional()
  @IsDate()
  date?: Date

  @IsOptional()
  @IsNumber()
  team?: number

  @IsOptional()
  @IsArray()
  players?: any[]

  @IsOptional()
  statistics?: any
}

export class UpdateBasketballDto {
  @IsOptional()
  @IsNumber()
  league?: number

  @IsOptional()
  @IsString()
  season?: string

  @IsOptional()
  @IsDate()
  date?: Date

  @IsOptional()
  @IsNumber()
  team?: number

  @IsOptional()
  @IsArray()
  players?: any[]

  @IsOptional()
  statistics?: any
}
