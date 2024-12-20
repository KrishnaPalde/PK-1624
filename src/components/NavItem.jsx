import React from "react";

function NavItem({ label }) {
  if (label == "Log In") {
    return (
      <span className="lg:px-4 px-6 py-2  text-white transition-colors duration-300 rounded-lg bg-[#335064] hover:bg-[#243947]">
        {label}
      </span>
    );
  }
  else {
    return (
      <span className="py-2 text-lg font-medium transition-colors duration-300 lg:px-4 whitespace-nowrap hover:text-black hover:text-opacity-75">
        {label}
      </span>
    );
  }
  
}

export default NavItem;
