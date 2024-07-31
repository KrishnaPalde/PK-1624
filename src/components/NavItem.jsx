import React from "react";

function NavItem({ label }) {
  return (
    <span className="px-4 py-2 transition-colors duration-300 whitespace-nowrap hover:text-black hover:text-opacity-75">
      {label}
    </span>
  );
}

export default NavItem;
