import { FamilyInterface } from '@/interfaces/formTypes';
import styles from './FamilyCard.module.css'


export default function FamilyCard({card}:{card:FamilyInterface}) {
    return (
      <div className={styles.container}>
        <span>{card.name}</span>
        {card.users.map(user => <span key={user}>{user}</span>)}
        <span>{card.mesa}</span>
        {
            card.assistance && <div>
                <span>{card.assistance.intolerancia}</span>
                <span>{card.assistance.detalleIntolerancia}</span>
                <span>{card.assistance.transporte == 'bus'? '🚌':'🚗'}</span>
                <span>{card.assistance.mensaje}</span>
            </div>
        }    
      </div>
    );
  }