import PropTypes from "prop-types";

const ContactInfo = ({ className = "" }) => {
  return (
    <div
      className={`max-w-full flex flex-row flex-wrap items-end justify-start pt-[60px] pb-[84px] pl-[153px] pr-[93px] box-border gap-[75.7px] bg-[url('/public/contact-info@3x.png')] bg-cover bg-no-repeat bg-[top] leading-[normal] tracking-[normal] text-left text-base-5 text-black font-inter mq450:gap-[19px] mq450:pl-5 mq450:pr-5 mq450:box-border mq550:gap-[38px] mq550:pl-[76px] mq550:pr-[46px] mq550:box-border ${className}`}
    >
      <div className="h-[196px] w-[264.8px] flex flex-col items-start justify-start text-[18px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[18px]">
          <a className="[text-decoration:none] relative leading-[27px] text-[inherit] inline-block min-w-[105px]">
            Contact Info
          </a>
          <h2 className="m-0 self-stretch relative text-[27px] leading-[130%] font-bold font-[inherit] mq450:text-[22px] mq450:leading-[28px]">
            We are always happy to assist you
          </h2>
        </div>
      </div>
      <div className="w-[233.3px] flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-[19.2px]">
        <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[114px]">
          Email Address
        </a>
        <div className="w-[20.3px] h-[2.3px] relative bg-black" />
        <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[122px] whitespace-nowrap">
          help@info.com
        </a>
        <div className="relative text-mini leading-[24px]">
          <p className="m-0">{`Assistance hours: `}</p>
          <p className="m-0">Monday - Friday 6 am to 8 pm EST</p>
        </div>
      </div>
      <div className="w-[184.5px] flex flex-col items-start justify-start gap-[19.2px]">
        <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[65px]">
          Number
        </a>
        <div className="w-[20.3px] h-[2.3px] relative bg-black" />
        <a className="[text-decoration:none] relative font-semibold text-[inherit]">
          (808) 998-34256
        </a>
        <div className="relative text-mini leading-[24px]">
          <p className="m-0">{`Assistance hours: `}</p>
          <p className="m-0">Monday - Friday 6 am to 8 pm EST</p>
        </div>
      </div>
    </div>
  );
};

ContactInfo.propTypes = {
  className: PropTypes.string,
};

export default ContactInfo;
