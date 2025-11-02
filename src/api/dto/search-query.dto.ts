import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

interface TransformValue {
  value: unknown;
}
export class SearchQueryDto {
  @Transform(({ value }: TransformValue) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(128)
  q: string;
}
