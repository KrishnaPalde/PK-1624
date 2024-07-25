import InputField from "./InputField";
import PropTypes from "prop-types";

const NameSection = ({ className = "" }) => {
  return (
    <section
      className={`w-[88.438rem] flex flex-row items-start justify-center pt-[0rem] px-[1.25rem] pb-[4.937rem] box-border max-w-full shrink-0 text-left text-[0.875rem] text-gray-700 font-paragraph mq750:pb-[3.188rem] mq750:box-border ${className}`}
    >
      <div className="w-[72.563rem] flex flex-row items-start justify-center gap-[5.687rem] max-w-full mq1275:gap-[2.813rem] mq750:gap-[1.438rem] mq1100:flex-wrap">
        <div className="w-[30rem] flex flex-col items-start justify-start gap-[2rem] min-w-[30rem] max-w-full mq750:gap-[1rem] mq750:min-w-full mq1100:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem] max-w-full">
            <div className="self-stretch flex flex-row items-start justify-start gap-[2rem] mq450:flex-wrap mq750:gap-[1rem]">
              <InputField label="First name" text="First name" />
              <InputField
                label="Last name"
                text="Last name"
                propFlex="1"
                propMinWidth="9.125rem"
                propAlignSelf="unset"
              />
            </div>
            <InputField
              label="Email"
              text="you@company.com"
              propFlex="unset"
              propMinWidth="unset"
              propAlignSelf="stretch"
            />
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.375rem] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[0.375rem] max-w-full">
                  <div className="relative leading-[1.25rem] font-medium inline-block min-w-[6.125rem]">
                    Phone number
                  </div>
                  <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg bg-white box-border overflow-hidden flex flex-row items-start justify-start max-w-full [row-gap:20px] text-[1rem] text-gray-900 border-[1px] border-solid border-gray-300 mq450:flex-wrap">
                    <div className="w-[4.438rem] overflow-hidden shrink-0 flex flex-row items-center justify-between py-[0.75rem] pr-[0.75rem] pl-[1rem] box-border gap-[0rem] [row-gap:20px]">
                      <div className="relative leading-[1.5rem] inline-block min-w-[1.438rem]">
                        US
                      </div>
                      <img
                        className="h-[1.25rem] w-[1.25rem] relative overflow-hidden shrink-0"
                        alt=""
                        src="/chevrondown.svg"
                      />
                    </div>
                    <div className="flex-1 flex flex-row items-center justify-start py-[0.75rem] pr-[1rem] pl-[0rem] box-border gap-[0.5rem] min-w-[16.625rem] max-w-full text-gray-500">
                      <div className="flex-1 relative leading-[1.5rem] inline-block max-w-full">
                        +1 (555) 000-0000
                      </div>
                      <img
                        className="h-[1rem] w-[1rem] relative hidden"
                        alt=""
                        src="/help-icon.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[20rem] relative leading-[1.25rem] text-gray-500 hidden">
                  This is a hint text to help user.
                </div>
              </div>
            </div>
            <div className="self-stretch h-[9.625rem] flex flex-col items-start justify-start">
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.375rem]">
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.375rem]">
                  <div className="relative leading-[1.25rem] font-medium inline-block min-w-[3.813rem]">
                    Message
                  </div>
                  <div className="self-stretch h-[8rem] shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] px-[0.875rem] whitespace-nowrap text-[1rem] text-gray-500 border-[1px] border-solid border-gray-300">
                    <div className="self-stretch w-[18.25rem] relative leading-[1.5rem] hidden">
                      Include a message...
                    </div>
                  </div>
                </div>
                <div className="w-[20rem] relative leading-[1.25rem] text-gray-500 hidden">
                  This is a hint text to help user.
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[0.75rem] max-w-full text-[1rem] mq450:flex-wrap">
              <div className="flex flex-row items-center justify-center">
                <div className="h-[1.25rem] w-[1.25rem] relative rounded-md bg-white box-border overflow-hidden shrink-0 border-[1px] border-solid border-gray-300" />
              </div>
              <div className="flex-1 relative leading-[1.5rem] inline-block min-w-[15rem] max-w-full">
                <span>
                  <span className="font-medium">{`You agree to our friendly `}</span>
                  <span className="text-gray-500">
                    <span className="[text-decoration:underline]">
                      privacy policy
                    </span>
                  </span>
                </span>
                <span className="text-gray-500">
                  <span>.</span>
                </span>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start max-w-full text-[1rem] text-white">
            <div className="self-stretch rounded-lg flex flex-row items-start justify-start max-w-full">
              <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg bg-cornflowerblue-100 box-border overflow-hidden flex flex-row items-center justify-center py-[0.812rem] px-[1.25rem] whitespace-nowrap max-w-full border-[1px] border-solid border-cornflowerblue-100">
                <div className="relative font-semibold">Leave us a Message</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start pt-[0.437rem] px-[0rem] pb-[0rem] box-border min-w-[23.938rem] max-w-full text-[2.813rem] text-gray1-200 mq450:min-w-full">
          <div className="self-stretch h-[37.5rem] flex flex-col items-start justify-start relative max-w-full">
            <img
              className="w-[24.375rem] relative rounded-11xl max-h-full object-cover max-w-full"
              alt=""
              src="/rectangle-3@2x.png"
            />
            <div className="w-[24.375rem] h-[31.188rem] absolute !m-[0] right-[0rem] bottom-[0rem] rounded-11xl z-[1] flex items-center justify-center">
              <img
                className="w-full h-full z-[1] object-contain absolute left-[0rem] top-[0.625rem] [transform:scale(1.128)]"
                loading="lazy"
                alt=""
                src="/rectangle-4@2x.png"
              />
            </div>
            <div className="w-[14.625rem] !m-[0] absolute bottom-[3.75rem] left-[3.75rem] rounded-11xl bg-aliceblue overflow-hidden flex flex-col items-center justify-center p-[1.562rem] box-border gap-[0.625rem] z-[2]">
              <div className="flex flex-row items-start justify-center gap-[0.625rem]">
                <div className="relative font-semibold inline-block min-w-[5.438rem] mq450:text-[1.688rem] mq750:text-[2.25rem]">
                  299
                </div>
                <div className="relative text-[1rem] leading-[1.813rem] inline-block min-w-[0.688rem]">
                  +
                </div>
              </div>
              <div className="self-stretch relative text-[1rem] font-medium text-center">
                Deluxe Room
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

NameSection.propTypes = {
  className: PropTypes.string,
};

export default NameSection;
