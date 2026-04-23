"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "./ModalContainer.module.css";
import { subscribeToNotifications, unsubscribeFromNotifications } from "@/services/modalService";
import { FormDataAsistencia } from "@/interfaces/formTypes";

export interface ModalItem {
  id: string;
  formData: FormDataAsistencia;
  names:string[]
  confirmModal: () => void
}

export default function ModalContainer() {
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

  return (
    <div className={styles.modalContainer}>
    
      {modal && <Modal
          key={modal.id}
          formData={modal.formData}
          names={modal.names}
          onClose={removeModal}
          onSend={() => sendModal(modal.confirmModal)}
        />
      }
    </div>
  );
}
