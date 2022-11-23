export interface Display3dModelProps{
  ModelPath: string;
  modelPosition: ModelPosition;
  modelSize: number;
  setModelPosition: (arg0: ModelPosition) => void;
}

export interface ModelPosition {
  x: number;
  y: number;
}

export interface ModelProps{
  ModelPath: string;
}