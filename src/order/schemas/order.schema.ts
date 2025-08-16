import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Booking } from 'src/booking/schemas/booking.schema';
import { Room } from 'src/rooms/schemas/room.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Booking.name, required: true })
    bookingId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
    roomId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);