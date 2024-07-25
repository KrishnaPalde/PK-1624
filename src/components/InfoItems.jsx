import { useMemo } from "react";
import PropTypes from "prop-types";

const InfoItems = ({
  className = "",
  emailAddress,
  helpinfocom,
  propWidth,
  propPadding,
}) => {
  const infoItemsStyle = useMemo(() => {
    return {
      width: propWidth,
      padding: propPadding,
    };
  }, [propWidth, propPadding]);

  return (
    <div
      className={`w-[19.438rem] flex flex-col items-start justify-start py-[0rem] pr-[1.25rem] pl-[0rem] box-border gap-[1.606rem] text-left text-[1.375rem] text-black font-paragraph ${className}`}
      style={infoItemsStyle}
    >
      <h3 className="m-0 relative text-inherit font-semibold font-inherit mq450:text-[1.125rem]">
        {emailAddress}
      </h3>
      <div className="w-[1.688rem] h-[0.188rem] relative bg-black" />
      <h3 className="m-0 relative text-inherit font-semibold font-inherit whitespace-nowrap mq450:text-[1.125rem]">
        {helpinfocom}
      </h3>
      <div className="w-[15.375rem] relative text-[1.25rem] leading-[2rem] inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
        <p className="m-0">{`Assistance hours: `}</p>
        <p className="m-0">Monday - Friday 6 am to 8 pm EST</p>
      </div>
    </div>
  );
};

InfoItems.propTypes = {
  className: PropTypes.string,
  emailAddress: PropTypes.string,
  helpinfocom: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propPadding: PropTypes.any,
};

export default InfoItems;
