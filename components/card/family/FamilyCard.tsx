'use client'

import { AssistanceFamilyInterface, FamilyInterface } from '@/interfaces/formTypes';
import styles from './FamilyCard.module.css'
import { useState } from 'react';

export default function FamilyCard({card}:{card:FamilyInterface}) {
  const [showDetails, setShowDetails] = useState(false);
  const textIntolerancia = (assistance:AssistanceFamilyInterface) => assistance.intolerancia? 'Tiene alguna intolerancia' : 'No tienen ninguna intolerancia';
  
  const toggleInformation = () => {setShowDetails(!showDetails)}

    return (
      <div className={styles.container} onClick={()=> toggleInformation()}>
        <span className={styles.title}><span>{card.name}</span> <span>{card.assistanceConfirm?'💚':'🚫'}</span></span>
        {
          showDetails &&
          <div className={styles.detailsContainer}>
            <span>Mesa {card.mesa}</span>
            <ul className={styles.userContainer}>
              {card.users.map(user => <li key={user}>{user}</li>)}
            </ul>
            {
                card.assistance && 
                    <ul className={styles.detailsTextContainer}>
                      <li>{card.assistance.transporte == 'bus'? '🚌':'🚗'}</li>
                      <li>{textIntolerancia(card.assistance)}</li>
                      {card.assistance.intolerancia && <li>{card.assistance.detalleIntolerancia}</li>}
                      <li>{card.assistance.mensaje}</li>
                    </ul> 
            } 
          </div>
        }         
      </div>
    );
  }