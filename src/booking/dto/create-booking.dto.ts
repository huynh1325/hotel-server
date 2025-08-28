import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  citizenId: string;

  @IsNotEmpty()
  checkInDate: Date;

  @IsNotEmpty()
  checkOutDate: Date;

  @IsNotEmpty()
  paymentMethod: string;
}