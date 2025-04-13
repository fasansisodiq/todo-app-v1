import { useContext } from "react";
import OperationContext from "./OperationContext";

export function useOperation() {
  const context = useContext(OperationContext);
  if (!context) {
    throw new Error("useOperation must be used within an OperationProvider");
  }
  return context;
}
