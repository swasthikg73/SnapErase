import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import transcationModel from "../models/transactionModel.js";

// API controller function to Manage Clerk User with database
//http:localhost:3200/api/user/webhooks
const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    // console.log(req.body);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: error });
  }
};

//Api to get User credits

const userCredits = async (req, res) => {
  //console.log(req.user.clerkId);

  try {
    const userData = await userModel.findOne({ clerkId: req.user.clerkId });
    return res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    return res.json({ success: false, message: "Error found" });
  }
};

//gateway initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAYKEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//API to mke payments tp credit

const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const clerkId = req.user.clerkId;

    const userData = await userModel.findOne({ clerkId: clerkId });

    if (!userData) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 500;
        amount = 250;
        break;

      default:
        break;
    }

    date = Date.now();

    //Creating Transcation
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transcationModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newTransaction._id,
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, error: error });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: "Error" });
  }
};

const verifyPayment = async (req, res) => {
  // console.log(req.body);

  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    console.log("order info :  ", orderInfo);

    if (orderInfo.status === "paid") {
      const transactionData = await transcationModel.findById(
        orderInfo.receipt
      );

      //console.log("Transaction data :  ", transactionData);

      if (transactionData.payment) {
        // Incase of failure this entire API will never called
        // transcation.payment by default id "false" for success payments
        return res.json({ success: false, error: "Payment failed" });
      }

      //Adding credits to the user
      const userData = await userModel.findOne({
        clerkId: transactionData.clerkId,
      });

      var creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id, { creditBalance });

      //making the payment true

      await transcationModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      return res.json({ success: true, message: "Credits Added" });
    }
  } catch (error) {
    console.log(error);

    return res.json({ success: false, error: error.message });
  }
};

export { clerkWebhooks, userCredits, paymentRazorpay, verifyPayment };
