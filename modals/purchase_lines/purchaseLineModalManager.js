import React, { useState, useEffect } from "react";
import LargeModal from "../../components/utility/modals/largeModal";
import SmallModal from "../../components/utility/modals/smallModal";

// Modal Contents
import EditModal from "./edit";
import RemoveModal from "./remove";

const PurchaseLineModalManager = ({
  data,
  setData,
  activeModal,
  setActiveModal,
  rowData,
}) => {
  const closeModal = () => {
    setActiveModal(null);
  };

  // Header Colors
  const selectedHeaderColor = () => {
    switch (activeModal) {
      case "edit":
        return "#ff9100";
      case "remove":
        return "#b71c1c";
      default:
        return null;
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "edit":
        return (
          <EditModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            setData={setData}
          />
        );
      case "remove":
        return (
          <RemoveModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            rowData={rowData}
            data={data}
            setData={setData}

          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {activeModal != null && activeModal != "remove" && (
        <LargeModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          title={activeModal}>
          {renderModalContent()}
        </LargeModal>
      )}

      {activeModal == "remove" && (
        <SmallModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          title={activeModal}>
          {renderModalContent()}
        </SmallModal>
      )}

      {activeModal == null && <></>}
    </>
  );
};

export default PurchaseLineModalManager;
