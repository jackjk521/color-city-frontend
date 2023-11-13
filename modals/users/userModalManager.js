import React from "react";
import dynamic from "next/dynamic";
// import LargeModal from "../../components/utility/modals/largeModal";

// Modal Contents
const AddModal = dynamic(() => import("./add"), {
  ssr: false,
});

const ViewModal = dynamic(() => import("./view"), {
  ssr: false,
});

const EditModal = dynamic(() => import("./edit"), {
  ssr: false,
});

const RemoveModal = dynamic(() => import("./remove"), {
  ssr: false,
});

// Dynamic Import
const SmallModal = dynamic(
  () => import("../../components/utility/modals/smallModal"),
  {
    ssr: false,
  }
);

const UserModalManager = ({
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
      case "edit":
        return (
          <EditModal
            headerColor={selectedHeaderColor()}
            closeModal={closeModal}
            data={data}
            setData={setData}
            mutate={mutate}
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
      default:
        return null;
    }
  };

  return (
    <>
      {/* {activeModal != null && activeModal != "remove" && (
        <LargeModal
          isOpen={activeModal !== null}
          onClose={closeModal}
          title={activeModal}
        >
          {renderModalContent()}
        </LargeModal>
      )}  */}

      {activeModal && (
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

export default UserModalManager;
