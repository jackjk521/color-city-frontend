import React from "react";
import ReusableModal from "../../utility/modal";

// Modal Contents
import AddPurchaseModal from "./add";
import ViewPurchaseModal from "./view";
import EditPurchaseModal from "./edit";
import RemovePurchaseModal from "./remove";

const InventoryModalManager = ({ modalType, setActiveModal }) => {

  const closeModal = () => {
    setActiveModal(null);
  };

  // Header Colors
  const selectedHeaderColor = () => {
    switch (modalType) {
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
        return <AddPurchaseModal headerColor={selectedHeaderColor()}/>;
      case "view":
        return <ViewPurchaseModal headerColor={selectedHeaderColor()}/>;
      case "edit":
        return <EditPurchaseModal headerColor={selectedHeaderColor()}/>;
      case "remove":
        return <RemovePurchaseModal headerColor={selectedHeaderColor()} />;
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

export default InventoryModalManager;
