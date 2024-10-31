"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type CancelOrderButtonProps = {
  orderId: string;
  statusName: string;
};

export function CancelAndReturnedButton({ orderId, statusName }: CancelOrderButtonProps) { 
  const { data: session } = useSession(); // Always run this hook
  const [status, setStatus] = useState<string>(statusName); // Always run this hook
  const [responseMessage, setResponseMessage] = useState<string>("");

  // Handle session status once it's available
  if (!session) {
    return <div>You need to log in to cancel your order.</div>;
  }

  const sendMail = async (act: string) => {
    await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user?.name,
        email: session.user?.email,
        message: `${act} order number ${orderId}`,
        subject: `Your order has been ${act}`,
        text: "The payment will be returned to you in the coming days.",
        html: `<p>The payment will be returned to you in the coming days.</p>`,
      }),
    });
  }


  const handleButton = async (act : string) => {
    const body = { orderId, statusName: act };
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus(act);
        try {
          await sendMail(act);
        } catch (error) {
          throw error;
        }
      } else {
        setResponseMessage(`Failed to ${act} the order.`);
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-start gap-4 max-sm:flex-col">
      <div className="flex flex-col">
        <p className="font-normal text-lg text-gray-500">Status:</p>
        <p className="font-semibold text-lg text-green-500">{status}</p>
      </div>
      {status === "Received in System" && (
        <button
          onClick={()=>handleButton("Cancelled")}
          className="rounded-full px-5 py-2 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700 ml-auto"
        >
          Cancel Order
        </button>
      )}
      {status === "Delivered" && (
        <button
          onClick={()=>handleButton("Returned")}
          className="rounded-full px-5 py-2 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700 ml-auto"
        >
          Return an order
        </button>
      )}

      {responseMessage && <p className="mt-2 text-red-500">{responseMessage}</p>}
    </div>
  );
}
