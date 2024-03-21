import React from "react";
import { PAGE_SIZE_OPTIONS } from "../constants/texts";

function CustomPageSizeOptions({ pageSize, setPageSize }) {
  return (
    <div className="text-left mx-5 mt-6 mb-3">
      <label className="mr-1">Show</label>
      <select
        className="outline-none"
        onChange={(e) => setPageSize(e.target.value)}
        value={pageSize}
      >
        {PAGE_SIZE_OPTIONS.map((size) => {
          return <option value={size}>{size}</option>;
        })}
      </select>
      <label className="ml-1">Entries</label>
    </div>
  );
}

export default CustomPageSizeOptions;
