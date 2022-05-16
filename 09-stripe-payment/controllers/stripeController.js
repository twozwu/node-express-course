const stripe = require("stripe")(process.env.STRIPE_KEY); //後端放私鑰，前端放公鑰

const stripeController = async (req, res) => {
    // console.log(req.body);
  // {
  //   purchase: [
  //     { id: '1', name: 't-shirt', price: 1999 },
  //     { id: '2', name: 'shoes', price: 4999 }
  //   ],
  //   total_amount: 10998,
  //   shipping_fee: 1099
  // }
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    //ps:請從後端取得金額，此處僅為方便測試
    return total_amount + shipping_fee;
  };

  //刷卡
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret }); //返回client_secret給前端確認
};

module.exports = stripeController;
