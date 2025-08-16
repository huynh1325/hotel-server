import { Injectable } from '@nestjs/common';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Injectable()
export class RoomtypeService {
  create(createRoomtypeDto: CreateRoomtypeDto) {
    return 'This action adds a new roomtype';
  }

  findAll() {
    return `This action returns all roomtype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomtype`;
  }

  update(id: number, updateRoomtypeDto: UpdateRoomtypeDto) {
    return `This action updates a #${id} roomtype`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomtype`;
  }
}
