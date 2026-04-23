import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import styles from "./Button.module.css";
import BaseButton, { BaseButtonProps } from "./BaseButton";


export default function CloseButton({ as: Component = "button", href, onClick, type = "button", children,
  className = "", disabled = false, ...props} : BaseButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)) {
  
  const classNames = `${styles.container} ${styles.cancel} ${className} `;
  return (
    <BaseButton
      href={href}
      onClick={onClick}
      type={Component === "button" ? type : "button"}
      className={classNames}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </BaseButton>
  );
}