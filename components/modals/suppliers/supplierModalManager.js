import React from "react";
import ReusableModal from "../modal";

// Modal Contents
import AddSupplierModal from "./add";
import EditSupplierModal from "./add";
import RemoveSupplierModal from "./add";

const SupplierModalManager = ({ modalType, setActiveModal }) => {
  // const openModal = () => {
  //   setActiveModal(modalType);
  // };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "view":
        return <AddSupplierModal />;
      case "edit":
        return <EditSupplierModal />;
      case "remove":
        return <RemoveSupplierModal />;
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

export default SupplierModalManager;
