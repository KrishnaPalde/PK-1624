import PropTypes from "prop-types";

const GroupComponent = ({
  className = "",
  locationimage,
  carbonlocationFilled,
  vector,
  vector1,
  vector2,
  vector3,
  vector4,
}) => {
  return (
    <div
      className={`flex-1 flex flex-row items-start justify-start pt-[4.437rem] pb-[5rem] pr-[0rem] pl-[7.5rem] box-border relative gap-[1.25rem] min-w-[15.438rem] shrink-0 max-w-full z-[2] ml-[-0.625rem] text-left text-[1.25rem] text-white font-rubik mq450:flex-wrap mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:pb-[3.25rem] mq450:box-border ${className}`}
    >
      <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-xl max-w-full max-h-full flex items-center justify-center z-[0]">
        <img
          className="h-full w-full overflow-hidden object-contain absolute left-[0.25rem] top-[0.25rem] [transform:scale(1.158)]"
          alt=""
          src={locationimage}
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-start pt-[12.125rem] px-[0rem] pb-[0rem] box-border min-w-[5.688rem]">
        <div className="self-stretch h-[6.188rem] flex flex-row items-start justify-start z-[1]">
          <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[1.25rem]">
            <h3 className="m-0 w-[5.375rem] h-[1.5rem] relative text-inherit font-light font-inherit inline-block mq450:text-[1rem]">
              Ba Na Hill
            </h3>
            <div className="w-[7.25rem] flex-1 flex flex-row items-start justify-end py-[0rem] pr-[1.25rem] pl-[2.125rem] box-border relative gap-[1.125rem] text-[1rem]">
              <img
                className="h-[1rem] w-[1rem] absolute !m-[0] top-[calc(50%_-_8px)] left-[0rem] overflow-hidden shrink-0"
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
                alt=""
                src={vector}
              />
              <img
                className="h-full w-[1rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[1.938rem] max-h-full"
                alt=""
                src={vector1}
              />
              <img
                className="h-full w-[1rem] absolute !m-[0] top-[0rem] bottom-[0rem] left-[calc(50%_-_8px)] max-h-full"
                alt=""
                src={vector2}
              />
              <img
                className="h-full w-[1rem] absolute !m-[0] top-[0rem] right-[1.938rem] bottom-[0rem] max-h-full"
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
      <div className="h-[1.813rem] w-[6.25rem] flex flex-row items-start justify-start py-[0.375rem] px-[0.75rem] box-border relative whitespace-nowrap z-[1] text-[0.875rem] text-black">
        <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-tl-3xs rounded-tr-none rounded-br-none rounded-bl-3xs bg-white" />
        <div className="self-stretch flex-1 relative font-light z-[1]">
          20$ per day
        </div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  locationimage: PropTypes.string,
  carbonlocationFilled: PropTypes.string,
  vector: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
  vector3: PropTypes.string,
  vector4: PropTypes.string,
};

export default GroupComponent;
