"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

type StatusOfOrderProps = {
  orderId: string;
  statusName: string;
};

export function StatusOfOrder({ orderId, statusName }: StatusOfOrderProps) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<string>(statusName);
  const [responseMessage, setResponseMessage] = useState<string>("");

  if (!session) {
    return <div className="text-gray-800 dark:text-white">Please login</div>;
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
  };

  const handleButton = async (act: string) => {
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
    <div className="flex items-center gap-4">
      <p className="text-lg font-semibold text-gray-800 dark:text-white">
        {status}
      </p>
      
      {status === "Received in System" && (
        <button
          onClick={() => handleButton("Cancelled")}
          className="px-4 py-2 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 rounded-lg hover:from-orange-400 hover:via-purple-400 hover:to-blue-300 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50 dark:focus:ring-purple-600"
        >
          Cancel Order
        </button>
      )}
      {status === "Delivered" && (
        <button
          onClick={() => handleButton("Returned")}
          className="px-4 py-2 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gradient-to-r from-orange-500 via-purple-500 to-blue-400 rounded-lg hover:from-orange-400 hover:via-purple-400 hover:to-blue-300 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50 dark:focus:ring-purple-600"
        >
          Return Order
        </button>
      )}
      
      {responseMessage && <p className="text-red-500 dark:text-red-400">{responseMessage}</p>}
    </div>
  );
}