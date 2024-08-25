import React from "react";

const DatePicker = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-white rounded-3xl max-w-[452px]">
      <div className="flex items-end justify-center w-full gap-2 pt-4 pb-3 pl-6 pr-3 border-b border-stone-300">
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          <div className="text-sm font-medium leading-5 tracking-normal text-zinc-700">
            Select date
          </div>
          <div className="text-3xl leading-10 tracking-normal mt-9 text-zinc-900">
            Mon, Jul 17
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-12 min-h-[48px]">
          <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
            <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
              <img
                loading="lazy"
                src="https://static.vecteezy.com/system/resources/previews/006/796/044/original/gear-icon-suitable-for-setting-symbol-line-icon-style-simple-design-editable-design-template-free-vector.jpg"
                className="self-stretch object-contain w-6 my-auto aspect-square"
                alt="Calendar icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-10 py-1 pl-4 pr-3 text-sm font-medium leading-5 tracking-normal text-center text-zinc-700">
        <div className="flex flex-col self-stretch my-auto">
          <div className="flex overflow-hidden gap-2 justify-center items-center py-2.5 pr-1 pl-2 rounded-[100px]">
            <div className="self-stretch my-auto">August 2024</div>
            <img
              loading="lazy"
              src="https://static.vecteezy.com/system/resources/previews/006/827/566/non_2x/down-arrow-icon-sign-symbol-logo-vector.jpg"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              alt="Down arrow"
            />
          </div>
        </div>
        <img
          loading="lazy"
          src="https://static.vecteezy.com/system/resources/previews/006/796/044/original/gear-icon-suitable-for-setting-symbol-line-icon-style-simple-design-editable-design-template-free-vector.jpg"
          className="object-contain shrink-0 self-stretch my-auto w-24 aspect-[2]"
          alt="Navigation arrows"
        />
      </div>
      <div className="flex flex-col w-full px-3">
        <div className="flex justify-center w-full text-base tracking-wide leading-6 text-center whitespace-nowrap min-h-[48px] text-zinc-900">
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">S</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">M</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">T</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">W</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">T</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">F</div>
          <div className="flex-1 shrink gap-2.5 self-stretch h-full">S</div>
        </div>
        <div className="flex justify-center w-full min-h-[48px]">
          <div className="flex items-center justify-center flex-1 h-full gap-2 p-1 shrink basis-0">
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-2 my-auto w-10 min-h-[40px]">
                <div className="flex self-stretch my-auto min-h-[24px] w-[22px]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 h-full gap-2 p-1 shrink basis-0">
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-2 my-auto w-10 min-h-[40px]">
                <div className="flex self-stretch my-auto min-h-[24px] w-[22px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                1
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                2
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                3
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                4
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center text-blue-600 whitespace-nowrap basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 h-10 border border-blue-600 border-solid min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch px-2.5 py-2 my-auto w-10 min-h-[40px]">
                5
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full text-base tracking-wide leading-6 text-center whitespace-nowrap min-h-[48px] text-zinc-900">
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                6
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                7
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                8
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                9
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                10
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                11
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                12
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full text-base tracking-wide leading-6 text-center whitespace-nowrap min-h-[48px] text-zinc-900">
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                13
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                14
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                15
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                16
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 text-sm font-medium leading-5 tracking-normal text-white shrink basis-0">
            <div className="flex overflow-hidden gap-2.5 items-center w-10 h-10 bg-blue-600 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch w-10 min-h-[40px]">17</div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                18
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                19
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full text-base tracking-wide leading-6 text-center whitespace-nowrap min-h-[48px] text-zinc-900">
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                20
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                21
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                22
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                23
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                24
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                25
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full basis-0">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                26
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full min-h-[48px]">
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                27
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                28
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                29
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                30
              </div>
            </div>
          </div>
          <div className="flex flex-1 shrink gap-2.5 justify-center items-center h-full text-base tracking-wide leading-6 text-center whitespace-nowrap basis-0 text-zinc-900">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px] rounded-[100px]">
              <div className="gap-2.5 self-stretch my-auto w-10 min-h-[40px]">
                31
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 h-full gap-2 p-1 shrink basis-0">
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-2 my-auto w-10 min-h-[40px]">
                <div className="flex self-stretch my-auto min-h-[24px] w-[22px]" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 h-full gap-2 p-1 shrink basis-0">
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-10 min-h-[40px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-2 my-auto w-10 min-h-[40px]">
                <div className="flex self-stretch my-auto min-h-[24px] w-[22px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between w-full px-3 pt-2 pb-3 text-sm font-medium leading-5 tracking-normal text-center text-blue-600 whitespace-nowrap">
        <div className="flex flex-1 shrink gap-2 items-start w-full basis-0 min-w-[240px]">
          <div className="flex overflow-hidden flex-col justify-center min-h-[40px] rounded-[100px] w-[68px]">
            <div className="flex-1 gap-2 self-stretch px-3 py-2.5 size-full">
              Cancel
            </div>
          </div>
          <div className="flex overflow-hidden flex-col justify-center min-h-[40px] rounded-[100px] w-[43px]">
            <div className="flex-1 gap-2 self-stretch px-3 py-2.5 size-full">
              OK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
