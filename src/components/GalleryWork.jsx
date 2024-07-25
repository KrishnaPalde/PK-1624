import PropTypes from "prop-types";

const GalleryWork = ({ className = "" }) => {
  return (
    <div
      className={`ml-[-0.063rem] self-stretch bg-white overflow-hidden flex flex-col items-center justify-start py-[6.25rem] px-[1.25rem] box-border gap-[2.187rem] max-w-full text-center text-[1rem] text-midnightblue font-inter lg:pt-[4.063rem] lg:pb-[4.063rem] lg:box-border mq825:gap-[1.063rem] mq825:pt-[2.625rem] mq825:pb-[2.625rem] mq825:box-border ${className}`}
    >
      <div className="w-[45rem] overflow-hidden flex flex-col items-center justify-start gap-[1.25rem] max-w-full">
        <b className="self-stretch relative tracking-[0.15em] uppercase">
          Gallery of the best apartment rooms
        </b>
        <h1 className="m-0 self-stretch relative text-[2.25rem] font-bold font-inherit text-heading mq450:text-[1.375rem] mq825:text-[1.813rem]">
          Apartment Gallery in Tantra Worlds
        </h1>
      </div>
      <div className="w-[77.5rem] flex flex-col items-start justify-start gap-[1.875rem] max-w-full text-left text-[2.188rem] text-oldlace">
        <div className="self-stretch overflow-hidden flex flex-row items-start justify-start gap-[1.875rem] max-w-full lg:flex-wrap">
          <div className="w-[37.5rem] rounded-11xl flex flex-col items-start justify-end pt-[9.687rem] px-[2.187rem] pb-[2.187rem] box-border bg-[url('/public/active@3x.png')] bg-cover bg-no-repeat bg-[top] max-w-full">
            <div className="self-stretch flex flex-row items-center justify-start gap-[3.75rem] max-w-full mq825:flex-wrap mq825:gap-[1.875rem]">
              <div className="flex-1 flex flex-col items-start justify-start gap-[0.625rem] min-w-[15.438rem] max-w-full">
                <h1 className="m-0 self-stretch relative text-[#424242] font-bold font-inherit mq450:text-[1.313rem] mq825:text-[1.75rem]">
                  Modern room
                </h1>
                <div className="self-stretch relative text-[1.125rem] leading-[1.813rem] text-gray-800">
                  Adequate facilities are available, making your activities
                  easier
                </div>
              </div>
              {/* <div className="h-[5.625rem] w-[5.625rem] rounded-81xl bg-cornflowerblue-100 flex flex-col items-center justify-center py-[1.718rem] px-[1.937rem] box-border text-white font-icon-big">
                <h1 className="m-0 w-[1.688rem] h-[2.188rem] relative text-inherit leading-[2.563rem] font-normal font-inherit inline-block mq450:text-[1.313rem] mq825:text-[1.75rem]">
                  play
                </h1>
              </div> */}
            </div>
          </div>
          <img
            className="h-[18.75rem] flex-1 relative rounded-11xl max-w-full overflow-hidden object-cover min-w-[11.75rem] lg:flex-1"
            loading="lazy"
            alt=""
            src="/rectangle-6@2x.png"
          />
          <img
            className="h-[18.75rem] flex-1 relative rounded-11xl max-w-full overflow-hidden object-cover min-w-[11.75rem] lg:flex-1"
            loading="lazy"
            alt=""
            src="/rectangle-7@2x.png"
          />
        </div>
        <div className="self-stretch overflow-hidden grid flex-row items-start justify-start gap-[1.875rem] max-w-full grid-cols-[repeat(3,_minmax(295px,_1fr))] lg:justify-center lg:grid-cols-[repeat(2,_minmax(295px,_511px))] mq825:grid-cols-[minmax(295px,_1fr)]">
          <img
            className="relative rounded-11xl max-w-full overflow-hidden max-h-full object-cover min-h-[18.75rem] mq825:w-full"
            loading="lazy"
            alt=""
            src="/rectangle-5@2x.png"
          />
          <img
            className="relative rounded-11xl max-w-full overflow-hidden max-h-full object-cover min-h-[18.75rem] mq825:w-full"
            loading="lazy"
            alt=""
            src="/rectangle-6-1@2x.png"
          />
          <img
            className="relative rounded-11xl max-w-full overflow-hidden max-h-full object-cover min-h-[18.75rem] mq825:w-full"
            loading="lazy"
            alt=""
            src="/rectangle-7-1@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

GalleryWork.propTypes = {
  className: PropTypes.string,
};

export default GalleryWork;
