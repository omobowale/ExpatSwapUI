import React from "react";
import { ROTATING_TRIANGLE } from "../constants/texts";
import GeneralModal from "./GeneralModal";
import { RotatingTriangles } from "react-loader-spinner";

function CustomLoader({
  isLoading,
  type = ROTATING_TRIANGLE,
  message = "",
  zIndex = 1000,
}) {
  return (
    <GeneralModal
      showCloseButton={false}
      isOpen={isLoading}
      transparent={true}
      zIndex={zIndex}
    >
      <div className="flex items-center justify-center">
        <div></div>
        {type == ROTATING_TRIANGLE && (
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        <div className="mt-6"></div>
      </div>
      <div clasName="text-white mt-6" style={{color: "white"}}>{message}...</div>
    </GeneralModal>
  );
}

export default CustomLoader;
