import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Menu } from 'src/menu/schemas/menu.schema';
import { Order } from 'src/order/schemas/order.schema';

export type OrderdetailDocument = HydratedDocument<Orderdetail>;

@Schema({ timestamps: true })
export class Orderdetail {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Order.name, required: true })
    orderId: mongoose.Schema.Types.ObjectId;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Menu.name, required: true })
    itemId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;
}

export const OrderdetailSchema = SchemaFactory.createForClass(Orderdetail);