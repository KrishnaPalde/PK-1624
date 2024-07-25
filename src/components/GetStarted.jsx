import PropTypes from "prop-types";

const FrameComponent4 = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-[0rem] pb-[5.837rem] pr-[2rem] pl-[1.25rem] box-border max-w-full shrink-0 text-left text-[1.5rem] text-black font-paragraph ${className}`}
    >
      <div className="w-[69.875rem] flex flex-col items-start justify-start gap-[0.006rem] max-w-full">
        <h3 className="m-0 w-[9.638rem] relative text-inherit leading-[2.25rem] font-normal font-inherit inline-block [transform:_rotate(0.1deg)] whitespace-nowrap mq450:text-[1.188rem] mq450:leading-[1.813rem]">
          Get Started
        </h3>
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px] text-[3.75rem]">
          <div className="flex-1 flex flex-col items-start justify-start pt-[1.993rem] px-[0rem] pb-[0rem] box-border min-w-[44.625rem] max-w-full mq1100:min-w-full">
            <h1 className="m-0 self-stretch relative text-inherit leading-[5.063rem] font-bold font-inherit shrink-0 mq450:text-[2.25rem] mq450:leading-[3.063rem] mq750:text-[3rem] mq750:leading-[4.063rem]">
              <p className="m-0">{`Get in touch with us. `}</p>
              <p className="m-0">We're here to assist you.</p>
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start gap-[1.506rem] shrink-0 ml-[-1.9rem] mq750:ml-0">
            <img
              className="w-[3.125rem] h-[3.106rem] relative"
              loading="lazy"
              alt=""
              src="/fb.svg"
            />
            <img
              className="w-[3.125rem] h-[3.106rem] relative"
              loading="lazy"
              alt=""
              src="/insta.svg"
            />
            <img
              className="w-[3.125rem] h-[3.106rem] relative"
              loading="lazy"
              alt=""
              src="/twitter1.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent4;
