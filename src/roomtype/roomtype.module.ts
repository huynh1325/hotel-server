import { Module } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { RoomtypeController } from './roomtype.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Roomtype, RoomtypeSchema } from './schemas/roomtype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roomtype.name, schema: RoomtypeSchema }]),
  ],
  controllers: [RoomtypeController],
  providers: [RoomtypeService],
  exports: [MongooseModule]
})
export class RoomtypeModule {}
