import { useContext } from "react";
import { InputContext } from "./inputContext";

export function useInput() {
  const context = useContext(InputContext);

  if (!context) throw new Error("useInput must be used inside a provider");

  return context;
}
