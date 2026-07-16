import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    image: String,
    price: { 
      type: Number, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    orderItems: { 
      type: [OrderItemSchema], 
      validate: (v) => v.length > 0 },

    shippingAddress: {
      street: { 
        type: String, 
        required: true 
      },
      city: { 
        type: String, 
        required: true 
      },
      state: String,
      postalCode: { 
        type: String, 
        required: true 
      },
      country: { 
        type: String, 
        required: true 
      },
      phone: String,
    },

    paymentMethod: { 
      type: String, 
      enum: ['stripe', 'cash_on_delivery'], 
      required: true 
    },
    paymentResult: {
      id: String, // Stripe payment intent id
      status: String,
      updateTime: String,
      email: String,
    },

    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    discountAmount: { type: Number, default: 0 },
    couponCode: String,
    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    isPaid: { 
      type: Boolean, 
      default: false 
    },
    paidAt: Date,
    isDelivered: { 
      type: Boolean, 
      default: false 
    },
    deliveredAt: Date,
    trackingNumber: String,
  },
  { timestamps: true }
);



const Order = mongoose.model('Order', OrderSchema);
export default Order;
