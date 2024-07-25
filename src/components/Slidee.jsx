import FrameComponent5 from "./FrameComponent5";
import GroupComponent from "./GroupComponent";
import PropTypes from "prop-types";

const Slidee = ({ className = "" }) => {
  return (
    <section
    className={`w-full overflow-x-hidden flex flex-row items-start justify-start text-center text-[2rem] text-white font-inter ${className}`}
    >
      <div className="flex flex-row items-start justify-start gap-[1.25rem] max-w-full">
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 overflow-x-auto flex flex-row items-start justify-start pt-[1.937rem] px-[0rem] pb-[2.062rem] box-border relative gap-[1.25rem] max-w-full mq450:pt-[1.25rem] mq450:pb-[1.313rem] mq450:box-border">
            <div className="w-[20.375rem] shrink-0 flex flex-row items-start justify-start relative max-w-full">
              <img
                className="h-[23.75rem] flex-1 relative max-w-full overflow-hidden object-cover"
                loading="lazy"
                alt=""
                src="/group-21@2x.png"
              />
              <h1 className="!m-[0] absolute bottom-[6.25rem] left-[7.75rem] text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[4.313rem] z-[1] mq450:text-[1.188rem] mq825:text-[1.625rem]">
                Chill
              </h1>
            </div>
            <div className="w-[28.25rem] shrink-0 flex flex-col items-start justify-start max-w-full">
              <div className="w-[21.625rem] flex flex-row items-start justify-start py-[0rem] pr-[1.25rem] pl-[0rem] box-border relative max-w-full">
                <img
                  className="h-[23.75rem] flex-1 relative max-w-full overflow-hidden object-cover"
                  alt=""
                  src="/group-19@2x.png"
                />
                <h1 className="!m-[0] absolute bottom-[5.75rem] left-[calc(50%_-_79px)] text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-[1.188rem] mq825:text-[1.625rem]">
                  Wedding
                </h1>
              </div>
            </div>
            <div className="w-[12.125rem] shrink-0 flex flex-col items-start justify-start pt-[15.562rem] px-[0rem] pb-[0rem] box-border">
              <h1 className="m-0 relative text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[4.25rem] z-[2] mq450:text-[1.188rem] mq825:text-[1.625rem]">
                Pool
              </h1>
            </div>
            <div className="h-full w-[23.75rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[calc(50%_-_190px)] max-h-full shrink-0 z-[1] flex items-center justify-center">
              <img
                className="h-full w-full shrink-0 z-[1] object-contain absolute left-[0.25rem] top-[0rem] [transform:scale(1.158)]"
                alt=""
                src="/group-24@2x.png"
              />
            </div>
            <div className="w-[33.438rem] shrink-0 flex flex-row items-start justify-start gap-[1.25rem] max-w-full mq825:flex-wrap mq825:justify-center">
              <div className="w-[20.375rem] flex flex-row items-start justify-start relative max-w-full shrink-0">
                <img
                  className="h-[23.75rem] flex-1 relative max-w-full overflow-hidden object-cover shrink-0"
                  loading="lazy"
                  alt=""
                  src="/group-20@2x.png"
                />
                <h1 className="!m-[0] absolute right-[7.375rem] bottom-[6.25rem] text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[3.75rem] z-[1] mq450:text-[1.188rem] mq825:text-[1.625rem]">
                  Spa
                </h1>
              </div>
              <div className="w-[20.375rem] flex flex-row items-start justify-start relative max-w-full shrink-0">
                <img
                  className="h-[23.75rem] flex-1 relative max-w-full overflow-hidden object-cover shrink-0"
                  loading="lazy"
                  alt=""
                  src="/group-20-1@2x.png"
                />
                <h1 className="!m-[0] w-[10.625rem] absolute right-[3.875rem] bottom-[5.75rem] text-inherit font-semibold font-inherit text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block z-[1] mq450:text-[1.188rem] mq825:text-[1.625rem]">
                  Restaurant
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full text-left text-[1.25rem] font-rubik lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full lg:flex-wrap">
            <FrameComponent5
              locationimage="/locationimage@2x.png"
              carbonlocationFilled="/carbonlocationfilled.svg"
              vector="/vector.svg"
              vector1="/vector-1.svg"
              vector2="/vector-2.svg"
              vector3="/vector-3.svg"
              vector4="/vector-4.svg"
            />
            <div className="flex-1 flex flex-row items-start justify-start min-w-[41.125rem] [row-gap:20px] max-w-full mq825:flex-wrap mq825:min-w-full">
              <FrameComponent5
                locationimage="/rectangle-19-1@2x.png"
                carbonlocationFilled="/carbonlocationfilled-1.svg"
                vector="/vector-5.svg"
                vector1="/vector-6.svg"
                vector2="/vector-7.svg"
                vector3="/vector-8.svg"
                vector4="/vector-9.svg"
                propMarginLeft="unset"
              />
              <GroupComponent
                locationimage="/rectangle-19-2@2x.png"
                carbonlocationFilled="/carbonlocationfilled-2.svg"
                vector="/vector-10.svg"
                vector1="/vector-11.svg"
                vector2="/vector-12.svg"
                vector3="/vector-13.svg"
                vector4="/vector-14.svg"
              />
              <FrameComponent5
                locationimage="/rectangle-19-3@2x.png"
                carbonlocationFilled="/carbonlocationfilled-3.svg"
                vector="/vector-15.svg"
                vector1="/vector-16.svg"
                vector2="/vector-17.svg"
                vector3="/vector-18.svg"
                vector4="/vector-19.svg"
                propMarginLeft="-0.625rem"
              />
            </div>
            <FrameComponent5
              locationimage="/rectangle-19-4@2x.png"
              carbonlocationFilled="/carbonlocationfilled-4.svg"
              vector="/vector-20.svg"
              vector1="/vector-21.svg"
              vector2="/vector-22.svg"
              vector3="/vector-23.svg"
              vector4="/vector-24.svg"
              propMarginLeft="unset"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full lg:flex-wrap">
            <FrameComponent5
              locationimage="/rectangle-19-1@2x.png"
              carbonlocationFilled="/carbonlocationfilled.svg"
              vector="/vector.svg"
              vector1="/vector.svg"
              vector2="/vector.svg"
              vector3="/vector.svg"
              vector4="/vector-29.svg"
              propMarginLeft="unset"
            />
            <div className="flex-1 flex flex-row items-start justify-start min-w-[41.125rem] [row-gap:20px] max-w-full mq825:flex-wrap mq825:min-w-full">
              <FrameComponent5
                locationimage="/rectangle-19-6@2x.png"
                carbonlocationFilled="/carbonlocationfilled-6.svg"
                vector="/vector-30.svg"
                vector1="/vector-31.svg"
                vector2="/vector-32.svg"
                vector3="/vector-33.svg"
                vector4="/vector-34.svg"
                propMarginLeft="unset"
              />
              <GroupComponent
                locationimage="/rectangle-19-7@2x.png"
                carbonlocationFilled="/carbonlocationfilled-7.svg"
                vector="/vector-35.svg"
                vector1="/vector-36.svg"
                vector2="/vector-37.svg"
                vector3="/vector-38.svg"
                vector4="/vector-39.svg"
              />
              <FrameComponent5
                locationimage="/rectangle-19-4@2x.png"
                carbonlocationFilled="/carbonlocationfilled-8.svg"
                vector="/vector-40.svg"
                vector1="/vector-41.svg"
                vector2="/vector-42.svg"
                vector3="/vector-43.svg"
                vector4="/vector-44.svg"
                propMarginLeft="-0.625rem"
              />
            </div>
            <FrameComponent5
              locationimage="/locationimage@2x.png"
              carbonlocationFilled="/carbonlocationfilled-9.svg"
              vector="/vector-45.svg"
              vector1="/vector-46.svg"
              vector2="/vector-47.svg"
              vector3="/vector-48.svg"
              vector4="/vector-49.svg"
              propMarginLeft="unset"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full lg:flex-wrap">
            <FrameComponent5
              locationimage="/rectangle-19-6@2x.png"
              carbonlocationFilled="/carbonlocationfilled.svg"
              vector="/vector.svg"
              vector1="/vector.svg"
              vector2="/vector.svg"
              vector3="/vector.svg"
              vector4="/vector-54.svg"
              propMarginLeft="unset"
            />
            <div className="flex-1 flex flex-row items-start justify-start min-w-[41.125rem] [row-gap:20px] max-w-full mq825:flex-wrap mq825:min-w-full">
              <FrameComponent5
                locationimage="/rectangle-19-3@2x.png"
                carbonlocationFilled="/carbonlocationfilled-11.svg"
                vector="/vector-55.svg"
                vector1="/vector-56.svg"
                vector2="/vector-57.svg"
                vector3="/vector-58.svg"
                vector4="/vector-59.svg"
                propMarginLeft="unset"
              />
              <GroupComponent
                locationimage="/rectangle-19-12@2x.png"
                carbonlocationFilled="/carbonlocationfilled-12.svg"
                vector="/vector-60.svg"
                vector1="/vector-61.svg"
                vector2="/vector-62.svg"
                vector3="/vector-63.svg"
                vector4="/vector-64.svg"
              />
              <FrameComponent5
                locationimage="/locationimage@2x.png"
                carbonlocationFilled="/carbonlocationfilled-13.svg"
                vector="/vector-65.svg"
                vector1="/vector-66.svg"
                vector2="/vector-67.svg"
                vector3="/vector-68.svg"
                vector4="/vector-69.svg"
                propMarginLeft="-0.625rem"
              />
            </div>
            <FrameComponent5
              locationimage="/rectangle-19-1@2x.png"
              carbonlocationFilled="/carbonlocationfilled-14.svg"
              vector="/vector-70.svg"
              vector1="/vector-71.svg"
              vector2="/vector-72.svg"
              vector3="/vector-73.svg"
              vector4="/vector-74.svg"
              propMarginLeft="unset"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full lg:flex-wrap">
            <FrameComponent5
              locationimage="/rectangle-19-3@2x.png"
              carbonlocationFilled="/carbonlocationfilled.svg"
              vector="/vector.svg"
              vector1="/vector.svg"
              vector2="/vector.svg"
              vector3="/vector.svg"
              vector4="/vector-79.svg"
              propMarginLeft="unset"
            />
            <div className="flex-1 flex flex-row items-start justify-start min-w-[41.125rem] [row-gap:20px] max-w-full mq825:flex-wrap mq825:min-w-full">
              <FrameComponent5
                locationimage="/rectangle-19-4@2x.png"
                carbonlocationFilled="/carbonlocationfilled-16.svg"
                vector="/vector-80.svg"
                vector1="/vector-81.svg"
                vector2="/vector-82.svg"
                vector3="/vector-83.svg"
                vector4="/vector-84.svg"
                propMarginLeft="unset"
              />
              <GroupComponent
                locationimage="/rectangle-19-17@2x.png"
                carbonlocationFilled="/carbonlocationfilled-17.svg"
                vector="/vector-85.svg"
                vector1="/vector-86.svg"
                vector2="/vector-87.svg"
                vector3="/vector-88.svg"
                vector4="/vector-89.svg"
              />
              <FrameComponent5
                locationimage="/rectangle-19-1@2x.png"
                carbonlocationFilled="/carbonlocationfilled-18.svg"
                vector="/vector-90.svg"
                vector1="/vector-91.svg"
                vector2="/vector-92.svg"
                vector3="/vector-93.svg"
                vector4="/vector-94.svg"
                propMarginLeft="-0.625rem"
              />
            </div>
            <FrameComponent5
              locationimage="/rectangle-19-6@2x.png"
              carbonlocationFilled="/carbonlocationfilled-19.svg"
              vector="/vector-95.svg"
              vector1="/vector-96.svg"
              vector2="/vector-97.svg"
              vector3="/vector-98.svg"
              vector4="/vector-99.svg"
              propMarginLeft="unset"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-row items-start justify-start min-w-[104.375rem] max-w-full lg:min-w-full mq450:min-w-full mq825:min-w-full mq1425:min-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[1.25rem] max-w-full lg:flex-wrap">
            <FrameComponent5
              locationimage="/rectangle-19-4@2x.png"
              carbonlocationFilled="/carbonlocationfilled.svg"
              vector="/vector.svg"
              vector1="/vector.svg"
              vector2="/vector.svg"
              vector3="/vector.svg"
              vector4="/vector-104.svg"
              propMarginLeft="unset"
            />
            <div className="flex-1 flex flex-row items-start justify-start min-w-[41.125rem] [row-gap:20px] max-w-full mq825:flex-wrap mq825:min-w-full">
              <FrameComponent5
                locationimage="/locationimage@2x.png"
                carbonlocationFilled="/carbonlocationfilled-21.svg"
                vector="/vector-105.svg"
                vector1="/vector-106.svg"
                vector2="/vector-107.svg"
                vector3="/vector-108.svg"
                vector4="/vector-109.svg"
                propMarginLeft="unset"
              />
              <GroupComponent
                locationimage="/rectangle-19-22@2x.png"
                carbonlocationFilled="/carbonlocationfilled-22.svg"
                vector="/vector-110.svg"
                vector1="/vector-111.svg"
                vector2="/vector-112.svg"
                vector3="/vector-113.svg"
                vector4="/vector-114.svg"
              />
              <FrameComponent5
                locationimage="/rectangle-19-6@2x.png"
                carbonlocationFilled="/carbonlocationfilled-23.svg"
                vector="/vector-115.svg"
                vector1="/vector-116.svg"
                vector2="/vector-117.svg"
                vector3="/vector-118.svg"
                vector4="/vector-119.svg"
                propMarginLeft="-0.625rem"
              />
            </div>
            <FrameComponent5
              locationimage="/rectangle-19-3@2x.png"
              carbonlocationFilled="/carbonlocationfilled-24.svg"
              vector="/vector-120.svg"
              vector1="/vector-121.svg"
              vector2="/vector-122.svg"
              vector3="/vector-123.svg"
              vector4="/vector-124.svg"
              propMarginLeft="unset"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Slidee.propTypes = {
  className: PropTypes.string,
};

export default Slidee;

