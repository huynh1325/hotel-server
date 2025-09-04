import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Room, RoomSchema } from '@/rooms/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }, { name: Room.name, schema: RoomSchema }])
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
