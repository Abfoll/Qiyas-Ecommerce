import Cart from "../../models/cart.js";
import Product from "../../models/product.js"; 
const calculateTotal = async (items) => {

    let total = 0;

    for (const item of items) {

        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error("Product not found");
        }

        total += product.price * item.quantity;
    }

    return total;

};
const cartResolver = {
    Query: {
        carts: async () => {
            return await Cart.find()
        },

        cart: async (parent, args) => {
            return await Cart.findById(args.id)
        },

        userCart: async (parent, args) => {
            return await Cart.findOne({ user: args.userId })
                .populate("items.product");
        }
    },
    Mutation: {
     createCart: async(parent,args)=>{

    const totalPrice = await calculateTotal(args.items);


    const cart = new Cart({

        user:args.user,

        items:args.items,

        totalPrice

    });


    return await cart.save();

},

addToCart: async(parent,args)=>{

    console.log("ADD CART ARGS:", args);

    let cart = await Cart.findOne({
        user: args.userId
    });

    console.log("FOUND CART:", cart);



    // If user has no cart, create one
    if (!cart) {

        const totalPrice = await calculateTotal([
            {
                product: args.product,
                quantity: args.quantity
            }
        ]);


        const newCart = new Cart({

            user: args.userId,

            items:[
                {
                    product: args.product,
                    quantity: args.quantity,
                    size: args.size,
                    color: args.color
                }
            ],

            totalPrice

        });


        const savedCart = await newCart.save();

        await savedCart.populate("user");
        await savedCart.populate("items.product");

        return savedCart;

    }



    // Check if item already exists
    const existingItem = cart.items.find(
    item =>
        item.product._id
            ? item.product._id.toString() === args.product
            : item.product.toString() === args.product
        &&
        item.size === args.size
        &&
        item.color === args.color
);


    if(existingItem){

        existingItem.quantity += args.quantity;

    }else{

        cart.items.push({

            product: args.product,
            quantity: args.quantity,
            size: args.size,
            color: args.color

        });

    }

cart.totalPrice = await calculateTotal(cart.items);

await cart.save();

return {
    id: cart._id,
    user: cart.user,
    items: cart.items,
    totalPrice: cart.totalPrice
};

},

        updateCartItem: async (parent, args) => {
            const cart = await Cart.findById(args.cartId);
            if (!cart) throw new Error("Cart not found");

            const item = cart.items.id(args.itemId);
            if (!item) throw new Error("Item not found in cart");

            item.quantity = args.quantity;
            cart.totalPrice = await calculateTotal(cart.items);
            
           item.quantity = args.quantity;

cart.totalPrice = await calculateTotal(cart.items);

await cart.save();

return {
    id: cart._id,
    user: cart.user,
    items: cart.items,
    totalPrice: cart.totalPrice
};
        },

       removeCartItem: async (parent, args) => {

    const cart = await Cart.findById(args.cartId);

    if (!cart) {
        throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
        item => item._id.toString() !== args.itemId
    );

    cart.totalPrice = await calculateTotal(cart.items);

    await cart.save();

    return {
        id: cart._id,
        user: cart.user,
        items: cart.items,
        totalPrice: cart.totalPrice
    };

}, deleteCart: async (parent, args) => {
            return await Cart.findByIdAndDelete(args.id);
        }
    }
};

export default cartResolver;