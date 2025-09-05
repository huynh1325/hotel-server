import { Booking } from '@/booking/schemas/booking.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Roomtype } from 'src/roomtype/schemas/roomtype.schema';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  roomNumber: string;

  @Prop({ required: true })
  floor: string;

  @Prop({ required: true, default: 'available' })
  status: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Roomtype.name }] })
  roomType: mongoose.Schema.Types.ObjectId[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
