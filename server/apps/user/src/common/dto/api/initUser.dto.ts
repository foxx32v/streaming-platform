import { IsString, IsUUID } from 'class-validator';
import { IsUserName } from '../../urils';

export class InitUserDto {
  @IsString()
  @IsUserName()
  'userName': string;
}