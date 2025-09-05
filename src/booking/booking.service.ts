import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getCurrentBookingByRoomId(roomId: string) {
    const booking = await this.bookingModel.findOne({
      roomId: roomId,
      status: { $in: ['pending', 'confirmed'] }
    })
    return booking;
  }

  async checkoutRoom(roomId: string, bookingId: string) {
    const room = await this.roomModel.findById(roomId);
    const booking = await this.bookingModel.findById(bookingId);
    if (!room) throw new NotFoundException('Phòng không tồn tại');
    if (!booking) throw new NotFoundException('Booking không tồn tại');
    if (room.status !== 'booked') {
      throw new BadRequestException('Phòng chưa được đặt');
    }
    room.status = 'available';
    booking.status = 'checkedOut';

    await room.save();
    await booking.save();

    return {
      message: 'Checkout thành công',
      room,
      booking,
    };
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
