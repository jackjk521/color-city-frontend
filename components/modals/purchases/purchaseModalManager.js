import React from "react";
import ReusableModal from "../modal";

// Modal Contents
import AddPurchaseModal from "./add";
import EditPurchaseModal from "./add";
import RemovePurchaseModal from "./add";

const PurchaseModalManager = ({ modalType, setActiveModal }) => {
  // const openModal = () => {
  //   setActiveModal(modalType);
  // };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "view":
        return <AddPurchaseModal />;
      case "edit":
        return <EditPurchaseModal />;
      case "remove":
        return <RemovePurchaseModal />;
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
          title={modalType}>
          {renderModalContent()}
        </ReusableModal>
      )}
      {modalType == null && <></>}
    </>
  );
};

export default PurchaseModalManager;
