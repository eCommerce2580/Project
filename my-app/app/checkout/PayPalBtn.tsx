"use client"
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useUserStore } from '@/providers/userStore';
import axios from "axios";
import { useDeliveryDetailsStore } from '@/providers/deliveryDetailsStrore'; 
import {useCartStore} from '@/providers/cartStore'
 function PayPalBtn() {
const  {deliveryDetails} =useDeliveryDetailsStore();
const {cart}=useCartStore();
const { user, setUser } = useUserStore();
let adressId="0";
if(user?.address?.addressId){
  adressId=user.address.addressId;}
  const createOrder: PayPalButtonsComponentProps["createOrder"] = async () => {
    try {
      const { data } = await axios({
        url: "/api/payment/createOrder",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data:JSON.stringify({
          cart:cart//לבדוק מה באמת המבנה של עגלה, והאם האוביקט עצמו מביא את כל המוצרים
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
    const { data } = await axios({
      url: "/api/payment/capturePayment",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ id:d.orderID,deliveryDetails,cart,adressId }),
    });

   alert(`Transaction completed by`);
  };

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "rect",
    layout: "vertical",
  };

  return (
<>{  deliveryDetails?.isComplited&& 
    <PayPalButtons
      style={styles}
      createOrder={createOrder}
      onApprove={onApprove}
    />}</>   
  );
}

export default PayPalBtn;
