import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import styles from "./Button.module.css";

interface BaseButtonProps {
  /** Tipo de elemento que se renderiza (button, a, Link...) */
  as?: ElementType;
  /** Href para enlaces */
  href?: string;
  /** Evento click (solo si es botón) */
  onClick?: () => void;
  /** Tipo de botón (solo para forms) */
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /** Contenido */
  children: ReactNode;
  /** Clase extra opcional */
  className?: string;
}

export default function BaseButton({ as: Component = "button", href, onClick, type = "button", children,
  className = "",...props} : BaseButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)) {
    const classNames = `${styles.container} ${className}`;

  return (
    <Component
      href={href}
      onClick={onClick}
      type={Component === "button" ? type : "button"}
      className={classNames}
      {...props}
    >
      <span>{children}</span>
    </Component>
  );
}