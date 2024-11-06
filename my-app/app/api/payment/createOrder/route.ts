import { generateToken } from "@/actions/createTokenPaypal";
import axios from "axios";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {

  const { cart } = await req.json();
//לעשות את השורות האלו לפי מבנה של עגלה, לשאול את אביטל
  const units = cart.map((cartItem : any) => ({
    reference_id: cartItem.productId,
    amount: { currency_code: "ILS", value: Number(cartItem.price*cartItem.quantity).toFixed(2) },
  }));

  try {
    const token = await generateToken();

    if (!token) throw new Error("Token not Exists");

    const { data } = await axios({
      method: "POST",
      url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      data: JSON.stringify({
        intent: "CAPTURE",
        purchase_units:[...units],
        // payment_source: {
        //   paypal: {
        //     application_context: {
        //     //   shipping_preference: "SET_PROVIDED_ADDRESS",
        //       user_action: "PAY_NOW",
        //     //   return_url: "https://example.com/returnUrl",
        //     //   cancel_url: "https://example.com/cancelUrl",
        //     },
        //   },
        // },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(
      { success: true, message: "success create Order" , id:data.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "not success create Order", error },
      { status: 500 }
    );
  }
};
