import PropTypes from "prop-types";

const WhoWeAre = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch bg-white overflow-hidden flex flex-col items-start justify-start pt-[2.687rem] px-[6.25rem] pb-[1.312rem] box-border gap-[2.062rem] max-w-full z-[1] mt-[-0.313rem] text-left text-[2.25rem] text-heading font-inter mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:pb-[1.25rem] mq450:box-border mq825:gap-[1rem] mq825:pl-[3.125rem] mq825:pr-[3.125rem] mq825:box-border ${className}`}
    >
      <div className="w-[54.438rem] flex flex-row items-start justify-between max-w-full gap-[1.25rem] lg:flex-wrap">
        <div className="w-[39.563rem] flex flex-col items-start justify-start pt-[0.437rem] px-[0rem] pb-[0rem] box-border max-w-full">
          <h1 className="m-0 self-stretch relative text-inherit font-bold font-inherit mq450:text-[1.375rem] mq825:text-[1.813rem]">
            Explore Our Guest Rooms
          </h1>
        </div>
        <img
          className="h-[3.313rem] w-[5.188rem] relative object-cover"
          loading="lazy"
          alt=""
          src="/dot-smoke-1-1@2x.png"
        />
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.875rem] max-w-full text-[2.813rem] text-steelblue font-icon-big">
        <div className="h-[19.063rem] w-[37.813rem] relative max-w-full">
          <div className="absolute top-[0rem] left-[0rem] rounded-11xl bg-aliceblue w-[26.063rem] flex flex-col items-start justify-start pt-[2.187rem] pb-[4rem] pr-[1.25rem] pl-[3.125rem] box-border gap-[1.25rem] max-w-full">
            <div className="w-[26.063rem] h-[19.063rem] relative rounded-11xl bg-aliceblue hidden max-w-full" />
            <h1 className="m-0 w-[2.5rem] h-[2.813rem] relative text-inherit font-normal font-inherit inline-block min-w-[2.5rem] z-[1] mq450:text-[1.688rem] mq825:text-[2.25rem]">
              
            </h1>
            <blockquote className="m-0 w-[14.813rem] relative text-[1.375rem] leading-[1.813rem] inline-block italic font-semibold font-quote text-darkslategray z-[1] mq450:text-[1.125rem] mq450:leading-[1.438rem]">
              “The best apartment service in Dehradhun, really like it..”
            </blockquote>
            <h2 className="m-0 w-[13.594rem] relative text-[1.563rem] font-normal font-heading-standar text-sandybrown inline-block z-[1] mq450:text-[1.25rem]">
              Najwa Shihab
            </h2>
          </div>
          <div className="absolute top-[0rem] left-[19.844rem] w-[17.969rem] h-[17.25rem] overflow-hidden flex flex-row items-start justify-start py-[1.875rem] px-[0rem] box-border z-[1]">
            <div className="h-[13.5rem] flex-1 relative rounded-11xl max-w-full flex items-center justify-center">
              <img
                className="h-full flex-1 overflow-hidden object-contain absolute left-[0rem] top-[0.625rem] w-full [transform:scale(1.231)]"
                loading="lazy"
                alt=""
                src="/rectangle-2@2x.png"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-row items-start justify-start py-[1.875rem] px-[0rem] box-border min-w-[11.688rem]">
          <div className="h-[13.5rem] flex-1 relative rounded-11xl max-w-full flex items-center justify-center">
            <img
              className="h-full flex-1 overflow-hidden object-contain absolute left-[0rem] top-[0.625rem] w-full [transform:scale(1.231)]"
              loading="lazy"
              alt=""
              src="/rectangle-2-1@2x.png"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-row items-start justify-start py-[1.875rem] px-[0rem] box-border min-w-[11.688rem]">
          <div className="h-[13.5rem] flex-1 relative rounded-11xl max-w-full flex items-center justify-center">
            <img
              className="h-full flex-1 overflow-hidden object-contain absolute left-[0rem] top-[0.625rem] w-full [transform:scale(1.231)]"
              loading="lazy"
              alt=""
              src="/rectangle-2-2@2x.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

WhoWeAre.propTypes = {
  className: PropTypes.string,
};

export default WhoWeAre;


