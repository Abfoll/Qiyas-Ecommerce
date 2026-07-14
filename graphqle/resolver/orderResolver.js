import Order from "../../models/order.js";
import context from "../context/index.js";


const orderResolver = {
Query:{

    orders:async()=>{

        return await Order.find()
            .populate("user")
            .populate("items.product");

    },


    order:async(parent,args)=>{

        return await Order.findById(args.id)
            .populate("user")
            .populate("items.product");

    },


    userOrders:async(parent,args)=>{

        return await Order.find({
            user:args.userId
        })
        .populate("user")
        .populate("items.product");

    }

},



    Mutation:{

        createOrder:async(parent,args,context)=>{
        if(!context.user){
            throw new Error( " Authentication required");
        }

            const order = new Order({

                user:args.user,

                items:args.items,

                totalAmount:args.totalAmount,

                shippingAddress:args.shippingAddress

            });



            const savedOrder = await order.save();



            return await Order.findById(savedOrder._id)

                .populate("user")

                .populate("items.product");


        },

        updateOrderStatus:async(parent,args)=>{


            const updatedOrder = await Order.findByIdAndUpdate(

                args.id,

                {

                    orderStatus:args.orderStatus,

                    paymentStatus:args.paymentStatus

                },

                {

                    new:true

                }

            );



            return await Order.findById(updatedOrder._id)

                .populate("user")

                .populate("items.product");


        },

        deleteOrder:async(parent,args)=>{


            const deletedOrder = await Order.findByIdAndDelete(

                args.id

            );


            if(!deletedOrder){

                throw new Error("Order not found");

            }


            return deletedOrder;


        }


    }


};
export default orderResolver;