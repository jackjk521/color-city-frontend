import React, { useRef, useContext } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  Container,
  Modal,
  ModalTitle,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@mui/material";

import {ManagedUI} from "../../contexts/managedUIProvider";

export default function ModalCreator({ children }) {
  const { setOpenModal } = useContext(ManagedUI);

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  return createPortal(
    <>
      {/* <Container className="d-flex justify-content-center">
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleOpen}>
          DELETE DATA
        </Button>
      </Container> */}

      <Modal
        onClose={(e) => closeModal(e)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalRef}>
        {children}

        {/* <ModalContent>
          <ModalHeader>
            <Container className="d-flex pl-0">
              <Image
                src="https://imgur.com/Kh1gwTq.png"
                alt="Delete Icon"
                width={24}
                height={24}
              />
              <ModalTitle id="modal-title">Delete the link?</ModalTitle>
            </Container>
          </ModalHeader>
          <ModalBody>
            <p className="text-muted">
              If you delete the link, it will be gone forever. Are you sure you
              want to proceed?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} variant="outlined" color="default">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent> */}
      </Modal>
    </>,
    document.body
  );
}
