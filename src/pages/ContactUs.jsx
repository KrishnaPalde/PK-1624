import FrameComponent4 from "../components/GetStarted";
import NameSection from "../components/NameSection";
import ContactInfo from "../components/ContactInfo";
import Component1 from "../components/JoinUs";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="w-full h-[168.563rem] relative bg-white overflow-hidden flex flex-col items-end justify-start pt-[3rem] px-[0rem] pb-[58.812rem] box-border gap-[2.437rem] leading-[normal] tracking-[normal] mq750:gap-[1.188rem] mq1100:h-auto">
      <header className="self-stretch flex flex-row items-start justify-center pt-[0rem] px-[1.25rem] pb-[4rem] box-border max-w-full text-left text-[1.188rem] text-black font-paragraph">
        <div className="w-[72rem] flex flex-row items-start justify-between max-w-full gap-[1.25rem] mq1100:flex-wrap">
          <div className="bg-white overflow-hidden flex flex-row items-start justify-start pt-[0.812rem] pb-[0.75rem] pr-[0.312rem] pl-[0.937rem] gap-[1.062rem]">
            <div className="h-[2.188rem] w-[2.188rem] relative rounded-[50%] bg-black" />
            <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
              <a className="[text-decoration:none] relative font-extrabold text-[inherit]">
                Tantra Worlds
              </a>
            </div>
          </div>
          <div className="w-[40.813rem] flex flex-col items-start justify-start pt-[0.281rem] px-[0rem] pb-[0rem] box-border max-w-full text-[1rem] text-gray1-600">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.875rem] mq750:flex-wrap">
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <Link to="/" className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[2.875rem]">
                  Home
                </Link>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[2.125rem]">
                  Blog
                </a>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[3.938rem]">
                  Booking
                </a>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[4.313rem]">
                  About us
                </a>
              </div>
              <div className="flex-1 flex flex-row items-start justify-start py-[1rem] px-[1.25rem] box-border min-w-[5.063rem]">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[5.25rem]">
                  Contact us
                </a>
              </div>
              <div className="rounded-3xs bg-cornflowerblue-100 flex flex-row items-start justify-start py-[1rem] px-[1.25rem] whitespace-nowrap text-white">
                <a className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[2.938rem]">
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <FrameComponent4 />
      <NameSection />
      <ContactInfo />
      <Component1 />
    </div>
  );
};

export default ContactUs;
