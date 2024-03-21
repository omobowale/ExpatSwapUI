import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function CustomInputField({
  label,
  placeholder,
  name,
  min = "",
  type = "text",
}) {
  return (
    <div className="my-2">
      <div className="flex justify-center items-center w-1/2 mx-auto">
        <label className="w-1/4 text-left">{label} <span className="text-red-600">*</span></label>
        <div className="flex w-3/4 flex-col items-start">
          <Field
            className="outline-none border rounded-sm px-2 py-1 w-full"
            type={type}
            name={name}
            min = {min}
            placeholder={placeholder}
          />
          <ErrorMessage className="text-xs text-red-400" name={name} component="div" />
        </div>
      </div>
    </div>
  );
}

export default CustomInputField;
