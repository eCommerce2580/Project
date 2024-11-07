
import React from "react";
import DeliveryDetails from "./DeliveryDetails";
import PayPalBtn from "./PayPalBtn";

export default function Checkout() {

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <  DeliveryDetails />
    <  PayPalBtn />
    </section>
  );
}