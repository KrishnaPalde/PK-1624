import React from "react";
import PaymentButton from '../components/PaymentButton';

function HotelCard({
  imageUrl,
  imageCount,
  title,
  description,
  guestCount,
  rating,
  price,
}) {
  return (
    <article className="mt-8 shadow-[0px_4px_16px_rgba(17,34,17,0.05)] max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
          <div className="flex relative flex-col grow items-end px-16 pt-2 pb-20 text-xs font-medium rounded-xl aspect-[1.09] text-neutral-900">
            <img
              loading="lazy"
              src={imageUrl}
              alt={title}
              className="absolute inset-0 object-cover size-full"
            />
            <div className="relative px-2 py-1 bg-white bg-opacity-50 rounded-lg">
              {imageCount} images
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full ">
          <div className="flex flex-col items-start w-full p-2 bg-white rounded-none grow max-md:px-5 max-md:max-w-full">
            <div className="max-md:max-w-full">
              <div className="flex gap-2 max-md:flex-col">
                <div className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-xs font-medium grow text-neutral-900 max-md:mt-6">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="mt-1.5">{description}</p>
                    <div className="flex self-start gap-3 p-px mt-3 text-right text-neutral-900">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fe3424ec5f6c7f0ad3521552c86e462283056e6067d93a37bc9133ff225abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                        alt=""
                        className="shrink-0 self-start w-3 aspect-[0.93]"
                      />
                      <div>
                        <span className="font-bold leading-4 text-neutral-900">
                          {guestCount}
                        </span>{" "}
                        <span className="leading-4 text-neutral-900">
                          Guest
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mt-3">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/044785a615b1f7f131d93e46c5117867f97324253bac49673bec1f8acab3890f?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                        alt={`${rating} Star Rating`}
                        className="shrink-0 w-20 aspect-[5]"
                      />
                      <div>{rating} Star</div>
                    </div>
                    <div className="shrink-0 mt-3 rounded border border-sky-400 border-solid h-[5px]" />
                  </div>
                </div>
                <div className="flex flex-col w-3/12 ml-5 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-xs font-medium text-neutral-900 max-md:mt-6">
                    <div>starting from</div>
                    <div className="text-2xl font-bold text-right text-blue-600">
                      <span className="text-blue-600">₹</span>
                      <span className="leading-7 text-blue-600">{price}</span>
                      <span className="text-sm leading-4 text-blue-600">
                        {" "}
                        /night
                      </span>
                    </div>
                    <div className="text-right">excl. tax</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full gap-5 mt-12 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <button className="flex flex-col items-start justify-center px-4 py-2 border border-solid rounded border-sky-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ee71608d3c8d6910a3e19d9f642eb467521a493c980ade184243c8be07799a8?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                  alt=""
                  className="w-5 aspect-square"
                />
              </button>
              <div className="flex justify-center gap-5 text-xl text-center">
                <button className="px-4 py-4 border-2 border-solid rounded text-sky-400 border-sky-400">
                  view Detail
                </button>
                <button className="px-4 py-4 text-white rounded whitespace-nowrap bg-sky-400">
                  Next
                </button>
                <PaymentButton amount={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;
