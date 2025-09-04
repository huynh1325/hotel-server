import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Room } from 'src/rooms/schemas/room.schema';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
  roomId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  citizenId: string;

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;

  // @Prop({ required: true, default: 'reserved' })
  // status: string;
  
  @Prop({ required: true, default: 'banking' })
  paymentMethod: string;
  
  @Prop()
  note: string;

  @Prop()
  totalPrice: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
