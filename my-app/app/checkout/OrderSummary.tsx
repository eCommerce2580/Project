// components/OrderSummary.tsx
import React from "react";

export default function OrderSummary() {
  return (
    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
      <div className="flow-root">
        <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
          <SummaryRow label="Subtotal" amount="$8,094.00" />
          <SummaryRow label="Savings" amount="0" highlight="green-500" />
          <SummaryRow label="Store Pickup" amount="$99" />
          <SummaryRow label="Tax" amount="$199" />
          <SummaryRow label="Total" amount="$8,392.00" bold />
        </div>
      </div>
      <div className="space-y-3">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Proceed to Payment
        </button>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          One or more items in your cart require an account.{" "}
          <a
            href="#"
            title=""
            className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
          >
            Sign in or create an account now.
          </a>
        </p>
      </div>
    </div>
  );
}

interface SummaryRowProps {
  label: string;
  amount: string;
  highlight?: string;
  bold?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  amount,
  highlight = "gray-900",
  bold = false,
}) => (
  <dl className="flex items-center justify-between gap-4 py-3">
    <dt
      className={`text-base font-normal text-gray-500 dark:text-gray-400 ${
        bold ? "font-bold text-gray-900 dark:text-white" : ""
      }`}
    >
      {label}
    </dt>
    <dd className={`text-base font-medium text-${highlight} dark:text-white`}>
      {amount}
    </dd>
  </dl>
);
