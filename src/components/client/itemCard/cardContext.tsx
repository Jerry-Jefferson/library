"use client";

import { createContext } from "react";

export interface CardContextProps {
  name: string;
}

export const CardContext = createContext<CardContextProps | null>(null);
