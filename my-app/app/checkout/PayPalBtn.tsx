"use client"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useUserStore } from '@/providers/userStore';
import axios from "axios";
import { useDeliveryDetailsStore } from '@/providers/deliveryDetailsStrore';
import { useCartStore } from '@/providers/cartStore'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function PayPalBtn() {
  const { deliveryDetails } = useDeliveryDetailsStore();
  const { cart } = useCartStore();
  const router = useRouter()
  const { user, setUser } = useUserStore();
  const addressId = user?.address?.addressId;
 
  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      
      console.log("user", user)


      const { data } = await axios({
        url: "/api/payment/createOrder",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          cart: cart//לבדוק מה באמת המבנה של עגלה, והאם האוביקט עצמו מביא את כל המוצרים
        })
      });
      return data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (d) => {
    // Capture the funds from the transaction.
    try {
      const { data } = await axios({
        url: "/api/payment/capturePayment",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ id: d.orderID, deliveryDetails, cart, addressId }),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    alert(`Transaction completed by`);

    router.push("/userOrders")
  };

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "vertical",
  };

  return (
    <>{deliveryDetails?.isComplited &&
      <PayPalButtons
        style={styles}
        createOrder={createOrder}
        onApprove={onApprove}
      />}</>
  );
}

export default PayPalBtn;
