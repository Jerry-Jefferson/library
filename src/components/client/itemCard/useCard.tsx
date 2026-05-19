import { useContext } from "react";
import { CardContext } from "./cardContext";

export function useCard() {
  const context = useContext(CardContext);

  if (!context) throw new Error("useCard must be used inside a provider");

  return context;
}
