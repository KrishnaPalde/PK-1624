import PropTypes from "prop-types";

const FrameComponent5 = ({
  className = "",
  rectangle3679,
  gUESTS,
  appartment,
}) => {
  return (
    <div
      className={`self-stretch flex-1 flex flex-col items-start justify-start gap-[0.937rem] text-left text-[0.875rem] text-gray-700 font-inter ${className}`}
    >
      <img
        className="self-stretch flex-1 relative rounded-11xl max-w-full overflow-hidden max-h-full object-cover"
        loading="lazy"
        alt=""
        src={rectangle3679}
      />
      <div className="flex flex-col items-start justify-start gap-[0.312rem]">
        <div className="relative leading-[1.188rem] font-medium inline-block min-w-[4.313rem]">
          {gUESTS}
        </div>
        <h3 className="m-0 relative text-[1.375rem] leading-[133.02%] font-bold font-inherit text-dark mq450:text-[1.125rem] mq450:leading-[1.438rem]">
          {appartment}
        </h3>
      </div>
    </div>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
  rectangle3679: PropTypes.string,
  gUESTS: PropTypes.string,
  appartment: PropTypes.string,
};

export default FrameComponent5;
