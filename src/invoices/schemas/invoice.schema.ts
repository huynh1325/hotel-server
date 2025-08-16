import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Booking } from 'src/booking/schemas/booking.schema';
import { Room } from 'src/rooms/schemas/room.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({ timestamps: true })
export class Invoice {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name, required: true })
    roomId: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Booking.name, required: true })
    bookingId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    checkInDate: Date;

    @Prop({ required: true })
    checkOutDate: Date;
    
    @Prop({ required: true })
    roomCharge: number;
    
    @Prop({ required: true })
    serviceCharge: number;

    @Prop({ required: true })
    totalPrice: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);