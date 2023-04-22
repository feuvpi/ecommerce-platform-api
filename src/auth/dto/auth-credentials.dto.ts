import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class AuthCredentialsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  _id: Types.ObjectId;
}
