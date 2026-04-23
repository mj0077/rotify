"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType | null>(null);
