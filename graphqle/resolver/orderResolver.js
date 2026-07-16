import Order from "../../models/order.js";

const orderResolver = {

    Query: {

        orders: async () => {
            return await Order.find();
        },


        order: async (parent, args) => {
            return await Order.findById(args.id);
        },


        userOrders: async (parent, args) => {
            return await Order.find({
                user: args.userId
            });
        }

    },


    Mutation: {

        createOrder: async (parent, args, context) => {

               console.log(args.items);

            const order = new Order({

              user: args.user,

                items: args.items,

                totalAmount: args.totalAmount,

                shippingAddress: args.shippingAddress

            });


            const savedOrder = await order.save();


            return savedOrder;
       

        },


        updateOrderStatus: async (parent, args) => {


            const updatedOrder = await Order.findByIdAndUpdate(

                args.id,

                {
                    orderStatus: args.orderStatus,
                    paymentStatus: args.paymentStatus
                },

                {
                    new:true
                }

            );


            if(!updatedOrder){
                throw new Error("Order not found");
            }


            return updatedOrder;

        },


        deleteOrder: async (parent,args)=>{


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