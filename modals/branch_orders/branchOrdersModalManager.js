import React, { useState, useEffect } from "react";
import LargeModal from "../../components/utility/modals/largeModal";
import SmallModal from "../../components/utility/modals/smallModal";

// Modal Contents
import AddModal from "./add";
import ViewModal from "./view";
import ReceiveModal from "./receive";
import RemoveModal from "./remove";
import PostModal from "./post";
import ApproveModal from "./approve";
import DeclineModal from "./decline";

const BranchOrdersModalManager = ({
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
      case "remove":
        return "#b71c1c";
      case "receive":
        return "#2e7d32";
      case "post":
        return "#1976d2";
      case "approve":
        return "#2e7d32";
      case "decline":
        return "#b71c1c";

      default:
        return null;
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "add":
        return (
          <AddModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            mutate={mutate}
          />
        );
      case "view":
        return (
          <ViewModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            rowData={rowData}
          />
        );
      case "remove":
        return (
          <RemoveModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            rowData={rowData}
            mutate={mutate}
          />
        );
      case "receive":
        return (
          <ReceiveModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            setData={setData}
            mutate={mutate}
          />
        );
      case "post":
        return (
          <PostModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            rowData={rowData}
            mutate={mutate}
          />
        );
      case "approve":
        return (
          <ApproveModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            rowData={rowData}
            mutate={mutate}
          />
        );
      case "decline":
        return (
          <DeclineModal
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
  const modals = ["remove", "post", "approve", "decline"];
  const lgModals = ["add", "view", "receive"];

  return (
    <>
      {activeModal != null && lgModals.includes(activeModal) && (
        <LargeModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          title={activeModal}>
          {renderModalContent()}
        </LargeModal>
      )}

      {modals.includes(activeModal) && (
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

export default BranchOrdersModalManager;
