import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./css/modal.css"

function GeneralModal({
  isOpen,
  onClose,
  children,
  showCloseButton,
  transparent = false,
  zIndex = 1000,
  widthClass = "w-1/2",
}) {
  return (
    <div
      className="custom-modal"
      style={{ display: isOpen ? "" : "none", zIndex }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`${widthClass} mx-auto text-center relative`}>
        {showCloseButton && (
          <AiOutlineCloseCircle
            style={{
              position: "absolute",
              top: "0",
              right: 0,
              fontSize: "2em",
              color: "red",
              cursor: "pointer",
              zIndex: 20000000000,
            }}
            onClick={onClose}
          />
        )}
        <div
          className={`${transparent ? "" : "bg-white"} w-full`}
          style={{ width: "100%" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default GeneralModal;
