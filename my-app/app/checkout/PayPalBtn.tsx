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

function PayPalBtn() {
  const { deliveryDetails } = useDeliveryDetailsStore();
  const { cart, setCart } = useCartStore();
  const router = useRouter();
  const { user } = useUserStore();
  const addressId = user?.address?.addressId;
  const { theme } = useTheme();

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
    color: theme === "dark" ? "silver" : "blue", // צבע הכפתור בהתאם לתמה
    height: 40,
    
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg flex justify-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {deliveryDetails?.isComplited && (
        <PayPalButtons
          style={styles}
          createOrder={createOrder}
          onApprove={onApprove}
          forceReRender={[theme]} // מעדכן את הכפתורים לפי התמה
        />
      )}
    </div>
  );
}

export default PayPalBtn;


// "use client";
// import {
//   PayPalButtons,
//   PayPalButtonsComponentProps,
// } from "@paypal/react-paypal-js";
// import { useUserStore } from "@/providers/userStore";
// import axios from "axios";
// import { useDeliveryDetailsStore } from "@/providers/deliveryDetailsStrore";
// import { useCartStore } from "@/providers/cartStore";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// function PayPalBtn() {
//   const { deliveryDetails } = useDeliveryDetailsStore();
//   const { cart, setCart } = useCartStore();
//   const router = useRouter();
//   const { user, setUser } = useUserStore();
//   const addressId = user?.address?.addressId;

//   const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
//     try {
//       console.log("user", user);

//       const { data } = await axios({
//         url: "/api/payment/createOrder",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify({
//           cart: cart, //לבדוק מה באמת המבנה של עגלה, והאם האוביקט עצמו מביא את כל המוצרים
//         }),
//       });
//       return data.id;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };

//   const onApprove: PayPalButtonsComponentProps["onApprove"] = async (d) => {
//     // Capture the funds from the transaction.

//     try {
//       const { data } = await axios({
//         url: "/api/payment/capturePayment",
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         data: JSON.stringify({
//           id: d.orderID,
//           deliveryDetails,
//           cart,
//           addressId,
//         }),
//       });
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//     localStorage.setItem("cart", "");
//     setCart([]);

//     alert(`Transaction completed by`);

//     router.push("/userOrders");
//   };

//   const styles: PayPalButtonsComponentProps["style"] = {
//     shape: "rect",
//     layout: "vertical",
//   };

//   return (
//     <>
//       {deliveryDetails?.isComplited && (
//         <PayPalButtons
//           style={styles}
//           createOrder={createOrder}
//           onApprove={onApprove}
//         />
//       )}
//     </>
//   );
// }

// export default PayPalBtn;