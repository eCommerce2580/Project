"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

const PaypalProvider = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID!, // יש לשים את ה-clientId משתנה סביבת 
        intent: "capture",
        currency: "ILS",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
};

export default PaypalProvider;
