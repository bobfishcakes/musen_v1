import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class LiveEventDto {
  @IsString()
  id: string

  @IsString()
  name: string

  @IsString()
  startTime: string

  @IsString()
  endTime: string

  @IsObject()
  league: { id: number; name: string }

  @IsObject()
  teams: {
    home: { id: number; name: string }
    away: { id: number; name: string }
  }
}

export class SportingEventCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  startTime: string

  @IsString()
  @IsNotEmpty()
  endTime: string

  @IsString()
  @IsOptional()
  description?: string
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
}
