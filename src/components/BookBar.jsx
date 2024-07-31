import React from "react";

 const BookBar = () => {
  return (
    <div className="relative w-[1224px] h-[223px] bg-white rounded-2xl border border-solid border-[#e4e6e8]">
      <div className="absolute w-[133px] h-[22px] top-[38px] left-[1062px] bg-[url(/user-svg-fill.svg)] bg-[100%_100%]">
        <div className="absolute w-[113px] h-[22px] -top-px left-5 [font-family:'Manrope-Medium',Helvetica] font-medium text-neutral-500 text-sm tracking-[0] leading-[22px] whitespace-nowrap">
          Need some help?
        </div>
      </div>
      <div className="absolute w-[1166px] h-[104px] top-[91px] left-[31px] bg-white rounded-2xl border border-solid border-[#e4e6e8]">
        <div className="w-[60px] left-7 absolute h-[22px] top-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-neutral-500 text-sm tracking-[0] leading-[22px] whitespace-nowrap">
          Location
        </div>
        <div className="absolute w-px h-[58px] top-[23px] left-[223px] bg-[#e4e6e8]" />
        <button className="all-[unset] box-border absolute w-[159px] h-8 top-[50px] left-7 bg-[url(/location-svg-fill.svg)] bg-[100%_100%]">
          <div className="absolute w-[97px] h-[22px] top-1 left-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            New York, USA
          </div>
          <img
            className="left-[135px] absolute w-3.5 h-2.5 top-2.5"
            alt="Image"
            src="image.svg"
          />
        </button>
        <div className="w-[59px] left-[261px] absolute h-[22px] top-6 [font-family:'Manrope-Bold',Helvetica] font-bold text-neutral-500 text-sm tracking-[0] leading-[22px] whitespace-nowrap">
          Check In
        </div>
        <div className="left-[456px] absolute w-px h-[58px] top-[25px] bg-[#e4e6e8]" />
        <div className="left-[261px] absolute w-[179px] h-[30px] top-[52px] rounded">
          <div className="absolute w-[179px] h-[30px] top-0 left-0 rounded bg-[url(/calendar-svg-fill.svg)] bg-[100%_100%]">
            <div className="relative w-[153px] h-[22px] top-1 left-[22px] overflow-scroll">
              <div className="w-28 -top-0.5 left-0 absolute h-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[22px]">
                02 January 2024
              </div>
            </div>
          </div>
          <img
            className="left-[155px] absolute w-3.5 h-2.5 top-2.5"
            alt="Image"
            src="image-2.svg"
          />
        </div>
        <div className="w-[72px] left-[494px] absolute h-[22px] top-6 [font-family:'Manrope-Bold',Helvetica] font-bold text-neutral-500 text-sm tracking-[0] leading-[22px] whitespace-nowrap">
          Check Out
        </div>
        <div className="left-[688px] absolute w-px h-[58px] top-[25px] bg-[#e4e6e8]" />
        <div className="left-[494px] absolute w-[179px] h-[30px] top-[52px] rounded">
          <div className="absolute w-[179px] h-[30px] top-0 left-0 rounded bg-[url(/calendar-svg-fill-2.svg)] bg-[100%_100%]">
            <div className="relative w-[153px] h-[22px] top-1 left-[22px] overflow-scroll">
              <div className="w-28 -top-0.5 left-0 absolute h-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[22px]">
                02 January 2024
              </div>
            </div>
          </div>
          <img
            className="left-[155px] absolute w-3.5 h-2.5 top-2.5"
            alt="Image"
            src="image-3.svg"
          />
        </div>
        <div className="w-[41px] left-[726px] absolute h-[22px] top-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-neutral-500 text-sm tracking-[0] leading-[22px] whitespace-nowrap">
          Guest
        </div>
        <button className="all-[unset] box-border absolute w-[190px] h-8 top-[50px] left-[726px] bg-[url(/user-svg-fill-2.svg)] bg-[100%_100%]">
          <div className="w-32 top-1 left-[22px] whitespace-nowrap absolute h-[22px] [font-family:'Manrope-Bold',Helvetica] font-bold text-black text-sm tracking-[0] leading-[22px]">
            2 adults, 2 children
          </div>
          <img
            className="left-[166px] absolute w-3.5 h-2.5 top-2.5"
            alt="Image"
            src="image-4.svg"
          />
        </button>
        <button className="all-[unset] box-border absolute w-[151px] h-[58px] top-6 left-[987px] bg-[#3fa2f6] rounded-[50px]">
          <img
            className="absolute w-5 h-5 top-[19px] left-[33px]"
            alt="Svg"
            src="SVG.svg"
          />
          <div className="absolute w-[55px] h-[26px] top-[15px] left-[63px] [font-family:'Manrope-Bold',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-[26px] whitespace-nowrap">
            Search
          </div>
        </button>
      </div>
      <div className="absolute top-[21px] left-[33px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-2xl text-center tracking-[0] leading-[normal]">
        Book a Room
      </div>
      <p className="absolute top-[53px] left-[34px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#5d5d5d] text-sm text-center tracking-[0] leading-[normal]">
        Discover the perfect space for you!
      </p>
    </div>
  );
};

export default BookBar;
