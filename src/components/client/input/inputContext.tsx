"use client";

import { createContext } from "react";

export interface InputContextProps {
  name: string;
}

export const InputContext = createContext<InputContextProps | null>(null);
