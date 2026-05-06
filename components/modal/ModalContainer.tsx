"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "./ModalContainer.module.css";
import { subscribeToNotifications, unsubscribeFromNotifications } from "@/services/modalService";
import { ModalItem } from "@/interfaces/modal.interface";
import ModalConfirmAsistencia from "./templates/ModalConfirmDeleteImage";
import ModalConfirmDeleteImage from "./templates/ModalConfirmAsistencia";

export default function  ModalContainer() {
  const [modal, setModal] = useState<ModalItem|undefined>();

  useEffect(() => {
    const handleNewModal = (modal: ModalItem) => {
      setModal(modal);
    };
    
    subscribeToNotifications(handleNewModal);
    return () => unsubscribeFromNotifications(handleNewModal);
  }, []);

  const removeModal = () => {
     setModal(undefined);
  };

  const sendModal = (confirmModal: () => void) => {
     setModal(undefined);
     confirmModal();
  };

   const renderTemplate = () => {
    if (!modal) return null;

    switch (modal.type) {
      case "confirm-asistencia":
        return (
          <ModalConfirmAsistencia
            formData={modal.data}
            names={modal.names}
          />
        );
        
      case "delete-image":
        return (
          <ModalConfirmDeleteImage displayPhotoUrl={modal.displayImageUrl}/>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.modalContainer}>
    
      {modal && <Modal
          key={modal.id}
          onClose={removeModal}
          onSend={() => sendModal(modal.confirmModal)}
        >
           {renderTemplate()}  
        </Modal>
      }
    </div>
  );
}
