"use client";
import Link from "next/link";
import BaseButton from "./base/BaseButton";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkButton({ href, ...props }: LinkButtonProps) {
  return <BaseButton as={Link} href={href} {...props} />;
}