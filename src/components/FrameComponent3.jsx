import { Select } from "@chakra-ui/react";
import PropTypes from "prop-types";

const FrameComponent3 = ({
  className = "",
  labelLocation,
  locationsvgFill,
  newYorkUSA,
  image,
}) => {
  return (
    <div
      className={`flex flex-col items-start justify-end pt-[0rem] pb-[0.062rem] pr-[1.25rem] pl-[0rem] text-left text-[0.875rem] text-dimgray-100 font-manrope ${className}`}
    >
      <div className="flex flex-col items-start justify-start gap-[0.312rem]">
        <b className="relative leading-[1.375rem] inline-block min-w-[3.75rem]">
          {labelLocation}
        </b>
        <Select className="font-manrope font-bold text-[0.875rem] text-black" />
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
  labelLocation: PropTypes.string,
  locationsvgFill: PropTypes.string,
  newYorkUSA: PropTypes.string,
  image: PropTypes.string,
};

export default FrameComponent3;
