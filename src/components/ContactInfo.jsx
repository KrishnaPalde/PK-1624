import React from "react";

const ContactInfo = () => {
  return (
    <section className="self-stretch p-20 mt-28 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full max-sm:py-2.5 max-sm:mt-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-10">
            <h2 className="text-2xl leading-9 text-black">Contact Info</h2>
            <p className="mt-6 text-4xl font-bold leading-10 text-black">
              We are always happy to assist you
            </p>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col p-8 text-2xl font-semibold text-black grow max-md:px-5 max-md:mt-10">
                  <h3>Email Address</h3>
                  <div className="shrink-0 mt-6 bg-black h-[3px]" />
                  <p className="mt-7">help@info.com</p>
                  <p className="mt-6 text-xl leading-8">
                    Assistance hours: <br /> Monday - Friday 6 am to 8 pm EST
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-6/12 ml-5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col p-8 text-2xl font-semibold text-black grow max-md:px-5 max-md:mt-10">
                  <h3>Number</h3>
                  <div className="shrink-0 mt-6 bg-black h-[3px]" />
                  <p className="mt-7">(808) 998-34256</p>
                  <p className="mt-6 text-xl leading-8">
                    Assistance hours: <br /> Monday - Friday 6 am to 8 pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
