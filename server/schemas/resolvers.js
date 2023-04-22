const { AuthorizationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthorizationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthorizationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin; // create a new URL object using the "referer" property of the "headers" object in the "context" parameter and extract the origin of the URL
      const order = new Order({ products: args.products }); // create a new "Order" object, passing in an array of product objects as an argument
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        // loop through each product object in the products array
        const product = await stripe.products.create({
          // create a new product object using the Stripe API
          name: product[i].name,
          description: product[i].description,
          images: [`${url}/images/${product[i].image}`],
        });

        const price = await stripe.prices.create({
          // create a new price object using the Stripe API
          product: product.id,
          unit_amount: product[i].price * 100,
          currency: "cad",
        });

        line_items.push({
          // push a new object containing the price ID and a quantity of 1 to the "line_items" array
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        // create a new Stripe checkout session using the Stripe API
        payment_method_types: ["card"], // specify the payment method type
        line_items, // pass in the "line_items" array as an argument
        mode: "payment", // specify that the mode should be "payment"
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`, // specify the success URL
        cancel_url: `${url}/`, // specify the cancel URL
      });

      return { session: session.id }; // return an object containing the ID of the newly created Stripe checkout session
    },
  },
};
