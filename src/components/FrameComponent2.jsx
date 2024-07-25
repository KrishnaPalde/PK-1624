import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <section
      className={`w-full !m-[0] absolute top-[0rem] left-[0rem] flex flex-row items-start justify-start max-w-full text-center text-[1.5rem] text-black font-inter ${className}`}
    >
      <img
        className="h-[51.688rem] flex-1 relative max-w-full overflow-hidden object-cover z-[2]"
        alt=""
        src="/group-931@2x.png"
      />
      <div className="w-[76.5rem] !m-[0] absolute right-[6.438rem] bottom-[-8.375rem] shadow-[0px_4px_30px_rgba(36,_76,_236,_0.15)] rounded-2xl bg-white box-border flex flex-col items-start justify-start pt-[1.25rem] pb-[1.625rem] pr-[1.625rem] pl-[1.875rem] gap-[1.25rem] max-w-full z-[6] border-[1px] border-solid border-gainsboro-100">
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[0.125rem] box-border max-w-full">
          <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-[1.25rem] mq450:flex-wrap">
            <div className="w-[14.813rem] flex flex-col items-start justify-start gap-[0.187rem]">
              <h2 className="m-0 relative text-inherit font-medium font-inherit mq450:text-[1.188rem]">
                Book a Room
              </h2>
              <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.062rem] text-[0.875rem] text-dimgray-200">
                <div className="relative font-medium">
                  Discover the perfect space for you!
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.687rem] text-left text-[0.875rem] text-dimgray-100 font-manrope">
              <div className="flex flex-row items-start justify-start pt-[0rem] pb-[0.031rem] pr-[0rem] pl-[1.25rem] relative">
                <img
                  className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full"
                  loading="lazy"
                  alt=""
                  src="/usersvg-fill.svg"
                />
                <div className="relative leading-[1.375rem] font-medium inline-block min-w-[7.063rem] whitespace-nowrap z-[1]">
                  Need some help?
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-2xl bg-white box-border flex flex-row flex-wrap items-start justify-start pt-[1.312rem] px-[1.687rem] pb-[1.187rem] gap-[4.425rem] max-w-full text-left text-[0.875rem] text-dimgray-100 font-manrope border-[1px] border-solid border-gainsboro-100">
          <div className="flex-1 flex flex-row items-end justify-start gap-[1rem] max-w-full mq825:flex-wrap mq825:min-w-full">
            <FrameComponent3 labelLocation="Location" />
            <div className="h-[3.75rem] flex flex-col items-start justify-end pt-[0rem] pb-[0.125rem] pr-[1.312rem] pl-[0rem] box-border">
              <div className="w-[0.063rem] flex-1 relative bg-gainsboro-100" />
            </div>
            <div className="flex-1 flex flex-row items-start justify-start py-[0rem] pr-[1.312rem] pl-[0rem] box-border gap-[1rem] min-w-[8.813rem]">
              <div className="flex-1 flex flex-col items-start justify-start gap-[0.312rem]">
                <b className="relative leading-[1.375rem] inline-block min-w-[3.688rem]">
                  Check In
                </b>
                <div className="rounded flex flex-row items-start justify-start py-[0.25rem] pr-[0.25rem] pl-[1.375rem] relative">
                  <img
                    className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src="/calendarsvg-fill@2x.png"
                  />
                  <select className="h-[1.375rem] bg-[transparent] [border:none] overflow-auto flex flex-row items-end justify-start pt-[0.375rem] pb-[0.031rem] pr-[0.375rem] pl-[0rem] box-border font-manrope font-bold text-[0.875rem] text-black z-[1]" />
                </div>
              </div>
              <div className="h-[3.625rem] w-[0.063rem] relative bg-gainsboro-100" />
            </div>
            <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.062rem]">
              <div className="flex flex-col items-start justify-start gap-[0.312rem]">
                <b className="relative leading-[1.375rem] inline-block min-w-[4.5rem]">
                  Check Out
                </b>
                <div className="rounded flex flex-row items-start justify-start py-[0.25rem] pr-[0.25rem] pl-[1.375rem] relative">
                  <img
                    className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src="/calendarsvg-fill-1@2x.png"
                  />
                  <select className="h-[1.375rem] bg-[transparent] [border:none] overflow-auto flex flex-row items-end justify-start pt-[0.375rem] pb-[0.031rem] pr-[0.375rem] pl-[0rem] box-border font-manrope font-bold text-[0.875rem] text-black z-[1]" />
                </div>
              </div>
            </div>
            <div className="h-[3.625rem] flex flex-col items-start justify-start py-[0rem] pr-[1.312rem] pl-[0rem] box-border">
              <div className="w-[0.063rem] flex-1 relative bg-gainsboro-100" />
            </div>
            <FrameComponent3 labelLocation="Guest" />
          </div>
          <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
            <button className="cursor-pointer [border:none] py-[1rem] pr-[2rem] pl-[2.062rem] bg-cornflowerblue-100 rounded-31xl flex flex-row items-start justify-start gap-[0.625rem]">
              <div className="flex flex-col items-start justify-start pt-[0.187rem] px-[0rem] pb-[0rem]">
                <img
                  className="w-[1.25rem] h-[1.25rem] relative"
                  alt=""
                  src="/svg.svg"
                />
              </div>
              <b className="relative text-[1rem] leading-[1.625rem] inline-block font-manrope text-white text-center min-w-[3.438rem]">
                Search
              </b>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;



