"use client";
import BaseButton from "./base/BaseButton";

interface ExternalLinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLinkButton({ href, ...props }: ExternalLinkButtonProps) {
  return (
    <BaseButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}