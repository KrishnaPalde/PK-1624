import FrameComponent5 from "./FrameComponent5";
import PropTypes from "prop-types";
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const FrameComponent4 = ({ className = "" }) => {
  AOS.init({
    duration: 1200,
  })
  return (
    <section
      className={`w-[87.313rem] flex flex-row items-start justify-center pt-[0rem] px-[1.25rem] pb-[3.125rem] box-border max-w-full shrink-0 text-left text-[2.25rem] text-black font-inter mq825:pb-[2rem] mq825:box-border ${className}`}
    >
      <div className="w-[76.563rem] flex flex-col items-start justify-start gap-[3.062rem] max-w-full mq825:gap-[1.5rem]">
        <h1 className="m-0 self-stretch relative text-inherit font-bold font-inherit mq450:text-[1.375rem] mq825:text-[1.813rem]">
          Find Your Perfect Stay
        </h1>
        <div className="flex flex-row items-start justify-start gap-[2.5rem] max-w-full text-[0.875rem] text-gray-700 lg:flex-wrap mq825:gap-[1.25rem]">
          <div className="h-[38.563rem] w-[20rem] flex flex-col items-start justify-start gap-[2.25rem] mq450:gap-[1.125rem]" data-aos="fade-right">
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.937rem]">
              <img
                className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-11xl"
                loading="lazy"
                alt=""
                src="/rectangle-3677@2x.png"
              />
              <div className="flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="relative leading-[1.188rem] font-medium inline-block min-w-[4.375rem]">
                  3 GUESTS
                </div>
                <h3 className="m-0 relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
                  Room with View
                </h3>
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.937rem]">
              <img
                className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-11xl"
                loading="lazy"
                alt=""
                src="/rectangle-3677-1@2x.png"
              />
              <div className="w-[10.25rem] flex flex-col items-start justify-start gap-[0.375rem]">
                <div className="relative leading-[133.02%] font-medium">
                  <p className="m-0">1 GUESTS</p>
                </div>
                <h3 className="m-0 self-stretch relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
                  <p className="m-0">Small Room</p>
                </h3>
              </div>
            </div>
          </div>
          <div className="h-[38.5rem] w-[26.25rem] rounded-11xl flex flex-col items-start justify-start gap-[0.937rem] max-w-full" data-aos="fade-down">
            <img
              className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-11xl"
              loading="lazy"
              alt=""
              src="/rectangle-3678@2x.png"
            />
            <div className="flex flex-col items-start justify-start gap-[0.312rem]">
              <div className="relative leading-[1.188rem] font-medium inline-block min-w-[4.313rem]">
                6 GUESTS
              </div>
              <h3 className="m-0 relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
                Luxury Room
              </h3>
            </div>
          </div>
          {/* <div className="h-[38.5rem] w-[20rem] flex flex-col items-start justify-start gap-[2.25rem] mq450:gap-[1.125rem]">
            <FrameComponent5
              rectangle3679="/rectangle-3679@2x.png"
              gUESTS="5 GUESTS"
              appartment="Appartment"
            />
            <FrameComponent5
              rectangle3679="/rectangle-3679-1@2x.png"
              gUESTS="4 GUESTS"
              appartment="Midium Room"
            />
          </div> */}
          <div className="h-[38.563rem] w-[20rem] flex flex-col items-start justify-start gap-[2.25rem] mq450:gap-[1.125rem]" data-aos="fade-left">
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.937rem]">
              <img
                className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-11xl"
                loading="lazy"
                alt=""
                src="/rectangle-3679@2x.png"
              />
              <div className="flex flex-col items-start justify-start gap-[0.312rem]">
                <div className="relative leading-[1.188rem] font-medium inline-block min-w-[4.375rem]">
                  5 GUESTS
                </div>
                <h3 className="m-0 relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
                  Appartment
                </h3>
              </div>
            </div>
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.937rem]">
              <img
                className="relative self-stretch flex-1 object-cover max-w-full max-h-full overflow-hidden rounded-11xl"
                loading="lazy"
                alt=""
                src="/rectangle-3677@2x.png"
              />
              <div className="w-[10.25rem] flex flex-col items-start justify-start gap-[0.375rem]">
                <div className="relative leading-[133.02%] font-medium">
                  <p className="m-0">4 GUESTS</p>
                </div>
                <h3 className="m-0 self-stretch relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
                  <p className="m-0">Medium Room</p>
                </h3>
              </div>
            </div>
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