// import FrameComponent3 from "./FrameComponent3";
// import PropTypes from "prop-types";

// const FrameComponent2 = ({ className = "" }) => {
//   return (
//     <section
//       className={`w-full !m-[0] absolute top-[0rem] left-[0rem] flex flex-row items-start justify-start max-w-full text-center text-[1.5rem] text-black font-inter ${className} sm:flex-wrap sm:justify-center md:justify-start lg:text-[2rem] xl:text-[2.5rem]`}
//     >
//       <img
//         className="h-[51.688rem] flex-1 relative max-w-full overflow-hidden object-cover z-[2] sm:h-[30rem] md:h-[40rem] lg:h-[50rem] xl:h-[60rem]"
//         alt=""
//         src="/group-931@2x.png"
//       />
//       <div className=" w-[76.5rem] !m-[0] absolute right-[6.438rem] bottom-[-8.375rem] shadow-[0px_4px_30px_rgba(36,_76,_236,_0.15)] rounded-2xl bg-white box-border flex flex-col items-start justify-start pt-[1.25rem] pb-[1.625rem] pr-[1.625rem] pl-[1.875rem] gap-[1.25rem] max-w-full z-[6] border-[1px] border-solid border-gainsboro-100 sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
//         <div className="self-stretch flex flex-row items-start justify-start py-[0rem] px-[0.125rem] box-border max-w-full">
//            <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-[1.25rem] mq450:flex-wrap">
//              <div className="w-[14.813rem] flex flex-col items-start justify-start gap-[0.187rem]">
//                <h2 className="m-0 relative text-inherit font-medium font-inherit mq450:text-[1.188rem]">
//                  Book a Room
//                </h2>
//                <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.062rem] text-[0.875rem] text-dimgray-200">
//                  <div className="relative font-medium">
//                    Discover the perfect space for you!
//                  </div>
//                </div>
//              </div>
//              <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.687rem] text-left text-[0.875rem] text-dimgray-100 font-manrope">
//                <div className="flex flex-row items-start justify-start pt-[0rem] pb-[0.031rem] pr-[0rem] pl-[1.25rem] relative">
//                  <img
//                    className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full"
//                    loading="lazy"
//                    alt=""
//                    src="/usersvg-fill.svg"
//                  />
//                  <div className="relative leading-[1.375rem] font-medium inline-block min-w-[7.063rem] whitespace-nowrap z-[1]">
//                    Need some help?
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//          <div className="self-stretch rounded-2xl bg-white box-border flex flex-row flex-wrap items-start justify-start pt-[1.312rem] px-[1.687rem] pb-[1.187rem] gap-[4.425rem] max-w-full text-left text-[0.875rem] text-dimgray-100 font-manrope border-[1px] border-solid border-gainsboro-100">
//            <div className="flex-1 flex flex-row items-end justify-start gap-[1rem] max-w-full mq825:flex-wrap mq825:min-w-full">
//              <FrameComponent3 labelLocation="Location" />
//              <div className="h-[3.75rem] flex flex-col items-start justify-end pt-[0rem] pb-[0.125rem] pr-[1.312rem] pl-[0rem] box-border">
//                <div className="w-[0.063rem] flex-1 relative bg-gainsboro-100" />
//              </div>
//              <div className="flex-1 flex flex-row items-start justify-start py-[0rem] pr-[1.312rem] pl-[0rem] box-border gap-[1rem] min-w-[8.813rem]">
//                <div className="flex-1 flex flex-col items-start justify-start gap-[0.312rem]">
//                  <b className="relative leading-[1.375rem] inline-block min-w-[3.688rem]">
//                    Check In
//                  </b>
//                  <div className="rounded flex flex-row items-start justify-start py-[0.25rem] pr-[0.25rem] pl-[1.375rem] relative">
//                    <img
//                      className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-cover"
//                      alt=""
//                      src="/calendarsvg-fill@2x.png"
//                    />
//                    <select className="h-[1.375rem] bg-[transparent] [border:none] overflow-auto flex flex-row items-end justify-start pt-[0.375rem] pb-[0.031rem] pr-[0.375rem] pl-[0rem] box-border font-manrope font-bold text-[0.875rem] text-black z-[1]" />
//                  </div>
//                </div>
//                <div className="h-[3.625rem] w-[0.063rem] relative bg-gainsboro-100" />
//              </div>
//              <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.062rem]">
//                <div className="flex flex-col items-start justify-start gap-[0.312rem]">
//                  <b className="relative leading-[1.375rem] inline-block min-w-[4.5rem]">
//                    Check Out
//                  </b>
//                  <div className="rounded flex flex-row items-start justify-start py-[0.25rem] pr-[0.25rem] pl-[1.375rem] relative">
//                    <img
//                      className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-cover"
//                      alt=""
//                      src="/calendarsvg-fill-1@2x.png"
//                    />
//                    <select className="h-[1.375rem] bg-[transparent] [border:none] overflow-auto flex flex-row items-end justify-start pt-[0.375rem] pb-[0.031rem] pr-[0.375rem] pl-[0rem] box-border font-manrope font-bold text-[0.875rem] text-black z-[1]" />
//                  </div>
//                </div>
//              </div>
//              <div className="h-[3.625rem] flex flex-col items-start justify-start py-[0rem] pr-[1.312rem] pl-[0rem] box-border">
//                <div className="w-[0.063rem] flex-1 relative bg-gainsboro-100" />
//              </div>
//              <FrameComponent3 labelLocation="Guest" />
//            </div>
//            <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
//              <button className="cursor-pointer [border:none] py-[1rem] pr-[2rem] pl-[2.062rem] bg-cornflowerblue-100 rounded-31xl flex flex-row items-start justify-start gap-[0.625rem]">
//                <div className="flex flex-col items-start justify-start pt-[0.187rem] px-[0rem] pb-[0rem]">
//                  <img
//                    className="w-[1.25rem] h-[1.25rem] relative"
//                    alt=""
//                    src="/svg.svg"
//                  />
//                </div>
//                <b className="relative text-[1rem] leading-[1.625rem] inline-block font-manrope text-white text-center min-w-[3.438rem]">
//                  Search
//                </b>
//              </button>
//            </div>
//          </div>
//       </div>
//     </section>
//   );
// };

// FrameComponent2.propTypes = {
//   className: PropTypes.string,
// };

// export default FrameComponent2;