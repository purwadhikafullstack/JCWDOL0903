import React from "react";

const ChartsHeader = ({ title }) => (
  <div className="sm:flex sm:items-center">
    <div className="sm:flex-auto">
      <h1 className="text-2xl relative font-semibold w-max text-gray-900 after:block after:bg-red-300 after:absolute after:h-[30%] after:bottom-1 after:-z-10 after:left-0 after:right-0">
        {title}
      </h1>
    </div>
  </div>
);

export default ChartsHeader;
