import React from "react";



const ContactForm = () => {
 
  return (
    <form className="flex flex-col max-w-full px-5 mt-10">
      <div className="flex flex-wrap justify-between gap-5">
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="firstName"
            className="text-sm font-medium leading-5 text-slate-700"
          >
            First name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            className="px-4 py-3 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[120px]">
          <label
            htmlFor="lastName"
            className="text-sm font-medium leading-5 text-slate-700"
          >
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="px-4 py-3 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
          />
        </div>
      </div>
      <label
        htmlFor="email"
        className="max-w-full mt-6 text-sm font-medium leading-5 text-slate-700"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@company.com"
        className="px-4 py-3 mt-1.5 text-base leading-6 text-gray-500 whitespace-nowrap bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-w-full"
      />
      <label
        htmlFor="phone"
        className="max-w-full mt-6 text-sm font-medium leading-5 text-slate-700"
      >
        Phone number
      </label>
      <div className="flex mt-1.5 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
        <div className="flex justify-between py-3 pl-4 pr-3 text-gray-900 whitespace-nowrap" >
          <span>US</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
            alt=""
            className="w-5 my-auto shrink-0 aspect-square"
            
          />
        </div>
        <input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="flex-1 py-3 pr-4 text-gray-500"
        />
      </div>
      <label
        htmlFor="message"
        className="max-w-full mt-6 text-sm font-medium leading-5 text-slate-700"
      >
        Message
      </label>
      <textarea
        id="message"
        className="shrink-0 mt-1.5 h-32 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-w-full"
      />
      <div className="flex gap-3 mt-6 text-base font-medium text-slate-700 max-md:flex-wrap">
        <input
          type="checkbox"
          id="privacy"
          className="w-5 h-5 my-auto bg-white border border-gray-300 border-solid rounded-md shrink-0"
        />
        <label htmlFor="privacy" className="flex-1 max-w-full">
          You agree to our friendly{" "}
          <span className="underline">privacy policy</span>
          <span className="text-gray-500">.</span>
        </label>
      </div>
      <button
        type="submit"
        className="max-w-full px-5 py-3 mt-8 text-base font-semibold text-white border border-solid rounded-lg shadow-sm bg-sky-400 border-sky-400"
      >
        Leave us a Message
      </button>
    </form>
  );
};

export default ContactForm;
