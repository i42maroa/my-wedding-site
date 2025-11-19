import MainLayout from "@/components/layout/main/MainLayout";
import styles from './NotFound.module.css'
import SvgBoyfriend from "@/components/svg/SvgBoyfriend/SvgBoyfriend";

export default function NotFound() {
  return (
        <MainLayout header={false}>
            <div className={styles.container}>                            
                <span className={styles.error}>404 | Novio no encontrado</span>        
                <SvgBoyfriend className={styles.boyfriend}/>             
            </div>
        </MainLayout>
  );}