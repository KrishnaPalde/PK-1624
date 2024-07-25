import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent5 = ({
  className = "",
  locationimage,
  carbonlocationFilled,
  vector,
  vector1,
  vector2,
  vector3,
  vector4,
  propMarginLeft,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      marginLeft: propMarginLeft,
    };
  }, [propMarginLeft]);

  return (
    <div
      className={`h-[25.688rem] w-[20.375rem] flex flex-col items-start justify-start pt-[1.937rem] px-[0rem] pb-[0rem] box-border max-w-full text-left text-[1.25rem] text-white font-rubik ${className}`}
      style={frameDivStyle}
    >
      <div className="self-stretch flex-1 flex flex-row items-end justify-center py-[3.125rem] px-[1.25rem] relative">
        <img
          className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={locationimage}
        />
        <div className="h-[6.188rem] w-[8.75rem] flex flex-col items-start justify-start gap-[1.25rem] z-[1]">
          <h3 className="m-0 w-[5.375rem] h-[1.5rem] relative text-inherit font-light font-inherit inline-block mq450:text-[1rem]">
            Ba Na Hill
          </h3>
          <div className="w-[6rem] flex-1 flex flex-row items-start justify-end py-[0rem] pr-[0rem] pl-[2.125rem] box-border relative gap-[1.125rem] text-[1rem]">
            <img
              className="h-[1rem] w-[1rem] absolute !m-[0] top-[calc(50%_-_8px)] left-[0rem] overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src={carbonlocationFilled}
            />
            <div className="self-stretch flex-1 relative font-light">
              Da Nang
            </div>
          </div>
          <div className="self-stretch h-[1rem] flex flex-row items-start justify-start relative gap-[0.937rem]">
            <img
              className="h-full w-[1rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[0rem] max-h-full"
              loading="lazy"
              alt=""
              src={vector}
            />
            <img
              className="h-full w-[1rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[1.938rem] max-h-full"
              loading="lazy"
              alt=""
              src={vector1}
            />
            <img
              className="h-full w-[1rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[calc(50%_-_8px)] max-h-full"
              loading="lazy"
              alt=""
              src={vector2}
            />
            <img
              className="h-full w-[1rem] absolute !m-[0] top-[0rem] right-[1.938rem] bottom-[0rem] max-h-full"
              loading="lazy"
              alt=""
              src={vector3}
            />
            <img
              className="h-full w-[1rem] absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] max-h-full"
              alt=""
              src={vector4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
  locationimage: PropTypes.string,
  carbonlocationFilled: PropTypes.string,
  vector: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
  vector3: PropTypes.string,
  vector4: PropTypes.string,

  /** Style props */
  propMarginLeft: PropTypes.any,
};

export default FrameComponent5;
