// src/components/DisableDraftMode.tsx

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/action";


export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  
  if (window !== window.parent || !!window.opener) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}
        className="fixed bottom-4 right-4 bg-blue-500 text-white 
        px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Disable draft mode
        </button>
      )}
    </div>
  );
}