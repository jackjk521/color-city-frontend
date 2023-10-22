import React, { useState, useEffect } from "react";
import LargeModal from "../../components/utility/modals/largeModal";
import SmallModal from "../../components/utility/modals/smallModal";

// Modal Contents
import AddItemModal from "./add";
import ViewItemModal from "./view";
import EditItemModal from "./edit";
import RemoveItemModal from "./remove";

const ItemModalManager = ({
  data,
  setData,
  activeModal,
  setActiveModal,
  rowData,
  mutate,
}) => {
  const closeModal = () => {
    setActiveModal(null);
  };

  // Header Colors
  const selectedHeaderColor = () => {
    switch (activeModal) {
      case "add":
        return "#2e7d32";
      case "view":
        return "#1976d2";
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
          <AddItemModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            mutate={mutate}
          />
        );
      case "view":
        return (
          <ViewItemModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            rowData={rowData}
          />
        );
      case "edit":
        return (
          <EditItemModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            setData={setData}
            mutate={mutate}
          />
        );
      case "remove":
        return (
          <RemoveItemModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            rowData={rowData}
            mutate={mutate}

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
          title={activeModal}
        >
          {renderModalContent()}
        </LargeModal>
      )}

      {activeModal == "remove" && (
        <SmallModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          title={activeModal}
        >
          {renderModalContent()}
        </SmallModal>
      )}

      {activeModal == null && <></>}
    </>
  );
};

export default ItemModalManager;
