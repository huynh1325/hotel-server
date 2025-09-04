import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './schemas/booking.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from '@/rooms/schemas/room.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Room.name) private roomModel: Model<Room>
  ) {}

  async create(createBookingDto: CreateBookingDto) {

    const room = await this.roomModel.findById(createBookingDto.roomId);
    if (!room) throw new NotFoundException('Room not found')

    const { roomId, customerName, citizenId, rentalsDays, stayType, checkInDate, checkOutDate, paymentMethod, totalPrice } = createBookingDto;
    const booking = await this.bookingModel.create({
      roomId, customerName, citizenId, rentalsDays, stayType, checkInDate, checkOutDate, paymentMethod, totalPrice
    })
    
    room.status = 'booked';
    await room.save();

    return booking;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
