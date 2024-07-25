import { useMemo } from "react";
import PropTypes from "prop-types";

const InputField = ({
  className = "",
  label,
  text,
  propFlex,
  propMinWidth,
  propAlignSelf,
}) => {
  const inputFieldStyle = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propMinWidth, propAlignSelf]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start min-w-[9.125rem] text-left text-[0.875rem] text-gray-700 font-paragraph ${className}`}
      style={inputFieldStyle}
    >
      <div className="self-stretch flex flex-col items-start justify-start gap-[0.375rem]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[0.375rem]">
          <div className="relative leading-[1.25rem] font-medium inline-block min-w-[4.438rem]">
            {label}
          </div>
          <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-lg bg-white overflow-hidden flex flex-row items-center justify-start py-[0.625rem] px-[0.937rem] gap-[0.5rem] text-[1rem] text-gray-500 border-[1px] border-solid border-gray-300">
            <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
              <img
                className="h-[1.25rem] w-[1.25rem] relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/mail.svg"
              />
              <div className="flex-1 relative leading-[1.5rem]">{text}</div>
            </div>
            <img
              className="h-[1rem] w-[1rem] relative hidden"
              alt=""
              src="/help-icon.svg"
            />
          </div>
        </div>
        <div className="self-stretch relative leading-[1.25rem] text-gray-500 hidden">
          This is a hint text to help user.
        </div>
      </div>
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propMinWidth: PropTypes.any,
  propAlignSelf: PropTypes.any,
};

export default InputField;
