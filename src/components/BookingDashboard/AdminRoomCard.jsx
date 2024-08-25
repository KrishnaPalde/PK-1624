import React from "react";

function AdminRoomCard({ deals, roomType, available, total, price }) {
  return (
    <article className="flex flex-col justify-center p-4 text-center bg-white rounded-lg border-gray-300 border-solid shadow-sm border-[0.5px] min-h-[150px]">
      <header className="flex items-center justify-between w-full gap-10 text-xs font-medium text-green-700">
        {deals && (
          <div className="gap-2 self-stretch px-2 py-0.5 my-auto bg-green-200 rounded">
            {deals} Deals
          </div>
        )}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/75555d7b9658ef0715c7c826a6c24560af0f9d5e17c18395c1eccbf5bd050f80?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
        />
      </header>
      <div className="flex flex-col items-start self-start mt-1 text-2xl font-semibold text-gray-400">
        <h2 className="text-base font-medium text-gray-500">{roomType}</h2>
        <p className="mt-1 leading-none">
          {available}{" "}
          <span className="text-lg font-medium leading-7 text-gray-400">
            /{total}
          </span>
        </p>
        <p className="mt-1 leading-none">
          <span className="text-blue-600">₹ {price}</span>
          <span className="text-base font-medium leading-6 text-gray-400">
            {" "}
            / day
          </span>
        </p>
      </div>
    </article>
  );
}

export default AdminRoomCard;
