// import { createContext, useState } from "react";

// //Defining context
// export const ManagedUI = createContext();

// //Context Wrapper
// export function ManagedUIProvider({ children }) {
//     const [openModal, setOpenModal] = useState(false);

//     return (
//         <ManagedUI.Provider
//             value={{
//                 openModal,
//                 setOpenModal,
//             }}
//         >
//             {children}
//         </ManagedUI.Provider>
//     );
// }

import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ManagedUIProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ManagedUIProvider };