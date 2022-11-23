import { ModelPosition } from "components/Home/types";

export interface DrawerProps {
  classes: string;
  toggleDrawerHandler: () => void
}

export interface Radio {
  title: string;
  value: string;
}

export interface RadioInputProps {
  radio: Radio;
  onSelectOption: (arg0: string) => void;
}

export interface HeaderProps {
  modelSize: number;
  setModelPosition: (arg0: ModelPosition) => void;
  setModelSize: (arg0: number) => void;
}