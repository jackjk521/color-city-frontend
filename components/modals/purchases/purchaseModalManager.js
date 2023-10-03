import React, { useState, useEffect } from "react";
import ReusableModal from "../modal";

// Modal Contents
import AddPurchaseModal from "./add";
import ViewPurchaseModal from "./view";
import EditPurchaseModal from "./edit";
import RemovePurchaseModal from "./remove";

const PurchaseModalManager = ({ modalType, setActiveModal }) => {
  const closeModal = () => {
    setActiveModal(null);
  };

  // Header Colors
  const selectedHeaderColor = () => {
    switch (modalType) {
      case "add":
        return "green";
      case "view":
        return "blue";
      case "edit":
        return "yellow";
      case "remove":
        return "red";
      default:
        return null;
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "add":
        return (
          <AddPurchaseModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
          />
        );
      case "view":
        return (
          <AddPurchaseModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
          />
        );
      case "edit":
        return (
          <EditPurchaseModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
          />
        );
      case "remove":
        return (
          <RemovePurchaseModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {modalType != null && (
        <ReusableModal
          isOpen={modalType !== null}
          onClose={closeModal}
          title={modalType}
        >
          {renderModalContent()}
        </ReusableModal>
      )}
      {modalType == null && <></>}
    </>
  );
};

export default PurchaseModalManager;
