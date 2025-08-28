import { IsNotEmpty, IsString } from 'class-validator';

export class AddGuestDto {
  @IsNotEmpty()
  @IsString()
  guestName: string;

  @IsNotEmpty()
  @IsString()
  guestPhone: string;

  @IsNotEmpty()
  paymentMethod: string;
}

export class CreateRoomDto {}