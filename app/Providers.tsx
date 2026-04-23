"use client";

import { useState, ReactNode } from "react";
import { ModalContext } from "./ModalContext";
import ScheduleModal from "@/components/ScheduleModal";

export function Providers({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
      <div id="schedule-modal">
        <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </ModalContext.Provider>
  );
}
