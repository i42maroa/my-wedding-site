'use client'

import { AssistanceFamilyInterface, FamilyInterface } from '@/interfaces/formTypes';
import styles from './FamilyCard.module.css'
import { useState } from 'react';
import { saveItemInLocalStorage } from '@/services/localStorageService';
import { useRouter } from 'next/navigation';

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
    const message = `Hola, queremos invitarte a nuestra boda. 
      Para ello hemos creado una web y nos gustaría que nos confirmarais si vais a venir.
      La web es: https://my-wedding-site-phi.vercel.app/${family.accessCode}
    `;

    console.log(message)
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