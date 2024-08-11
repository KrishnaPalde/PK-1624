import React from "react";

function PriceDetail({ label, amount }) {
  return (
    <div className="flex gap-10 justify-between items-start mt-4 w-full max-md:max-w-full">
      <div className="font-medium">{label}</div>
      <div className="font-semibold">{amount}</div>
    </div>
  );
}

export default PriceDetail;
