import Footer from "./Footer";
import PropTypes from "prop-types";

const JoinUs = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start max-w-full text-left text-[1rem] text-black font-manrope ${className}`}
    >
      <div className="w-[87.875rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
        <div className="h-[23.9rem] w-[76.5rem] rounded-11xl bg-aliceblue box-border flex flex-row items-start justify-between pt-[0rem] pb-[3.337rem] pr-[0.125rem] pl-[3.937rem] gap-[1.25rem] max-w-full border-[1px] border-solid border-gainsboro-100 mq450:pb-[2.188rem] mq450:box-border mq1275:pl-[1.938rem] mq1275:box-border">
          <div className="w-[31.938rem] flex flex-col items-start justify-start pt-[3.687rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_392px)] mq750:hidden mq750:max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[0.75rem] max-w-full">
              <div className="flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.875rem] text-center">
                <div className="rounded-31xl bg-gold flex flex-row items-start justify-start py-[0.812rem] pr-[1.375rem] pl-[1.437rem] whitespace-nowrap">
                  <b className="relative leading-[1.625rem]">
                    Join our newsletter
                  </b>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[2.25rem] max-w-full text-[1.75rem] font-paragraph mq750:gap-[1.125rem]">
                <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.5rem] box-border max-w-full">
                  <div className="h-[3.875rem] flex-1 flex flex-row items-start justify-start relative max-w-full">
                    <h2 className="!m-[0] w-full absolute top-[-1.437rem] left-[0rem] text-inherit leading-[2.25rem] font-semibold font-inherit flex items-center h-full mq450:text-[1.375rem] mq450:leading-[1.813rem]">
                      <span className="w-full">
                        <p className="m-0">Subscribe to see secret deals</p>
                        <p className="m-0">
                          prices drop the moment you signup!
                        </p>
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="w-[28.75rem] flex flex-row items-start justify-start py-[0rem] px-[0.062rem] box-border max-w-full text-[1rem] text-gray1-100 font-urbanist">
                  <div className="h-[3.688rem] flex-1 flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem] box-border max-w-full">
                    <div className="self-stretch h-[3.75rem] rounded-31xl bg-white box-border flex flex-row items-start justify-start py-[1.25rem] px-[1.937rem] max-w-full border-[1px] border-solid border-gainsboro-100">
                      <div className="flex-1 overflow-hidden flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.062rem] box-border max-w-full">
                        <div className="relative inline-block min-w-[4.819rem]">
                          Your Email
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-31xl bg-cornflowerblue-100 flex flex-row items-start justify-start pt-[1.218rem] pb-[1.156rem] pr-[2.187rem] pl-[2.25rem] z-[1] ml-[-8.725rem] text-center text-[0.875rem] text-white font-manrope">
                    <b className="relative leading-[1.375rem] inline-block min-w-[4.313rem]">
                      Subscribe
                    </b>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start py-[0rem] px-[0.5rem] text-[0.875rem] text-dimgray-100">
                <div className="relative leading-[1.375rem] font-medium">
                  No ads. No trails. No commitments
                </div>
              </div>
            </div>
          </div>
          <img
            className="cursor-pointer h-[24.875rem] w-[23.25rem] relative rounded-t-11xl rounded-b-none object-cover max-w-[calc(100%_-_531px)] mq750:hidden mq750:max-w-full"
            loading="lazy"
            alt=""
            src="/rectangle-40061@2x.png"
           
          />
        </div>
      </div>
      <Footer
        facebook="/facebook1.svg"
        twitter="/twitter-1.svg"
        demo="/demo1.svg"
        linkedin="/linkedin1.svg"
        backToTopBtn="/back-to-top-btn1.svg"
      />
    </section>
  );
};

JoinUs.propTypes = {
  className: PropTypes.string,
};

export default JoinUs;
