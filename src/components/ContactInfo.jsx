import InfoItems from "./InfoItems";
import PropTypes from "prop-types";

const ContactInfo = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-end justify-between pt-[5rem] pb-[7rem] pr-[7.75rem] pl-[12.75rem] box-border bg-[url('/public/contact-info@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full shrink-0 gap-[1.25rem] text-left text-[1.5rem] text-black font-paragraph mq450:pt-[3.25rem] mq450:px-[1.25rem] mq450:pb-[4.563rem] mq450:box-border mq1275:flex-wrap mq1275:justify-center mq750:pl-[6.375rem] mq750:pr-[3.875rem] mq750:box-border ${className}`}
    >
      <div className="w-[22.063rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[6.75rem] box-border min-h-[16.375rem] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
          <h3 className="m-0 relative text-inherit leading-[2.25rem] font-normal font-inherit mq450:text-[1.188rem] mq450:leading-[1.813rem]">
            Contact Info
          </h3>
          <h1 className="m-0 self-stretch relative text-[2.25rem] leading-[130%] font-bold font-inherit mq450:text-[1.375rem] mq450:leading-[1.75rem] mq750:text-[1.813rem] mq750:leading-[2.313rem]">
            We are always happy to assist you
          </h1>
        </div>
      </div>
      <InfoItems emailAddress="Email Address" helpinfocom="help@info.com" />
      <InfoItems
        emailAddress="Number"
        helpinfocom="(808) 998-34256"
        propWidth="15.375rem"
        propPadding="unset"
      />
    </section>
  );
};

ContactInfo.propTypes = {
  className: PropTypes.string,
};

export default ContactInfo;
