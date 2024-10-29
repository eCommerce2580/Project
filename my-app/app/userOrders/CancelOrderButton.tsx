"use client"; // This makes it a client-side component
import { useState } from "react";

type CancelOrderButtonProps = {
  orderId: string;
  statusId: string;
  statusName: string;
};

export function CancelOrderButton({ orderId, statusName }: CancelOrderButtonProps) {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [status, setStatus] = useState<string>(statusName);

  const handleCancel = async () => {
    if (statusName !== "Received in System") {
      setResponseMessage("The order has been delivered, you can't cancel it. Sorry!");
      return;
    }

    const body = { orderId, statusName: "Cancelled" };

    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setResponseMessage("Order canceled successfully.");
        console.log(res);
      } else {
        setResponseMessage("Failed to change status.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-start gap-4 max-sm:flex-col">
      {/* Status Section */}
      <div className="flex flex-col">
        <p className="font-normal text-lg text-gray-500">Status:</p>
        <p className="font-semibold text-lg text-green-500">{status}</p>
      </div>
      
      {/* Cancel Order Button */}
      {statusName === "Received in System" && (
        <button
          className="rounded-full px-5 py-2 bg-indigo-600 shadow-sm text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700 ml-auto" // הוספת ml-auto כדי לדחוף את הכפתור לימין
        >
          Cancel Order
        </button>
      )}

      {/* Response Message */}
      {responseMessage && <p className="mt-2 text-red-500">{responseMessage}</p>}
    </div>
  );
}
