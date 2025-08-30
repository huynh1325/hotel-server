import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument, RoomSchema } from '@/rooms/schemas/room.schema';
import { Roomtype, RoomtypeDocument, RoomtypeSchema } from '@/roomtype/schemas/roomtype.schema';
import { Injectable, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
class Seeder {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(Roomtype.name) private roomTypeModel: Model<RoomtypeDocument>,
  ) {}

  async seed() {
    await this.roomModel.deleteMany({});
    await this.roomTypeModel.deleteMany({});

    const [standard, vip] = await this.roomTypeModel.insertMany([
      { name: 'standard', description: 'Phòng tiêu chuẩn', price: 500000 },
      { name: 'vip', description: 'Phòng VIP cao cấp', price: 1000000 },
    ]);

    const rooms: { roomNumber: string; floor: number; status: string; roomType: any }[] = [];

    for (let i = 101; i <= 106; i++) {
      rooms.push({ roomNumber: i.toString(), floor: 1, status: 'available', roomType: standard._id });
    }
    rooms.push({ roomNumber: '107', floor: 1, status: 'available', roomType: vip._id });

    for (let i = 201; i <= 206; i++) {
      rooms.push({ roomNumber: i.toString(), floor: 2, status: 'available', roomType: standard._id });
    }
    rooms.push({ roomNumber: '207', floor: 2, status: 'available', roomType: vip._id });

    for (let i = 301; i <= 305; i++) {
      rooms.push({ roomNumber: i.toString(), floor: 3, status: 'available', roomType: standard._id });
    }
    rooms.push({ roomNumber: '306', floor: 3, status: 'available', roomType: vip._id });

    for (let i = 401; i <= 405; i++) {
      rooms.push({ roomNumber: i.toString(), floor: 4, status: 'available', roomType: standard._id });
    }
    rooms.push({ roomNumber: '406', floor: 4, status: 'available', roomType: vip._id });

    await this.roomModel.insertMany(rooms);
    console.log('Seeded RoomTypes (with price) + Rooms successfully!');
  }
}

@Module({
  imports: [
    AppModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Roomtype.name, schema: RoomtypeSchema },
    ]),
  ],
  providers: [Seeder],
})
class SeederModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(Seeder);
  await seeder.seed();
  await app.close();
}

bootstrap();

// npx ts-node -r tsconfig-paths/register src/seeds/seeder.ts