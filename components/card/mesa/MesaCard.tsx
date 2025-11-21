import { FamilyInterface } from '@/interfaces/formTypes';
import styles from './Mesa.module.css'


export default function MesaCard({mesa, families}:{mesa:number, families:FamilyInterface[]}) {

  const amountUsersByMesa = () => families.reduce((sum, family) => sum + family.users.length, 0)

    return (
      <div className={styles.container}>
                  <h3 className={styles.title}><span>Mesa {mesa}</span> <span>{amountUsersByMesa()}</span></h3>
                  <ul className={styles.familyContainer}>
                    {families.map(family => (
                      <li className={styles.family} key={family.id}>{family.name} {family.assistanceConfirm?'💚':'🚫'}                       
                            <ul>
                                {
                                    family.users.map(user =>
                                        <li key={user}>{user}</li>
                                    )
                                }
                            </ul>                         
                      </li>
                    ))}
                  </ul>
        </div>
    );
  }