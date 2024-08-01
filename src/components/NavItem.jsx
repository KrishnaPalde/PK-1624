import React from "react";

function NavItem({ label }) {
  if (label == "Log In") {
    return (
      <span className="px-4 py-2 text-white transition-colors duration-300 rounded-lg bg-[#3FA2F6] hover:bg-sky-500">
        {label}
      </span>
    );
  } else {
    return (
      <span className="px-4 py-2 transition-colors duration-300 whitespace-nowrap hover:text-black hover:text-opacity-75">
        {label}
      </span>
    );
  }
  
}

export default NavItem;
