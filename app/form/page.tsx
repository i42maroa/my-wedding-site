"use client";

import FloralLayout from "@/components/layout/floral/FloralLayout";
import LayoutGuestShell from "@/components/layout/guest/LayoutGuestShell";
import RSVPContent from "./FormContent";

export default function RSVPPage() {
  return (
    <LayoutGuestShell>
        <FloralLayout> 
          <RSVPContent />
        </FloralLayout>
      </LayoutGuestShell>
  );
}