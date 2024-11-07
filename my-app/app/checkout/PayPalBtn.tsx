"use client";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useUserStore } from "@/providers/userStore";
import axios from "axios";
import { useDeliveryDetailsStore } from "@/providers/deliveryDetailsStrore";
import { useCartStore } from "@/providers/cartStore";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function PayPalBtn() {
  const { deliveryDetails } = useDeliveryDetailsStore();
  const { cart, setCart } = useCartStore();
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const addressId = user?.address?.addressId;

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const { data } = await axios.post("/api/payment/createOrder", {
        cart,
      });
      return data.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (d) => {
    console.log("adress id is",addressId)
    try {
      await axios.post("/api/payment/capturePayment", {
        id: d.orderID,
        deliveryDetails,
        cart,
        addressId,
      });
      localStorage.setItem("cart", "");
      setCart([]);
      alert("Transaction completed successfully");
      router.push("/userOrders");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "vertical",
    color: theme === "dark" ? "silver" : "blue",
    height: 40,
    color: theme === "dark" ? "silver" : "blue",
    height: 40,
  };

  return (
    <>
      {deliveryDetails?.isComplited && (
        <div
          className={`p-6 rounded-lg shadow-lg flex justify-center ${
            theme === "dark" ? "bg-gray-900 text-white" : ""
          }`}
        >
          <PayPalButtons
            style={styles}
            createOrder={createOrder}
            onApprove={onApprove}
            forceReRender={[theme]}
          />
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg flex justify-center ${
            theme === "dark" ? "bg-gray-900 text-white" : ""
          }`}
        >
          <PayPalButtons
            style={styles}
            createOrder={createOrder}
            onApprove={onApprove}
            forceReRender={[theme]}
          />
        </div>
      )}
    </>
  );
}

export default PayPalBtn;

