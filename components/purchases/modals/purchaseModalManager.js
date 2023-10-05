import React, { useState, useEffect } from "react";
import LargeModal from "../../utility/modals/largeModal";
import SmallModal from "../../utility/modals/smallModal";


// Modal Contents
import AddPurchaseModal from "./add";
import ViewPurchaseModal from "./view";
import EditPurchaseModal from "./edit";
import RemovePurchaseModal from "./remove";

const PurchaseModalManager = ({ activeModal, setActiveModal }) => {
  const closeModal = () => {
    setActiveModal(null);
  };

  // Header Colors
  const selectedHeaderColor = () => {
    switch (activeModal) {
      case "add":
        return "green";
      case "view":
        return "blue";
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
      case "add":
        return (
          <AddPurchaseModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
          />
        );
      case "view":
        return (
          <ViewPurchaseModal
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
      {(activeModal != null) && (activeModal != "remove") && (
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

export default PurchaseModalManager;
