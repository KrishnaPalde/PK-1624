import PropTypes from "prop-types";

const Container = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch overflow-hidden flex flex-row items-start justify-start pt-[1.875rem] px-[6.312rem] pb-[2.5rem] box-border relative gap-[5.568rem] max-w-full text-left text-[0.875rem] text-black font-manrope mq450:gap-[1.375rem] mq450:pt-[1.25rem] mq450:pb-[1.625rem] mq450:box-border mq825:gap-[2.813rem] mq825:pl-[1.563rem] mq825:pr-[1.563rem] mq825:box-border mq1425:flex-wrap mq1425:justify-center mq1425:pl-[3.125rem] mq1425:pr-[3.125rem] mq1425:box-border ${className}`}
    >
      <div className="w-[33.219rem] flex flex-col items-start justify-start pt-[1.562rem] px-[0rem] pb-[0rem] box-border min-w-[33.219rem] max-w-full shrink-0 mq825:min-w-full mq1425:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start shrink-0 max-w-full">
          <div className="w-[10.8rem] rounded-31xl bg-lightblue box-border flex flex-row items-start justify-start py-[0.562rem] px-[0.812rem] gap-[0.312rem] border-[1px] border-solid border-gainsboro-100">
            <div className="h-[1.625rem] w-[3.25rem] relative shrink-0">
              <img
                className="absolute top-[0rem] left-[0rem] rounded-smi w-[1.625rem] h-[1.625rem] overflow-hidden object-cover"
                alt=""
                src="/testimonialpng@2x.png"
              />
              <img
                className="absolute top-[0rem] left-[0.813rem] rounded-smi w-[1.625rem] h-[1.625rem] overflow-hidden object-cover z-[1]"
                alt=""
                src="/testimonial2png@2x.png"
              />
              <img
                className="absolute top-[0rem] left-[1.625rem] rounded-smi w-[1.625rem] h-[1.625rem] overflow-hidden object-cover z-[2]"
                alt=""
                src="/testimonial3png@2x.png"
              />
            </div>
            <div className="w-[6.756rem] flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border shrink-0">
              <b className="self-stretch relative leading-[1.375rem]">
                Testimonials
              </b>
            </div>
          </div>
          <div className="w-[32.188rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[2.25rem] box-border max-w-full shrink-0 text-[3rem] font-inter">
            <h1 className="m-0 flex-1 relative text-inherit leading-[3.625rem] font-bold font-inherit inline-block max-w-full mq450:text-[1.813rem] mq450:leading-[2.188rem] mq825:text-[2.375rem] mq825:leading-[2.875rem]">
              <p className="m-0">What our clients are</p>
              <p className="m-0">saying about us?</p>
            </h1>
          </div>
          <div className="self-stretch relative text-[1rem] leading-[1.75rem] font-medium text-dimgray-100">
            <p className="m-0">
              Discover how you can offset your adventure's carbon emissions
            </p>
            <p className="m-0">
              and support the sustainable initiatives practiced by our
            </p>
            <p className="m-0">operators worldwide.</p>
          </div>
        </div>
      </div>
      <div className="w-[56.963rem] overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[1.25rem] px-[0rem] pb-[2.5rem] box-border gap-[1.562rem] min-w-[56.963rem] max-w-full text-[1.125rem] lg:flex-wrap lg:min-w-full mq450:pb-[1.625rem] mq450:box-border mq1425:flex-1">
        <div className="w-[29.375rem] rounded-13xl bg-seashell box-border flex flex-col items-start justify-start pt-[2.062rem] px-[2.5rem] pb-[2.125rem] gap-[1.906rem] shrink-0 max-w-full border-[1px] border-solid border-gainsboro-100 mq825:gap-[0.938rem]">
          <div className="self-stretch flex flex-row items-end justify-between pt-[0rem] px-[0rem] pb-[1.375rem] gap-[1.25rem] border-b-[1px] border-solid border-gainsboro-100 mq450:flex-wrap">
            <div className="w-[12.875rem] flex flex-row items-start justify-start gap-[0.75rem]">
              <img
                className="h-[4rem] w-[4rem] relative rounded-13xl overflow-hidden shrink-0 object-cover"
                loading="lazy"
                alt=""
                src="/authorpng@2x.png"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                <div className="self-stretch flex flex-col items-start justify-start">
                  <b className="relative leading-[1.75rem]">Sara Mohamed</b>
                  <div className="relative text-[0.875rem] leading-[1.375rem] font-medium inline-block min-w-[3.063rem]">
                    Jakatar
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
              <div className="flex flex-row items-start justify-start gap-[0.125rem]">
                <img
                  className="h-[0.75rem] w-[0.75rem] relative overflow-hidden shrink-0 min-h-[0.75rem]"
                  alt=""
                  src="/starsvg.svg"
                />
                <img
                  className="h-[0.75rem] w-[0.75rem] relative overflow-hidden shrink-0 min-h-[0.75rem]"
                  alt=""
                  src="/starsvg.svg"
                />
                <img
                  className="h-[0.75rem] w-[0.75rem] relative overflow-hidden shrink-0 min-h-[0.75rem]"
                  alt=""
                  src="/starsvg.svg"
                />
                <img
                  className="h-[0.75rem] w-[0.75rem] relative overflow-hidden shrink-0 min-h-[0.75rem]"
                  alt=""
                  src="/starsvg.svg"
                />
                <img
                  className="h-[0.75rem] w-[0.75rem] relative overflow-hidden shrink-0 min-h-[0.75rem]"
                  alt=""
                  src="/starsvg.svg"
                />
              </div>
            </div>
          </div>
          <div className="relative text-[0.875rem] leading-[1.5rem] text-dimgray-100 inline-block max-w-full">
            <p className="m-0">
              I've been using the hotel booking system for several years
            </p>
            <p className="m-0">
              now, and it's become my go-to platform for planning my
            </p>
            <p className="m-0">
              trips. The interface is user-friendly, and I appreciate the
            </p>
            <p className="m-0">
              detailed information and real-time availability of hotels.
            </p>
          </div>
        </div>
        <div className="h-[19.313rem] w-[29.375rem] relative rounded-13xl bg-azure box-border hidden max-w-full border-[1px] border-solid border-gainsboro-100">
          <div className="absolute w-[calc(100%_-_82px)] top-[2.188rem] right-[2.563rem] left-[2.563rem] box-border h-[5.5rem] border-b-[1px] border-solid border-gainsboro-100">
            <img
              className="absolute top-[0rem] left-[0rem] rounded-13xl w-[4rem] h-[4rem] overflow-hidden object-cover"
              alt=""
              src="/author2png@2x.png"
            />
            <b className="absolute top-[0.375rem] left-[4.75rem] leading-[1.75rem] flex items-center w-[6.188rem] h-[1.75rem] min-w-[6.188rem]">
              Atend John
            </b>
            <div className="absolute top-[2.125rem] left-[4.75rem] text-[0.875rem] leading-[1.375rem] font-medium flex items-center w-[3.65rem] h-[1.375rem] min-w-[3.65rem]">
              Califonia
            </div>
            <img
              className="absolute top-[2.813rem] left-[20rem] w-[0.75rem] h-[0.75rem] overflow-hidden"
              alt=""
              src="/starsvg-5.svg"
            />
            <img
              className="absolute top-[2.813rem] left-[20.875rem] w-[0.75rem] h-[0.75rem] overflow-hidden"
              alt=""
              src="/starsvg-6.svg"
            />
            <img
              className="absolute top-[2.813rem] left-[21.75rem] w-[0.75rem] h-[0.75rem] overflow-hidden"
              alt=""
              src="/starsvg-7.svg"
            />
            <img
              className="absolute top-[2.813rem] left-[22.625rem] w-[0.75rem] h-[0.75rem] overflow-hidden"
              alt=""
              src="/starsvg-8.svg"
            />
            <img
              className="absolute top-[2.813rem] left-[23.5rem] w-[0.75rem] h-[0.75rem] overflow-hidden"
              alt=""
              src="/starsvg-9.svg"
            />
          </div>
          <div className="absolute top-[9.594rem] left-[2.563rem] text-[0.875rem] leading-[1.5rem] text-dimgray-100 flex items-center w-[23.875rem] h-[7.5rem]">
            <span className="w-full">
              <p className="m-0">
                I had a last-minute business trip, and the hotel booking
              </p>
              <p className="m-0">
                system came to the rescue. I was able to find a high-quality
              </p>
              <p className="m-0">
                hotel in no time and even got a great deal on the room. The
              </p>
              <p className="m-0">
                confirmation process was straightforward, and I received all
              </p>
              <p className="m-0">the necessary information promptly.</p>
            </span>
          </div>
        </div>
        <div className="w-[29.375rem] rounded-13xl bg-azure box-border flex flex-col items-start justify-start pt-[2.062rem] px-[2.5rem] pb-[2.125rem] gap-[1.906rem] shrink-0 max-w-full z-[1] border-[1px] border-solid border-gainsboro-100 mq825:gap-[0.938rem]">
          <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[1.375rem] relative gap-[0.75rem] border-b-[1px] border-solid border-gainsboro-100 mq450:flex-wrap">
            <img
              className="h-[4rem] w-[4rem] relative rounded-13xl overflow-hidden shrink-0 object-cover"
              loading="lazy"
              alt=""
              src="/author2png@2x.png"
            />
            <div className="flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
              <div className="flex flex-col items-start justify-start">
                <b className="relative leading-[1.75rem] inline-block min-w-[6.188rem]">
                  Atend John
                </b>
                <div className="relative text-[0.875rem] leading-[1.375rem] font-medium inline-block min-w-[3.65rem]">
                  Califonia
                </div>
              </div>
            </div>
            <img
              className="h-[0.75rem] w-[0.75rem] absolute !m-[0] right-[3.5rem] bottom-[1.938rem] overflow-hidden shrink-0"
              alt=""
              src="/starsvg-10.svg"
            />
            <img
              className="h-[0.75rem] w-[0.75rem] absolute !m-[0] right-[2.625rem] bottom-[1.938rem] overflow-hidden shrink-0"
              alt=""
              src="/starsvg-11.svg"
            />
            <img
              className="h-[0.75rem] w-[0.75rem] absolute !m-[0] right-[1.75rem] bottom-[1.938rem] overflow-hidden shrink-0"
              alt=""
              src="/starsvg-12.svg"
            />
            <img
              className="h-[0.75rem] w-[0.75rem] absolute !m-[0] right-[0.875rem] bottom-[1.938rem] overflow-hidden shrink-0"
              alt=""
              src="/starsvg-13.svg"
            />
            <img
              className="h-[0.75rem] w-[0.75rem] absolute !m-[0] right-[0rem] bottom-[1.938rem] overflow-hidden shrink-0"
              alt=""
              src="/starsvg-14.svg"
            />
          </div>
          <div className="w-[23.875rem] relative text-[0.875rem] leading-[1.5rem] text-dimgray-100 flex items-center max-w-full">
            <span className="w-full">
              <p className="m-0">
                I had a last-minute business trip, and the hotel booking
              </p>
              <p className="m-0">
                system came to the rescue. I was able to find a high-quality
              </p>
              <p className="m-0">
                hotel in no time and even got a great deal on the room. The
              </p>
              <p className="m-0">
                confirmation process was straightforward, and I received all
              </p>
              <p className="m-0">the necessary information promptly.</p>
            </span>
          </div>
        </div>
      </div>
      <img
        className="h-[2.5rem] w-[2.5rem] absolute !m-[0] right-[42.375rem] bottom-[1.25rem] rounded-xl z-[2]"
        loading="lazy"
        alt=""
        src="/button--previous-slide.svg"
      />
      <img
        className="h-[2.5rem] w-[2.5rem] absolute !m-[0] right-[39.45rem] bottom-[1.25rem] rounded-xl z-[2]"
        alt=""
        src="/button--next-slide.svg"
      />
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
};

export default Container;
