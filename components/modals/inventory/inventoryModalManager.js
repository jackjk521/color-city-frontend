import React from "react";
import ReusableModal from "../modal";

// Modal Contents
import AddInventoryModal from "./add";
import EditInventoryModal from "./add";
import RemoveInventoryModal from "./add";

const InventoryModalManager = ({ modalType, setActiveModal }) => {
  // const openModal = () => {
  //   setActiveModal(modalType);
  // };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "view":
        return <AddInventoryModal />;
      case "edit":
        return <EditInventoryModal />;
      case "remove":
        return <RemoveInventoryModal />;
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

export default InventoryModalManager;
