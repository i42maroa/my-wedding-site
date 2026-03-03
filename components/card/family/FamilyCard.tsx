'use client'

import { AssistanceFamilyInterface, FamilyInterface } from '@/interfaces/formTypes';
import styles from './FamilyCard.module.css'
import { useState } from 'react';
import { saveItemInLocalStorage } from '@/services/localStorageService';
import { useRouter } from 'next/navigation';
import { showToastError, showToastInfo } from '@/services/notificationService';

export default function FamilyCard({card}:{card:FamilyInterface}) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const textIntolerancia = (assistance:AssistanceFamilyInterface) => assistance.intolerancia? 'Tiene alguna intolerancia' : 'No tienen ninguna intolerancia';
  const toggleInformation = () => {setShowDetails(!showDetails);}

  const editFamily = (family:FamilyInterface) => {
    saveItemInLocalStorage(family, family.id);
     router.push(`/admin/family/${family.id}/edit`);
  }

  const writeMessageAcces = (family:FamilyInterface) => {
    const message = `
Hola,

Nos hace muchísima ilusión invitarte a nuestra boda.
Queremos compartir este día tan especial contigo y esperamos que puedas acompañarnos.

Hemos preparado una pequeña web con todos los detalles. Allí podrás confirmar tu asistencia:

👉 ${process.env.NEXT_PUBLIC_URL}

Tu código de familia para confirmar es:
      ${family.accessCode}     
    `;
    
    try{
      navigator.clipboard.writeText(message);
      showToastInfo("copiado en el clipboard")
    }catch (err: any) {
      showToastError("No se pudo copiar");
    }
  }

    return (
      <div className={styles.container} >
        
        <span className={styles.title} onClick={()=> toggleInformation()}>
            <span>{card.name}</span> 
            <span>{card.origen == 'novio' ? '🤵':'👰'}</span> 
            <span>{card.assistanceConfirm?'💚':'🚫'}</span> 
            <span>{card.accessCode}</span>

            <ul className={styles.userContainer}>
              {card.users.map(user => <li key={user}>{user}</li>)}         
            </ul>
         </span>
         
        {
          showDetails &&
            <div className={styles.detailsContainer}>
              <span>{card.mesa === null || card.mesa === undefined || card.mesa == 0 ?  "Sin mesa" :`Mesa ${card.mesa}`}</span>                    
              {
                  card.assistance && 
                      <ul className={styles.detailsTextContainer}>
                        <li>{card.assistance.transporte == 'bus'? '🚌':'🚗'}</li>
                        <li>{textIntolerancia(card.assistance)}</li>
                        {card.assistance.intolerancia && <li>{card.assistance.detalleIntolerancia}</li>}
                        <li>{card.assistance.mensaje}</li>
                      </ul> 
              } 
              <button className={styles.buttonEdit} onClick={() => editFamily(card)}>✏️</button>
              <button className={styles.buttonEdit} onClick={() => writeMessageAcces(card)}>🖱️</button>
            </div>
        }         
      </div>
    );
  }