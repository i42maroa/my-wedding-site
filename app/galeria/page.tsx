import WeddingGallery from "@/components/gallery/WeddingGallery";
import styles from "./Galeria.module.css";
import LayoutGuestShell from "@/components/layout/guest/LayoutGuestShell";
import GalleryContent from "./GaleriaContent";

export default function GalleryPage() {
  return (
    <LayoutGuestShell>
        <GalleryContent/>
    </LayoutGuestShell>
  );
}