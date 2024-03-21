import { ReactNode } from "react";

export interface BottomSheetProps {
  title: string;
  children: ReactNode;
  snapPoints: number[];
  onClose: () => void;
}
