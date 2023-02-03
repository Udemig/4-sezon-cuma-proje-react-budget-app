import React from "react";

import "../assets/styles/modal.css";

const GeneralModal = ({
  title = "",
  content = "",
  closeButtonText = "Kapat",
  closeButtonClick = () => {},
  confirmButtonText = "Onayla",
  confirmButtonClick = () => {},
  hasConfirm = false,
}) => {
  return (
    <div className="modalContainer">
      <div className="modalContentContainer">
        <h2 className="modalTitle">{title}</h2>
        <p className="modalContentText">{content}</p>
        <div className="modalButtonsWrapper">
          <button className="cancelBtn" onClick={closeButtonClick}>{closeButtonText}</button>
          {hasConfirm === true && (
            <button className="confirmBtn" onClick={confirmButtonClick}>{confirmButtonText}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
