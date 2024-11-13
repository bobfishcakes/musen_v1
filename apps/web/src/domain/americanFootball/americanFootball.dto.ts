import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator'

export class CreateAmericanFootballDto {
  @IsOptional()
  @IsNumber()
  league?: number

  @IsOptional()
  @IsNumber()
  season?: number

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

export class UpdateAmericanFootballDto {
  @IsOptional()
  @IsNumber()
  league?: number

  @IsOptional()
  @IsNumber()
  season?: number

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
