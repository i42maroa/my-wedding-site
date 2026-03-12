"use client";
import Link from "next/link";
import BaseButton from "./base/BaseButton";
import styles from './NavbarButton.module.css'

interface NavbarButtonButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavbarButton({ href, className, ...props }: NavbarButtonButtonProps) {
  const classNames = `${styles.navbarButton} ${className}`;
  return <BaseButton className={classNames} as={Link} href={href} {...props} />;
}