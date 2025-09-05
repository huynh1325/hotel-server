import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Patch('checkout/:roomId')
  async checkoutRoom(
    @Param('roomId') roomId: string,
    @Body('bookingId') bookingId: string,
  ) {
    return this.bookingService.checkoutRoom(roomId, bookingId);
  }

  @Get('room/:roomId')
  async getCurrentBookingByRoom(@Param('roomId') roomId: string) {
    const booking = await this.bookingService.getCurrentBookingByRoomId(roomId);

    if (!booking) {
      throw new NotFoundException('No active booking found for this room');
    }

    return booking;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
