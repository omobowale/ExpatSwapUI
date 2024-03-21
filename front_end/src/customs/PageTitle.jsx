import React from "react";

function PageTitle({ title }) {
  return (
    <div className="text-md font-semibold mt-6 mb-10">
      <div className="w-1/6 mx-auto">
        <p className="pb-3 border-b-2">{title}</p>
      </div>
    </div>
  );
}

export default PageTitle;
