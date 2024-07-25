import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch h-[32.487rem] bg-gray-300 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[6.737rem] box-border gap-[0.5rem] max-w-full text-left text-[2.375rem] text-white font-dm-sans mq825:pb-[4.375rem] mq825:box-border mq1425:h-auto ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start pt-[7.5rem] px-[9.375rem] pb-[1.25rem] box-border relative gap-[7.125rem] shrink-0 max-w-full mq450:gap-[1.75rem] mq450:pt-[4.875rem] mq450:box-border mq825:gap-[3.563rem] mq825:pl-[2.313rem] mq825:pr-[2.313rem] mq825:box-border mq1425:flex-wrap mq1425:justify-center mq1425:pl-[4.688rem] mq1425:pr-[4.688rem] mq1425:box-border">
        <div className="w-[19.375rem] flex flex-col items-start justify-start gap-[2.5rem] min-w-[19.375rem] mq450:gap-[1.25rem] mq1425:flex-1">
          <div className="flex flex-row items-start justify-start gap-[0.875rem] mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start pt-[0.081rem] px-[0rem] pb-[0rem]">
              <div className="w-[2.375rem] h-[2.388rem] relative shrink-0">
                <div className="absolute top-[1.444rem] left-[0rem] rounded-11xl bg-white w-[0.606rem] h-[0.944rem]" />
                <div className="absolute top-[0rem] left-[0rem] rounded-11xl bg-white w-[0.606rem] h-[0.606rem]" />
                <div className="absolute top-[0.7rem] left-[0.881rem] rounded-11xl bg-white w-[0.606rem] h-[1.688rem]" />
                <div className="absolute top-[0rem] left-[1.769rem] rounded-11xl bg-white w-[0.606rem] h-[2.388rem]" />
              </div>
            </div>
            <h1 className="m-0 relative text-inherit leading-[2.5rem] font-bold font-inherit shrink-0 mq450:text-[1.438rem] mq450:leading-[1.5rem] mq825:text-[1.875rem] mq825:leading-[2rem]">
              Tantra Worlds
            </h1>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[1rem] text-[0.875rem] text-lightgray font-inter">
            <div className="self-stretch relative leading-[1.5rem]">
              A108 Adam Street New York, NY 535022 United States
            </div>
            <div className="self-stretch relative leading-[1.5rem]">
              Phone: +1 5589 55488 55
            </div>
            <div className="self-stretch relative leading-[1.5rem]">
              Email: info@example.com
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[1.5rem]">
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src="/facebook.svg"
            />
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src="/twitter.svg"
            />
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src="/demo.svg"
            />
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
              loading="lazy"
              alt=""
              src="/linkedin.svg"
            />
          </div>
        </div>
        <div className="w-[35.438rem] flex flex-row items-start justify-between min-w-[35.438rem] max-w-full gap-[1.25rem] text-[1.125rem] font-inter lg:min-w-full mq450:flex-wrap mq1425:flex-1">
          <div className="flex flex-col items-start justify-start gap-[1.5rem]">
            <div className="relative leading-[1.5rem] font-semibold inline-block min-w-[7.563rem]">
              Lorem Ipsum
            </div>
            <div className="relative text-[0.875rem] leading-[250%] text-lightgray">
              <p className="m-0">Room with View</p>
              <p className="m-0">Single Room</p>
              <p className="m-0">Luxary Room</p>
              <p className="m-0">Service</p>
              <p className="m-0">Web Development</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[1.5rem]">
            <div className="relative leading-[1.5rem] font-semibold inline-block min-w-[6rem]">
              Quick links
            </div>
            <div className="relative text-[0.875rem] leading-[250%] text-lightgray">
              <p className="m-0">Booking</p>
              <p className="m-0">{`Check In `}</p>
              <p className="m-0">{`Dinning `}</p>
              <p className="m-0">Site Map</p>
              <p className="m-0">Service</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-[1.5rem]">
            <div className="relative leading-[1.5rem] font-semibold inline-block min-w-[5.25rem]">
              Company
            </div>
            <div className="relative text-[0.875rem] leading-[250%] text-silver">
              <p className="m-0">About us</p>
              <p className="m-0">Contact us</p>
              <p className="m-0">How to reach us</p>
              <p className="m-0">Privacy Policy</p>
              <p className="m-0">Terms of use</p>
              <p className="m-0">Cookies</p>
            </div>
          </div>
        </div>
        <img
          className="h-[6.313rem] w-[6.25rem] absolute !m-[0] top-[-3.187rem] left-[calc(50%_-_50px)]"
          loading="lazy"
          alt=""
          src="/back-to-top-btn.svg"
        />
      </div>
      <div className="self-stretch bg-gray-200 flex flex-row items-start justify-center py-[2.375rem] px-[1.25rem] shrink-0 text-center text-[0.875rem] font-quote">
        <div className="w-[19.125rem] relative leading-[1.5rem] inline-block">{`© Copyright Tantra Worlds. All Rights Reserved `}</div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
