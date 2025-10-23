"use client";
import BaseButton from "./base/BaseButton";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function FormButton({ type = "submit", ...props }: FormButtonProps) {
  return <BaseButton as="button" type={type} {...props} />;
}