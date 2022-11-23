import { ModelPosition } from "components/Home/types";
import React from "react";

export interface DraggableProps {
  modelPosition: ModelPosition;
  setModelPosition: (arg0: ModelPosition) => void;
  children: React.ReactNode
}