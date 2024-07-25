import PropTypes from "prop-types";

const Hero = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[11.875rem] box-border max-w-full shrink-0 text-left text-[5rem] text-black font-inter lg:pb-[7.688rem] lg:box-border md:pb-[5rem] md:box-border ${className}`}
    >
      <div className="flex-1 bg-gradient-to-r from-[rgba(217,217,217,0.1)_40.1%] via-[rgba(228,228,228,0.5)_55.6%] to-[rgba(238,238,238,0.8)_64%] flex flex-col items-start justify-start pt-[3.25rem] px-[7.312rem] pb-[10.687rem] box-border relative gap-[9.187rem] max-w-full z-[3] lg:pt-[2.125rem] lg:pb-[6.938rem] md:gap-[2.313rem] md:pl-[1.813rem] md:pr-[1.813rem] md:box-border sm:gap-[1.125rem] sm:pt-[1.375rem] sm:pb-[4.5rem] sm:box-border">
        <div className="w-[90rem] h-[51.688rem] relative bg-gradient-to-r from-[rgba(217,217,217,0.1)_40.1%] via-[rgba(228,228,228,0.5)_55.6%] to-[rgba(238,238,238,0.8)_64%] hidden max-w-full z-[0]" />
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full m-0">
          <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-[rgba(217,217,217,0.1)_40.1%] via-[rgba(228,228,228,0.5)_55.6%] to-[rgba(238,238,238,0.8)_64%] z-[4]" />
          <div className="absolute h-full w-full top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-[rgba(217,217,217,0)_63%] to-[rgba(238,238,238,0.68)_79%] z-[5]" />
        </div>
        <header className="w-[72rem] flex flex-row items-start justify-between top-0 z-[99] sticky gap-[1.25rem] max-w-full text-left text-[1.188rem] text-black font-inter">
          <div className="bg-gray-400 overflow-hidden flex flex-row items-start justify-start pt-[0.812rem] pb-[0.75rem] pr-[0.312rem] pl-[0.937rem] gap-[1.062rem]">
            <div className="h-[2.188rem] w-[2.188rem] relative rounded-full bg-black" />
            <div className="flex flex-col items-start justify-start pt-[0.375rem] px-0 pb-0">
              <a className="[text-decoration:none] relative font-extrabold text-inherit whitespace-nowrap">
                Tantra Worlds
              </a>
            </div>
          </div>
          <div className="w-[40.813rem] flex flex-col items-start justify-start pt-[0.281rem] px-0 pb-0 box-border max-w-full text-[1rem] text-gray-500 lg:w-0">
            <div className="self-stretch flex flex-row items-start justify-start gap-[0.875rem] lg:hidden">
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-inherit inline-block min-w-[2.875rem]">
                  Home
                </a>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-inherit inline-block min-w-[2.125rem]">
                  Blog
                </a>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-inherit inline-block min-w-[3.938rem]">
                  Booking
                </a>
              </div>
              <div className="flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-inherit inline-block min-w-[4.313rem] whitespace-nowrap">
                  About us
                </a>
              </div>
              <div className="flex-1 flex flex-row items-start justify-start py-[1rem] px-[1.25rem]">
                <a className="[text-decoration:none] relative font-medium text-inherit inline-block min-w-[5.25rem] whitespace-nowrap">
                  Contact us
                </a>
              </div>
              <button className="cursor-pointer border-none py-[1rem] px-[1.25rem] bg-cornflowerblue-100 rounded-3xs flex flex-row items-start justify-start whitespace-nowrap hover:bg-cornflowerblue-200">
                <a className="[text-decoration:none] relative text-[1rem] font-medium font-inter text-white text-left inline-block min-w-[2.938rem]">
                  Log In
                </a>
              </button>
            </div>
          </div>
        </header>
        <div className="w-[41.25rem] flex flex-row items-start justify-start py-0 px-[0.937rem] box-border max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[5.5rem] max-w-full sm:gap-[1.375rem] md:gap-[2.75rem]">
            <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[2.125rem] box-border gap-[1.5rem] max-w-full z-[6]">
              <h1 className="m-0 relative text-inherit italic font-normal font-inherit whitespace-pre-wrap sm:text-[1.5rem] md:text-[2.5rem]">
                Stay that are
              </h1>
              <div className="flex flex-row items-start justify-start py-0 px-[0.562rem] font-italianno">
                <h1 className="m-0 relative text-inherit tracking-[0.05em] font-normal font-inherit sm:text-[1.5rem] md:text-[2.5rem]">
                  Experience
                </h1>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[0.75rem] box-border max-w-full text-[1.375rem]">
              <h3 className="m-0 flex-1 relative text-inherit font-normal font-inherit inline-block max-w-full z-[6] sm:text-[1.125rem]">
                Our exclusive collection of extra-ordinary stays at magical
                locations that are hidden from plain sight.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  className: PropTypes.string,
};

export default Hero;
