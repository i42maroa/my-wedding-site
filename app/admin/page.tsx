import MainLayout from '@/components/layout/main/MainLayout';
import styles from './Admin.module.css'
import Link from 'next/link';

// Puedes poner este código en .env.local como NEXT_PUBLIC_ADMIN_CODE
const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE;
export default function AdminPage() {
 return (
    <MainLayout header={false}>
      <div className={styles.container}>
        <h1>Panel de administración</h1>

        <div className={styles.actions}>
          <Link href="/admin/create" className={styles.card}>
            <h2>Crear familia</h2>
            <p>Dar de alta una nueva familia con sus integrantes</p>
          </Link>

          <Link href="/admin/family" className={styles.card}>
            <h2>Ver familias</h2>
            <p>Consultar quién ha confirmado y quién sigue pendiente</p>
          </Link>

          <Link href="/admin/mesas" className={styles.card}>
            <h2>Ver mesas</h2>
            <p>Consultar la administración de las mesas</p>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}