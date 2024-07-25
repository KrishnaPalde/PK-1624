import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div
      className={`w-[88.75rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full text-left text-[3.25rem] text-black font-manrope ${className}`}
    >
      <div className="w-[76.5rem] flex flex-row items-start justify-start gap-[1.5rem] max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start pt-[1.187rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_312px)] mq825:max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start gap-[2.093rem] max-w-full mq450:gap-[1.063rem] mq825:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[4.343rem] min-w-[23.938rem] max-w-full mq450:gap-[1.063rem] mq450:min-w-full mq825:gap-[2.188rem]">
              <button className="cursor-pointer [border:none] pt-[0.781rem] pb-[0.843rem] pr-[1.375rem] pl-[1.437rem] bg-lightblue w-[9.488rem] rounded-31xl flex flex-row items-start justify-start box-border whitespace-nowrap hover:bg-lightsteelblue">
                <b className="flex-1 relative text-[0.875rem] leading-[1.375rem] inline-block font-manrope text-black text-center min-w-[6.631rem]">
                  Why Choose Us
                </b>
              </button>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem] max-w-full">
                <h1 className="m-0 relative text-inherit leading-[4.75rem] font-extrabold font-inherit inline-block max-w-full mq450:text-[1.938rem] mq450:leading-[2.875rem] mq825:text-[2.625rem] mq825:leading-[3.813rem]">
                  <p className="m-0">Dare to live the lift</p>
                  <p className="m-0">you’ve always wanted</p>
                </h1>
                <h3 className="m-0 relative text-[1.25rem] leading-[2rem] font-medium font-inherit text-dimgray-100 mq450:text-[1rem] mq450:leading-[1.625rem]">
                  <p className="m-0">
                    Discover how you can offset your adventure's carbon
                    emissions
                  </p>
                  <p className="m-0">
                    and support the sustainable initiatives practiced by our
                  </p>
                  <p className="m-0">operators worldwide.</p>
                </h3>
              </div>
            </div>
            <div className="w-[18rem] flex flex-col items-start justify-start pt-[1rem] px-[0rem] pb-[0rem] box-border min-w-[18rem] text-center text-[1.25rem] mq825:flex-1">
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
                <div className="self-stretch rounded-13xl bg-seashell flex flex-col items-start justify-start pt-[1.437rem] px-[2.562rem] pb-[0.812rem] gap-[1.125rem] border-[1px] border-solid border-gainsboro-100">
                  <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[2.562rem] pl-[2.5rem]">
                    <img
                      className="h-[7.688rem] w-[7.688rem] relative overflow-hidden shrink-0 object-cover"
                      loading="lazy"
                      alt=""
                      src="/destinationpng@2x.png"
                    />
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0.75rem] pl-[0.687rem]">
                    <b className="flex-1 relative leading-[2rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      4500+ Destination
                    </b>
                  </div>
                  <div className="relative text-[0.875rem] leading-[1.375rem] font-medium text-gray-100">
                    <p className="m-0">Our expert team handpicked all</p>
                    <p className="m-0">destinations in this site.</p>
                  </div>
                </div>
                <div className="self-stretch rounded-13xl flex flex-col items-start justify-start pt-[1.437rem] pb-[11.187rem] pr-[1.25rem] pl-[2.062rem] gap-[0.5rem] bg-[url('/public/paragraphbackgroundborder@3x.png')] bg-cover bg-no-repeat bg-[top] text-left">
                  <h3 className="m-0 relative text-inherit leading-[2rem] font-bold font-inherit inline-block min-w-[7.75rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                    Fast Booking
                  </h3>
                  <div className="relative text-[0.875rem] leading-[1.375rem] font-medium text-gray-100 inline-block min-w-[6.75rem]">
                    Secure payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[18rem] flex flex-col items-start justify-start gap-[1.5rem] text-center text-[1.25rem] mq825:hidden">
          <div className="self-stretch rounded-13xl bg-white flex flex-col items-start justify-start pt-[1.437rem] pb-[0.812rem] pr-[0rem] pl-[2.562rem] gap-[1.125rem] border-[1px] border-solid border-gainsboro-100">
            <div className="w-[12.725rem] flex flex-row items-start justify-start py-[0rem] px-[1.75rem] box-border">
              <img
                className="h-[6.625rem] flex-1 relative max-w-full overflow-hidden object-cover"
                loading="lazy"
                alt=""
                src="/supportpng@2x.png"
              />
            </div>
            <div className="w-[12.738rem] flex flex-row items-start justify-start py-[0rem] px-[0.562rem] box-border">
              <h3 className="m-0 flex-1 relative text-inherit leading-[2rem] font-bold font-inherit mq450:text-[1rem] mq450:leading-[1.625rem]">
                Great 24/7 Support
              </h3>
            </div>
            <div className="self-stretch relative text-[0.875rem] leading-[1.375rem] font-medium text-gray-100">
              <p className="m-0">We are here to help, before,</p>
              <p className="m-0">during, and even after your trip.</p>
            </div>
          </div>
          <div className="self-stretch rounded-13xl flex flex-col items-start justify-start pt-[1.437rem] pb-[8.5rem] pr-[1.25rem] pl-[2.062rem] gap-[0.468rem] bg-[url('/public/paragraphbackgroundborder1@3x.png')] bg-cover bg-no-repeat bg-[top] text-left">
            <h3 className="m-0 relative text-inherit leading-[2rem] font-bold font-inherit inline-block min-w-[6.131rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
              Best Price
            </h3>
            <div className="relative text-[0.875rem] leading-[1.375rem] font-medium text-gray-100">
              <p className="m-0">Price match within 48</p>
              <p className="m-0">hours of order</p>
              <p className="m-0">confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
